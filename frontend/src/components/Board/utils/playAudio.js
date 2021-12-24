import MoveSound from "../audio/Move.mp3";
import CaptureSound from "../audio/Capture.mp3";

export const playAudio = (option = "Move") => {
  const audio = new Audio(option === "Move" ? MoveSound : CaptureSound);
  audio.play();
};
