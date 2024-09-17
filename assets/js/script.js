const playButton = document.getElementById("play-button");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const progressBar = document.getElementById("progress-bar");
const currentTimeElement = document.getElementById("current-time");
const totalTimeElement = document.getElementById("total-time");
const audio = document.getElementById("audio");

let isPlaying = false;

// Function to format time in minutes:seconds
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

// Function to update the progress bar and time display
function updateProgress() {
  progressBar.value = (audio.currentTime / audio.duration) * 100;
  currentTimeElement.innerText = formatTime(audio.currentTime);
}

// Toggle play/pause functionality
playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline";
  } else {
    audio.pause();
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
  }
});

// Allow user to drag the progress bar to seek
progressBar.addEventListener("input", (e) => {
  const percentage = e.target.value;
  const newTime = (percentage / 100) * audio.duration;
  audio.currentTime = newTime;
});

// Update time and progress bar as the audio plays
audio.addEventListener("timeupdate", updateProgress);

// When audio is loaded, update the total time
audio.addEventListener("loadedmetadata", () => {
  totalTimeElement.innerText = formatTime(audio.duration);
});

// When the audio ends, reset the play button
audio.addEventListener("ended", () => {
  playIcon.style.display = "inline";
  pauseIcon.style.display = "none";
});
