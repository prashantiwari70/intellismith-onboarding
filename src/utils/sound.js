const clickAudio = new Audio("/sounds/click.wav");
const successAudio = new Audio("/sounds/success.wav");

export const playClick = () => {
  clickAudio.currentTime = 0;
  clickAudio.play();
};

export const playSuccess = () => {
  successAudio.currentTime = 0;
  successAudio.play();
};