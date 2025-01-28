import {
	View,
	SafeAreaView,
	Text,
	StyleSheet,
	TouchableOpacity,
	Pressable,
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { router, Stack } from "expo-router";
import { colors } from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";
import CardSplittingAccordion from "@/components/shared/accordion";

const faqData = [
	{
		title: "Bagaimanakah cara untuk saya menyumbang?",
		description:
			"Anda boleh hubungi akaun X kami di @sedekahje. Semak terlebih dahulu jika masjid tersebut telah tersenarai di laman web kami.",
	},
	{
		title: "Adakah SedekahJe terlibat dengan pihak ketiga?",
		description:
			"Tidak, platform ini sepenuhnya bebas dan merupakan sebuah projek sumber terbuka. Ia tidak mempunyai kaitan dengan mana-mana organisasi, perniagaan, atau individu.",
	},
	{
		title: "Adakah derma saya terus sampai kepada penerima?",
		description:
			"Kod QR yang disediakan adalah diambil terus dari masjid atau laman sosial mereka. Tiada perantara, dan 100% derma akan sampai kepada penerima.",
	},
	{
		title: "Adakah SedekahJe mengambil sebarang yuran atau komisen?",
		description:
			"Tidak, kami tidak mengambil sebarang yuran atau komisen. Kod QR yang disediakan adalah diambil terus dari masjid atau laman sosial mereka.",
	},
	{
		title: "Selamatkah untuk membuat derma melalui SedekahJe?",
		description:
			"Ya, platform ini hanya menyediakan senarai QR. Kod QR ditapis dan disahkan sebelum diterbitkan di laman web kami.",
	},
	{
		title: "Siapakah yang mengurus dan membangunkan platform ini?",
		description:
			"Platform ini dikendalikan oleh komuniti tech yang kebanyakannya dari X. Anda boleh melihat senarai maintainer/contributor di Github kami.",
	},
	{
		title:
			"Apa yang perlu saya lakukan jika terdapat isu dengan derma atau kod QR?",
		description:
			"Anda boleh menghubungi akaun X kami dengan mengetip @SedekahJe. Anda juga boleh mengemukakan isu di Github kami.",
	},
];

const FAQScreen = () => {
	const { isDarkMode } = useTheme();

	const styles = !isDarkMode ? lightStyle : darkStyle;
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: !isDarkMode ? colors.neutral[50] : colors.neutral[950],
			}}
		>
			<View style={styles.background}>
				<Stack.Screen
					options={{
						title: "FAQ",
						headerTintColor: !isDarkMode
							? colors.neutral[950]
							: colors.cyan[50],
						headerStyle: {
							backgroundColor: !isDarkMode
								? colors.neutral[50]
								: colors.neutral[950],
						},
						headerLeft: () => {
							return (
								<TouchableOpacity
									onPress={() => {
										router.back();
									}}
								>
									<Feather
										name="arrow-left"
										size={24}
										color={!isDarkMode ? colors.black : colors.neutral[50]}
									/>
								</TouchableOpacity>
							);
						},
					}}
				/>
				<CardSplittingAccordion data={faqData} />
			</View>
		</SafeAreaView>
	);
};

export default FAQScreen;

const lightStyle = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: colors.neutral[50],
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
	},
	container: {
		backgroundColor: colors.neutral[100],
		borderRadius: 10,
	},
	text: {
		color: colors.black,
	},
});

const darkStyle = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: colors.neutral[950],
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
	},
	container: {
		backgroundColor: colors.neutral[900],
		borderRadius: 10,
	},
	text: {
		color: colors.neutral[50],
	},
});
