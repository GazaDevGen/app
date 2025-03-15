import { FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  iconName: string;
  theme?: "primary";
  onPress?: () => void;
}

export default function Button({ label, theme, iconName, onPress }: Props) {
  if (theme === 'primary') {
    return <View
      style={[styles.buttonContainer, {
      }]}
    >
      <Pressable
        style={[styles.button, { backgroundColor: '#fff' }]}
        onPress={onPress}
      >

        <FontAwesome
          name={iconName}
          size={18}
          color='#25292e'
          style={styles.buttonIcon}
        />
        <Text
          style={[styles.buttonLabel, { color: "#25292e" }]}

        >
          {label}
        </Text>
      </Pressable>
    </View>
  } else {
    return <View
      style={styles.buttonContainer}
    >
      <Pressable
        style={styles.button}
        onPress={onPress}
      >

        <FontAwesome
          name={iconName}
          size={18}
          color='#fff'
          style={styles.buttonIcon}
        />
        <Text
          style={styles.buttonLabel}

        >
          {label}
        </Text>
      </Pressable>
    </View>
  }

}



const styles = StyleSheet.create({
  buttonContainer: {
    width: 150,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    borderWidth: 1,
    borderColor: "#ffd33d",
    borderRadius: 10,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row'
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 10
  },
  buttonIcon: {
    paddingRight: 8
  }
})