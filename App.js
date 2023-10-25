import { StatusBar } from "expo-status-bar";
import {
  Button,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";

function Square({ value, onSquareClick, onBgCheck }) {
  // console.log(onBgCheck);
  return (
    <Pressable
      onPress={onSquareClick}
      style={[styles.square, { backgroundColor: onBgCheck }]}
    >
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          color: "#fff",
        }}
      >
        {value}
      </Text>
    </Pressable>
  );
}
NavigationBar.setBackgroundColorAsync("#dedede");
export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [check, setCheck] = useState(true);

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const [background, setBackground] = useState(Array(9).fill("#ededed"));

  let [fontsLoaded, fontError] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  function calculateWinner(squares) {
    let i;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    // if (i === lines.length) {
    //   return "XO";
    // } else {
    return null;
    // }
  }

  function handleClick(index) {
    Keyboard.dismiss();
    if (squares[index] || calculateWinner(squares) || !player1 || !player2)
      return;
    const nextSquares = squares.slice();
    const nextBackground = background.slice();
    if (check) {
      nextSquares[index] = "X";
      nextBackground[index] = "orangered";
    } else {
      nextSquares[index] = "O";
      nextBackground[index] = "teal";
    }
    setCheck(!check);
    setSquares(nextSquares);
    setBackground(nextBackground);
  }

  const winner = calculateWinner(squares);
  let status;
  if (player1 && player2) {
    if (!squares.includes(null)) {
      status = "Its a draw!";
    } else {
      if (winner) {
        status = "Winner is " + (winner === "X" ? player1 : player2) + "!";
      } else {
        status = "Next Turn: " + (check ? player1 : player2);
      }
    }
  } else {
    status = "write your names to start";
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.playerWrapper}>
          <View style={styles.player}>
            {/* <Text style={[styles.playerLabel, { backgroundColor: "orangered" }]}>
            X
          </Text> */}
            <TextInput
              style={[styles.playerInput, { backgroundColor: "orangered" }]}
              value={player1}
              placeholder="Player X"
              spellCheck={false}
              onChangeText={(e) => setPlayer1(e)}
            />
          </View>
          <View style={styles.player}>
            {/* <Text style={[styles.playerLabel, { backgroundColor: "teal" }]}>
            O
          </Text> */}
            <TextInput
              style={[styles.playerInput, { backgroundColor: "teal" }]}
              value={player2}
              placeholder="Player O"
              spellCheck={false}
              onChangeText={(e) => setPlayer2(e)}
            />
          </View>
          <View style={styles.status}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins_400Regular",
              }}
            >
              {status}
            </Text>
          </View>
        </View>
        <View style={styles.board}>
          <View style={styles.boardRow}>
            <Square
              value={squares[0]}
              onSquareClick={() => handleClick(0)}
              onBgCheck={background[0]}
            />
            <Square
              value={squares[1]}
              onSquareClick={() => handleClick(1)}
              onBgCheck={background[1]}
            />
            <Square
              value={squares[2]}
              onSquareClick={() => handleClick(2)}
              onBgCheck={background[2]}
            />
          </View>
          <View style={styles.boardRow}>
            <Square
              value={squares[3]}
              onSquareClick={() => handleClick(3)}
              onBgCheck={background[3]}
            />
            <Square
              value={squares[4]}
              onSquareClick={() => handleClick(4)}
              onBgCheck={background[4]}
            />
            <Square
              value={squares[5]}
              onSquareClick={() => handleClick(5)}
              onBgCheck={background[5]}
            />
          </View>
          <View style={styles.boardRow}>
            <Square
              value={squares[6]}
              onSquareClick={() => handleClick(6)}
              onBgCheck={background[6]}
            />
            <Square
              value={squares[7]}
              onSquareClick={() => handleClick(7)}
              onBgCheck={background[7]}
            />
            <Square
              value={squares[8]}
              onSquareClick={() => handleClick(8)}
              onBgCheck={background[8]}
            />
          </View>
          <View style={styles.resetWrapper}>
            <Pressable
              onPress={() => {
                setSquares(Array(9).fill(null));
                setBackground(Array(9).fill("#ededed"));
              }}
            >
              <Text
                style={[
                  styles.reset,
                  squares.some((element) => element !== null) &&
                    styles.resetActive,
                ]}
              >
                Reset
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <StatusBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dedede",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  square: {
    color: "#fff",
    height: 50,
    // elevation: 1,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1 / 1,
  },
  playerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  player: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  playerInput: {
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    color: "#fff",
    // elevation: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    minWidth: "30%",
    borderRadius: 7,
  },
  status: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  board: {
    flexDirection: "column",
    gap: 10,
  },
  boardRow: {
    flexDirection: "row",
    gap: 10,
  },
  resetWrapper: {
    marginTop: 10,
    alignItems: "center",
  },
  reset: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#888",
  },
  resetActive: {
    color: "red",
  },
});
