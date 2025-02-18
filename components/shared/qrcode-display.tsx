import type { IInstitution } from "@/types/institutions.types";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Image, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

type Props = Pick<IInstitution, "qrContent" | "supportedPayment"> & {
	size?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const QrCodeDisplay = forwardRef<HTMLButtonElement, Props>((props, ref) => {
	if (!props.qrContent) {
		console.warn("No QR content provided");
		return null;
	}

	return (
		<View
			// type="button"
			style={{
				width: props.size || 160,
				height: props.size || 160,
				padding: (props.size || 160) * 0.05,
				paddingTop: (props.size || 160) * 0.1,
			}}
		>
			{/* <View className="bg-white rounded flex flex-col items-center justify-center w-full h-full"> */}
			<View
				style={{
					backgroundColor: "white",
					borderRadius: 10,
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{props.supportedPayment?.[0] === "duitnow" && (
					<View
						style={{
							width: (props.size || 160) * 0.2,
							height: (props.size || 160) * 0.2,
							position: "absolute",
							top: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#ED2C67",
							borderRadius: 100,
							borderWidth: 4,
							borderColor: "white",
						}}
						// className="absolute top-0 flex items-center justify-center bg-[#ED2C67] rounded-full border-4 border-white"
					>
						<Image
							src="/icons/duitnow.png"
							alt="DuitNow"
							className="object-contain"
						/>
					</View>
				)}
				{props.supportedPayment?.[0] === "tng" && (
					<View
						style={{
							width: (props.size || 160) * 0.2,
							height: (props.size || 160) * 0.2,
							position: "absolute",
							top: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#ED2C67",
							borderRadius: 100,
							borderWidth: 4,
							borderColor: "white",
						}}
						// className="absolute top-0 flex items-center justify-center"
					>
						<Image src="/icons/tng.png" alt="TNG" className="object-contain" />
					</View>
				)}
				{props.supportedPayment?.[0] === "boost" && (
					<View
						style={{
							width: (props.size || 160) * 0.2,
							height: (props.size || 160) * 0.2,
							position: "absolute",
							top: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#EE2E24",
							borderRadius: 100,
							borderWidth: 4,
							borderColor: "white",
						}}
						// className="absolute top-0 flex items-center justify-center bg-[#EE2E24] rounded-full border-4 border-white"
					>
						<Image
							src="/icons/boost.png"
							alt="Boost"
							className="object-contain rounded-full"
						/>
					</View>
				)}
				<QRCode value={props.qrContent} size={(props.size || 160) * 0.7} />
			</View>
		</View>
	);
});

QrCodeDisplay.displayName = "QrCodeDisplay";

export default QrCodeDisplay;
