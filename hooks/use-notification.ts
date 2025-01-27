import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createMMKV } from "./mmkv";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";

const storeName = "notification-store";

const mmkv = new MMKV({
	id: storeName,
});

const mmkvStorage = createMMKV(mmkv);

interface NotificationStore {
	showNotification: boolean;
	notificationIdentifier: string | null;
	toggleShowNotification: () => void;
	setNotificationIdentifier: (identifier: string) => void;
}

export const useNotification = create(
	persist<NotificationStore>(
		(set, get) => ({
			showNotification: true, // Enabled by default
			toggleShowNotification: () => {
				set({
					showNotification: !get().showNotification,
				});
			},
			notificationIdentifier: null,
			setNotificationIdentifier: (identifier) => {
				set({
					notificationIdentifier: identifier,
				});
			},
		}),
		{
			name: storeName,
			storage: createJSONStorage(() => mmkvStorage),
		},
	),
);

export const useNotificationObserver = () => {
	useEffect(() => {
		let isMounted = true;

		function redirect(notification: Notifications.Notification) {
			const url = notification.request.content.data?.url;
			if (url) {
				router.push(url);
			}

			router.push("/(app)/(tabs)/home");
		}

		Notifications.getLastNotificationResponseAsync().then((response) => {
			if (!isMounted || !response?.notification) {
				return;
			}
			redirect(response?.notification);
		});

		const subscription = Notifications.addNotificationResponseReceivedListener(
			(response) => {
				redirect(response.notification);
			},
		);

		return () => {
			isMounted = false;
			subscription.remove();
		};
	}, []);
};
