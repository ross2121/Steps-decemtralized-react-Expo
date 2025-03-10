import { Link, Slot } from "expo-router";
import { Text, View } from "react-native";

export default function Layout() {
  return (
    <View>
      <View className="h-[96vh]">
        <Slot />
      </View>
      <View className="bg-red-500 flex flex-row justify-between px-4 items-center h-12 fixed bottom-0 w-full">
        <Link href={"/statistics"}>
          <Text>Statistics</Text>
        </Link>
        <Link href={"/"}>
          <Text>Home</Text>
        </Link>
        <Link href={"/leaderboard"}>
          <Text>Leaderboard</Text>
        </Link>
      </View>
    </View>
  );
}
