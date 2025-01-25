import * as Notification from "expo-notifications";

const initializeNotification = async () => {
	const { status } = await Notification.getPermissionsAsync();

	if (status !== "granted") {
		await Notification.requestPermissionsAsync();

		Notification.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: false,
				shouldSetBadge: false,
			}),
		});
	}
};

const scheduleJumaatNotification = async () => {
	const identifier = await Notification.scheduleNotificationAsync({
		content: {
			title: "Jumaat Mubarak!",
			body: "Don't forget to SedekahJe today!",
		},
		trigger: {
			type: Notification.SchedulableTriggerInputTypes.WEEKLY,
			weekday: 6,
			hour: 13,
			minute: 0,
		},
	});

	return identifier;
};

const cancelScheduledNotification = async (identifier: string) => {
	if (!identifier) return;
	await Notification.cancelScheduledNotificationAsync(identifier);
};

export {
	initializeNotification,
	cancelScheduledNotification,
	scheduleJumaatNotification,
};
