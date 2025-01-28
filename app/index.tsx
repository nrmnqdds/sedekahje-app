import OnboardingScreen from "./onboarding";
import { useOnboarding } from "@/hooks/use-onboarding";
import { Redirect } from "expo-router";

export default function Index() {
	const { isOnboarded } = useOnboarding();

	return isOnboarded ? (
		<Redirect href="/(app)/(tabs)/home" />
	) : (
		<OnboardingScreen />
	);
}
