import { gestureState } from "./gestureState";

// Points for fingers
const fingerJoints = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
  };


  export const detectGesture = (prediction) => {

    const detectFingerState = (finger) => {
      // console.log(finger)
      if(finger[1] > finger[2] && finger[2] > finger[4])
        return 1;
      else if(finger[4] > finger[1] && finger[4] > finger[2])
        return 2;
      else
        return 0;
    };

    // Check if we have prediction
    if (prediction.length > 0) {
      // Loop through each prediction
    
      // Grab landmark
      const landmarks = prediction[0].landmarks;
      
      // If hand is inverted
      if(landmarks[0][1] <= landmarks[5][1])
        return gestureState.INEFFECTIVE_STATE;
      
      const fingerState = [];

      for (let i = 0; i < Object.keys(fingerJoints).length; i++) {
        let finger = Object.keys(fingerJoints)[i];
        const fingerCoordinates = [];

        for (let j = 0; j < fingerJoints[finger].length; j++) {
          fingerCoordinates.push(landmarks[fingerJoints[finger][j]][1]);

        }

        fingerState.push(detectFingerState(fingerCoordinates));
      }
      if(fingerState[1] === 1 && fingerState[2] === 2 && fingerState[3] === 2 && fingerState[4] === 2)
        return gestureState.WRITE_STATE;
      else if(fingerState[1] === 1 && fingerState[2] === 1 && fingerState[3] === 2 && fingerState[4] === 2)
         return gestureState.POINTER_STATE;
      else if(fingerState[1] === 2 && fingerState[2] === 2 && fingerState[3] === 2 && fingerState[4] === 2)
      {
        if(landmarks[4][0] < landmarks[2][0])
          return gestureState.SWIPE_LEFT;
        else
          return gestureState.SWIPE_RIGHT;
      }
      else
        return gestureState.INEFFECTIVE_STATE;
    }
  };
  
  