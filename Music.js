document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("play-button");
    const playIcon = document.querySelector('#play-button i.fa-music');
    const pauseIcon = document.querySelector('#play-button i.fa-music-slash');

    let backgroundMusic = new Audio("src/ambient.mp3");

    playButton.addEventListener("click", function () {
        if (backgroundMusic.paused) {
            playIcon.style.display = 'inline-block';
            pauseIcon.style.display = 'none';
            backgroundMusic.play()
                .then(() => console.log("Audio playback started"))
                .catch(error => console.error("Error playing audio:", error));
        } else {
            backgroundMusic.pause();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline-block';
        }
    });
});
