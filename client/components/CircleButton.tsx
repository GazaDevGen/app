import { MaterialIcons } from "@expo/vector-icons"
import { Pressable, StyleSheet, View } from "react-native"

type Props = {
  onPress: () => void,
  iconName: string
}
export default function CircleButton({ onPress, iconName }: Props) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        <MaterialIcons name={iconName} size={28} color={'#25292e'} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#ffd33d',
    borderRadius: 42,
    padding: 3,
    marginTop: 10
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: "#fff"
  }
})