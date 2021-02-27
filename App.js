import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Bird from "./components/Bird";
import Obstacles from "./components/Obstacle";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstacleLeft, setObstacleLeft] = useState(screenWidth);
  const [obstacleLeft2, setObstacleLeft2] = useState(
    screenWidth + screenWidth / 2 + 30
  );
  const [obstacleNegHeight, setObstacleNegHeight] = useState(0);
  const [obstacleNegHeight2, setObstacleNegHeight2] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gravity = 3;
  let gameTimerId;
  let obstacleLeftTimerId;
  let obstacleLeftTimerId2;
  const obstacleWidth = 60;
  const obstacleHeight = 300;
  const gap = 200;

  //start bird falling

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 30);

      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [birdBottom]);

  const jump = () => {
    console.log("jump");
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom((birdBottom) => birdBottom + 50);
      console.log("jumped");
    }
  };

  //start first obstacle

  useEffect(() => {
    if (obstacleLeft > -obstacleWidth) {
      obstacleLeftTimerId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - gravity);
      }, 30);

      return () => {
        clearInterval(obstacleLeftTimerId);
      };
    } else {
      setObstacleLeft(screenWidth);
      setObstacleNegHeight(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [obstacleLeft]);

  useEffect(() => {
    if (obstacleLeft2 > -obstacleWidth) {
      obstacleLeftTimerId2 = setInterval(() => {
        setObstacleLeft2((obstacleLeft2) => obstacleLeft2 - gravity);
      }, 30);

      return () => {
        clearInterval(obstacleLeftTimerId2);
      };
    } else {
      setObstacleLeft2(screenWidth);
      setObstacleNegHeight(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [obstacleLeft2]);

  useEffect(() => {
    if (
      ((birdBottom < obstacleNegHeight + obstacleHeight + 30 ||
        birdBottom > obstacleNegHeight + obstacleHeight + gap - 30) &&
        obstacleLeft > screenWidth / 2 - 30 &&
        obstacleLeft < screenWidth / 2 + 30) ||
      ((birdBottom < obstacleNegHeight2 + obstacleHeight + 30 ||
        birdBottom > obstacleNegHeight2 + obstacleHeight + gap - 30) &&
        obstacleLeft2 > screenWidth / 2 - 30 &&
        obstacleLeft2 < screenWidth / 2 + 30)
    ) {
      console.log("game over");
      gameOver();
    }
  });

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstacleLeftTimerId);
    clearInterval(obstacleLeftTimerId2);
    setIsGameOver(true);
  };

  return (
    <TouchableWithoutFeedback onPress={() => jump()}>
      <View style={styles.container}>
        {isGameOver && <Text>{score}</Text>}
        <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
        <Obstacles
          color={"green"}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstacleNegHeight}
          obstacleLeft={obstacleLeft}
          gap={gap}
        />
        <Obstacles
          color={"yellow"}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstacleNegHeight2}
          obstacleLeft={obstacleLeft2}
          gap={gap}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
