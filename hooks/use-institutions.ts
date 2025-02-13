import { updateInstitutions } from "@/utils/database";
import { useQuery } from "@tanstack/react-query";

export const useInstitutions = () => {
	return useQuery({
		queryKey: ["institutions"],
		queryFn: async () => {
			const response = await fetch("https://sedekah.je/api/institutions");
			const json = await response.json();
			const result = await updateInstitutions(json);

			return result;
		},
	});
};
