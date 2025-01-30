import {
	useNotification,
	useNotificationObserver,
} from "@/hooks/use-notification";
import {
	initializeNotification,
	scheduleJumaatNotification,
} from "@/utils/notification";
import { useEffect } from "react";

initializeNotification();

export const NotificationProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const { setNotificationIdentifier, showNotification } = useNotification();
	useNotificationObserver();

	useEffect(() => {
		(async () => {
			if (!showNotification) return;
			const identifier = await scheduleJumaatNotification();
			setNotificationIdentifier(identifier);
		})();
	}, [setNotificationIdentifier, showNotification]);

	return children;
};
