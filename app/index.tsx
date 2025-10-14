import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 27,
          color: "#123123",
          fontWeight: "bold",
        }}
      >Welcome!</Text>
      <Link href="/clientRegistration">Créer un compte</Link>
    </View>
  );
}
