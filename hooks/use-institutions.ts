import type { IInstitution } from "@/types/institutions.types";
import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createMMKV } from "./mmkv";

const storeName = "institution-store";

const mmkv = new MMKV({
	id: storeName,
});

const mmkvStorage = createMMKV(mmkv);

interface InstitutionStore {
	institutions: Array<IInstitution>;
	setInstitutions: (institutions: Array<IInstitution>) => void;
	lastFetched: Date;
	setLastFetched: (date: Date) => void;
	fetchInstitutions: () => Promise<void>;
	isFetching: boolean;
	isError: boolean;
}

export const useInstitutions = create(
	persist<InstitutionStore>(
		(set) => ({
			institutions: [],
			setInstitutions: (newInstitutions) => {
				set({
					institutions: newInstitutions,
				});
			},
			lastFetched: new Date(),
			setLastFetched: (newDate) => {
				set({
					lastFetched: newDate,
				});
			},
			fetchInstitutions: async () => {
				set({
					isFetching: true,
				});
				const response = await fetch("https://sedekah.je/api/institutions");
				const data = await response.json();

				if (!response.ok) {
					set({
						isError: true,
						isFetching: false,
					});
					return Promise.reject("Failed to fetch data");
				}

				set({
					institutions: data,
					lastFetched: new Date(),
					isFetching: false,
				});

				return Promise.resolve();
			},
			isFetching: false,
			isError: false,
		}),
		{
			name: storeName,
			storage: createJSONStorage(() => mmkvStorage),
		},
	),
);
