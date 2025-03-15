import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "./Button";
type Props = {
  array: [{
    label: string;
    value: string;

  }]
  textTitle: string
  setFunction: (text: any) => void
  pressFunction: () => void
}
const Select = ({ array, textTitle, setFunction, pressFunction }: Props) => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.pickerTitle}>{textTitle}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setFunction(itemValue)}
          style={styles.picker}
          itemStyle={{ backgroundColor: "#222" }}
        >
          {array.map((item, index) =>
            <Picker.Item key={index} label={item.label} value={item.value} />

          )}
        </Picker>
      </View>
      <Text style={styles.hint}>Selected: <Text style={styles.result}>{selectedValue}</Text></Text>
      <View style={styles.btnContainer}>
        <Button
          label="تاكيد تغيير الحالة"
          iconName='check'
          onPress={() => pressFunction()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: '#fff',
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#555',
    width: '100%',
    backgroundColor: '#222',
    padding: 5
  },
  pickerTitle: {
    fontSize: 14,
    color: '#999',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    textAlign: 'center',
    padding: 5

  },
  label: {
    fontSize: 14,
    marginBottom: 10,
    color: '#fff',

  },
  pickerContainer: {
    borderBottomColor: '#444',
    borderBottomWidth: 1,

  },
  picker: {
    width: '100%',
    height: 60,
    color: '#fff',
  },
  hint: {
    color: '#777',
    marginTop: 10,
    textAlign: 'center',
    padding: 5

  },
  result: {
    color: '#fff',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: "center",
    padding: 10
  }
});

export default Select;
