import OnboardingScreen from "@/app/onboarding";
import { useOnboarding } from "@/hooks/use-onboarding";
import type { ReactNode } from "react";

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
	const { isOnboarded } = useOnboarding();

	return !isOnboarded ? <OnboardingScreen /> : children;
};
