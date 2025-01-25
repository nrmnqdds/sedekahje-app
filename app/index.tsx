import { View } from "react-native";
import OnboardingScreen from "./onboarding";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#fff",
			}}
		>
			<OnboardingScreen />
		</View>
	);
}
