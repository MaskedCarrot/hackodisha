import { useRef } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from "./utilities";
import { detectGesture } from "./detectGesture";
import { gestureState } from "./gestureState";
import { draw } from "./draw";
import SmartWebcam from "./SmartWebcam";
import ScreenRecording from "./ScreenRecording";

function App() {
  return (
    <div className="App" color="red">
      <ScreenRecording
        screen={true}
        audio={true}
        video={false}
        downloadRecordingPath="Screen_Recording_Demo"
        downloadRecordingType="mp4"
        emailToSupport="vishwasmodi220@gmail.com"
      ></ScreenRecording>
      <SmartWebcam></SmartWebcam>
    </div>
  );
}

/*
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
*/

export default App;
