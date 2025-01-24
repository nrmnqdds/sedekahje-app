import { useEffect } from "react";
import { useNotification } from "@/hooks/use-notification";
import {
	initializeNotification,
	scheduleJumaatNotification,
} from "@/lib/notification";

initializeNotification();

export const NotificationProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const { setNotificationIdentifier, showNotification } = useNotification();

	useEffect(() => {
		async () => {
			if (!showNotification) return;
			const identifier = await scheduleJumaatNotification();
			setNotificationIdentifier(identifier);
		};
	}, [setNotificationIdentifier, showNotification]);

	return <>{children}</>;
};
