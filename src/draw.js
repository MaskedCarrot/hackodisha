import { gestureState } from "./gestureState";

export const draw = (current, prev, state, ctx) => {

    if (state === gestureState.POINTER_STATE) {
        const x = current[0];
        // Get y point
        const y = current[1];
        // Start drawing
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 3 * Math.PI);

        // Set line color
        ctx.fillStyle = 'red';
        ctx.fill();
    } else if (state === gestureState.WRITE_STATE) {
        ctx.beginPath();
        ctx.moveTo(prev[0], prev[1]);
        ctx.lineTo(current[0], current[1]);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    return ctx.save();
};