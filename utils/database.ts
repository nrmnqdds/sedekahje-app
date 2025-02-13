import type { Institution } from "@/types/institutions.types";
import * as SQLite from "expo-sqlite";

export const initDatabase = async () => {
	const db = await SQLite.openDatabaseAsync("sedekahje.sqlite");

	await db.execAsync(`
PRAGMA journal_mode = WAL;

DROP TABLE IF EXISTS institution_payment_options;
DROP TABLE IF EXISTS institutions;

CREATE TABLE IF NOT EXISTS institutions (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    qr_image TEXT NOT NULL,
    qr_content TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
);

CREATE TABLE IF NOT EXISTS institution_payment_options (
    institution_id INTEGER,
    payment_option TEXT NOT NULL CHECK (payment_option IN ('duitnow', 'tng', 'boost')),
    PRIMARY KEY (institution_id, payment_option),
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE
);

CREATE INDEX idx_institutions_category ON institutions(category);
CREATE INDEX idx_institutions_location ON institutions(state, city);
`);
};

export const updateInstitutions = async (institutions: Array<Institution>) => {
	const db = await SQLite.openDatabaseAsync("sedekahje.sqlite");

	// First, clear existing data

	(
		await db.prepareAsync("DELETE FROM institution_payment_options")
	).executeAsync();
	(await db.prepareAsync("DELETE FROM institutions")).executeAsync();

	// Prepare the bulk insert statement for institutions
	const stmt = await db.prepareAsync(`
			INSERT INTO institutions (
				id, name, description, category, state, city,
				qr_image, qr_content, latitude, longitude
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
			ON CONFLICT(id) DO UPDATE SET
				name = excluded.name,
				description = excluded.description,
				category = excluded.category,
				state = excluded.state,
				city = excluded.city,
				qr_image = excluded.qr_image,
				qr_content = excluded.qr_content,
				latitude = excluded.latitude,
				longitude = excluded.longitude
		`);

	// Create a batch transaction for institutions

	const institutionsBatch = institutions.map((inst) =>
		stmt.executeAsync(`
      INSERT INTO institutions (${Object.keys(inst).join(", ")})
      VALUES (${Object.values(inst).join(", ")})
      ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
        description = excluded.description,
        category = excluded.category,
        state = excluded.state,
        city = excluded.city,
        qr_image = excluded.qr_image,
        qr_content = excluded.qr_content,
        latitude = excluded.latitude,
        longitude = excluded.longitude
`),
	);

	// const institutionsBatch = institutions.map((inst) =>
	// 	stmt.bind(
	// 		inst.id,
	// 		inst.name,
	// 		inst.description || null,
	// 		inst.category,
	// 		inst.state,
	// 		inst.city,
	// 		inst.qrImage,
	// 		inst.qrContent || null,
	// 		inst.coords ? inst.coords[0] : null,
	// 		inst.coords ? inst.coords[1] : null,
	// 	),
	// );
	//
	// // Execute the institutions batch
	// const results = await env.DB.batch(institutionsBatch);

	// If institutions have payment options, insert them
	const paymentStmt = await db.prepareAsync(`
			INSERT INTO institution_payment_options (institution_id, payment_option)
			VALUES (?, ?)
		`);

	// Create a batch for payment options
	const paymentBatch = institutions.flatMap((inst) =>
		(inst.supportedPayment || []).map((payment) =>
			paymentStmt.executeAsync(`
      INSERT INTO institution_payment_options (institution_id, payment_option)
      VALUES (${inst.id}, ${payment})
`),
		),
	);
	// const paymentBatch = institutions.flatMap((inst) =>
	// 	(inst.supportedPayment || []).map((payment) =>
	// 		paymentStmt.bind(inst.id, payment),
	// 	),
	// );
	//
	// // Execute the payment options batch if there are any
	// if (paymentBatch.length > 0) {
	// 	await env.DB.batch(paymentBatch);
	// }
};
