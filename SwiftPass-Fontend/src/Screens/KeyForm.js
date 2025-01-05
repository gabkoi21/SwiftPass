import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";

function KeyForm() {
  const [code, setCode] = useState("");
  const [key, setKey] = useState(true);
  const navigation = useNavigation();

  async function handleKeyPress(key) {
    try {
      if (key === "Clear") {
        setCode("");
      } else if (key === "Delete") {
        setCode(code.slice(0, -1));
      } else {
        const newCode = (code + key).trim();
        setCode(newCode);

        if (newCode.length >= 6) {
          const savedData = await AsyncStorage.getItem("keyCode");

          if (savedData) {
            const { key: savedKey } = JSON.parse(savedData);

            // If the saved key matches the entered key, navigate to Login
            if (savedKey === newCode) {
              navigation.navigate("Login");
            } else {
              // If the entered key doesn't match the saved key, navigate to Register
              await AsyncStorage.setItem(
                "keyCode",
                JSON.stringify({ key: newCode })
              );
              navigation.navigate("Register");
            }
          } else {
            // If no saved key exists, save the new key and navigate to Register
            await AsyncStorage.setItem(
              "keyCode",
              JSON.stringify({ key: newCode })
            );
            navigation.navigate("Register");
          }
        }
      }
    } catch (error) {
      console.error("Error handling key press:", error);
    }
  }

  async function saveKeyData(code) {
    try {
      // Save the key without any expiration logic
      await AsyncStorage.setItem("keyCode", JSON.stringify({ key: code }));
    } catch (error) {
      console.error("Error saving key data:", error);
    }
  }

  function handlekey() {
    setKey((prev) => !prev);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlekey}>
        <TextInput style={styles.input} value={code} editable={false} />
      </TouchableOpacity>
      {!key && (
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
              style={[styles.key, styles.keyColor]}
              onPress={() => handleKeyPress("Clear")}
            >
              <Text style={styles.keyText}></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.key}
              onPress={() => handleKeyPress("0")}
            >
              <Text style={styles.keyText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.key, styles.keyColor]}
              onPress={() => handleKeyPress("Delete")}
            >
              <Text style={styles.keyText}>
                <Feather name="delete" size={24} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

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
  keyColor: {
    backgroundColor: "#ddd",
  },
});

export default KeyForm;
