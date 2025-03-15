import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  setFunction: (text: any) => void,
  text: string,
  placeholder: string,
  placeholderTextColor: string,
  value: string,
  keyboardType: string
};

export default function TextInputDiv({ value, setFunction, text, placeholder, placeholderTextColor, keyboardType }: Props) {

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{text}</Text>
      <TextInput
        style={[
          styles.input,
          { fontSize: 12 } // Smaller font for placeholder
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={setFunction}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  label: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    width: "100%",
  }
});
