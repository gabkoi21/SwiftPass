import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const KeyForm = () => {
  const [code, setCode] = useState("");
  const navigation = useNavigation();

  const handleKeyPress = (key) => {
    if (key === "Clear") {
      setCode("");
    } else if (key === "Delete") {
      setCode(code.slice(0, -1));
    } else {
      const newCode = code + key;
      setCode(newCode);

      if (newCode.length === 6) {
        navigation.navigate("Login");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={code} editable={false} />
      <View style={styles.keypad}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress("1")}
          >
            <Text style={styles.keyText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress("2")}
          >
            <Text style={styles.keyText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress("3")}
          >
            <Text style={styles.keyText}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress("4")}
          >
            <Text style={styles.keyText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress("5")}
          >
            <Text style={styles.keyText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress("6")}
          >
            <Text style={styles.keyText}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress("7")}
          >
            <Text style={styles.keyText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress("8")}
          >
            <Text style={styles.keyText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress("9")}
          >
            <Text style={styles.keyText}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress("0")}
          >
            <Text style={styles.keyText}>0</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress("Clear")}
          >
            <Text style={styles.keyText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress("Delete")}
          >
            <Text style={styles.keyText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 110,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: 313,
    textAlign: "center",
  },
  keypad: {
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  key: {
    width: 100,
    height: 40,
    margin: 5,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  keyText: {
    fontSize: 20,
  },
});

export default KeyForm;
