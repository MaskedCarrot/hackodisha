import { useRef } from 'react';
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from "./utilities";
import { detectGesture } from "./detectGesture";
import { gestureState } from "./gestureState";
import { draw } from "./draw";

function App() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let prevPointerCoordinates = [0, 0, 0]
  let ctx = null
  let canvasData = null
  let timer = 0

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 1);
  };

  const detect = async (net) => {
    timer += 1

    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand);

      // Draw mesh
      // const ctx = canvasRef.current.getContext("2d");
      // drawHand(hand, ctx);


      const state = detectGesture(hand);

      if (hand.length > 0) {
        const currentPointerCoordinates = hand[0].landmarks[8]
        if (ctx === null) {
          ctx = canvasRef.current.getContext("2d");
          console.log("nice")
        }

        if(state === gestureState.SWIPE_LEFT || state === gestureState.SWIPE_RIGHT)
        {
          console.log(state)
          console.log(timer)
          if(timer > 50)
          {  
            // call function

            console.log("Calling Funtion")
            timer = 0
          }
        }
        else
        {
          draw(currentPointerCoordinates, prevPointerCoordinates, state, ctx)
          prevPointerCoordinates = currentPointerCoordinates
        }
      }
      

    }
  };

  runHandpose();
  

  return (
    <div className="App">
      <header className="App-header" />
      <Webcam
          ref={webcamRef}
          // mirrored = {true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
            rotate: 90
          }}
        />
    </div>
  );
}

export default App;
