import { useRef } from 'react';
import Webcam from "react-webcam";
import * as handpose from "@tensorflow-models/handpose";
import { detectGesture } from "./detectGesture";
import { gestureState } from "./gestureState";
import { draw } from "./draw";


const SmartWebcam = () => {


    const webcamRef = useRef(null);
    const canvasRef1 = useRef(null);
    const canvasRef2 = useRef(null);
    let prevPointerCoordinates = [0, 0, 0]
    let ctx = null
    let timer = 0
    let slidePtr = 0;

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
            canvasRef1.current.width = videoWidth;
            canvasRef1.current.height = videoHeight;

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
                    ctx = canvasRef1.current.getContext("2d");
                }

                if (state === gestureState.SWIPE_LEFT || state === gestureState.SWIPE_RIGHT) {
                    if (timer > 50) {
                        changeSlide(ctx2, slideArray, slidePtr, direction)
                        timer = 0
                    }
                }
                else {
                    draw(currentPointerCoordinates, prevPointerCoordinates, state, ctx)
                    prevPointerCoordinates = currentPointerCoordinates
                }
            }


        }
    };

    runHandpose();




    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1, background: "black" }}>
                <canvas ref={canvasRef1}>
                </canvas>
                <canvas ref={canvasRef2}>

                </canvas>
            </div>
            <Webcam
                ref={webcamRef}
                style={{ flex: 1 }}
            >

            </Webcam>
        </div>
    );
}

export default SmartWebcam;