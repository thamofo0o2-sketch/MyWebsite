/* =========================
   LOADING SCREEN
========================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.classList.add("hidden");

        }, 1800);

    }

});



/* =========================
   CUSTOM CURSOR
========================= */

const cursorDot = document.querySelector(".cursor-dot");

const cursorRing = document.querySelector(".cursor-ring");


let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;


    if (cursorDot) {

        cursorDot.style.left = mouseX + "px";

        cursorDot.style.top = mouseY + "px";

    }

});


function animateCursor() {

    ringX += (mouseX - ringX) * 0.15;

    ringY += (mouseY - ringY) * 0.15;


    if (cursorRing) {

        cursorRing.style.left = ringX + "px";

        cursorRing.style.top = ringY + "px";

    }


    requestAnimationFrame(animateCursor);

}


animateCursor();



/* Cursor hover */

const hoverElements = document.querySelectorAll(
    "a, button, input, .card, .music-player"
);


hoverElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        if (cursorRing) {

            cursorRing.classList.add("hover");

        }

    });


    element.addEventListener("mouseleave", () => {

        if (cursorRing) {

            cursorRing.classList.remove("hover");

        }

    });

});



/* =========================
   SCROLL REVEALS
========================= */

const revealElements = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});



/* =========================
   MUSIC PLAYER
========================= */


/*
    ADD YOUR SONGS HERE.

    Put the actual MP3 files inside:

    music/song1.mp3
    music/song2.mp3
    music/song3.mp3

    Then change the names below if needed.
*/

const songs = [

    {
        title: "Klypse Radio — Track 01",
        file: "music/song1.mp3"
    },

    {
        title: "Klypse Radio — Track 02",
        file: "music/song2.mp3"
    },

    {
        title: "Klypse Radio — Track 03",
        file: "music/song3.mp3"
    }

];


const audio = document.getElementById("backgroundMusic");

const playPause = document.getElementById("playPause");

const previousSong = document.getElementById("previousSong");

const nextSong = document.getElementById("nextSong");

const muteButton = document.getElementById("muteButton");

const volumeSlider = document.getElementById("volumeSlider");

const songTitle = document.getElementById("songTitle");

const songStatus = document.getElementById("songStatus");


let currentSong = 0;


/* Default volume */

if (audio) {

    audio.volume = 0.35;

}



/* Load song */

function loadSong(index) {

    if (!audio || !songs.length) return;


    currentSong = index;


    audio.src = songs[currentSong].file;


    audio.load();


    if (songTitle) {

        songTitle.textContent =
            songs[currentSong].title;

    }


    if (songStatus) {

        songStatus.textContent = "Ready";

    }

}


/* Play */

function playSong() {

    if (!audio) return;


    audio.play()
        .then(() => {

            if (playPause) {

                playPause.textContent = "Ⅱ";

            }


            if (songStatus) {

                songStatus.textContent = "Playing";

            }

        })
        .catch(() => {

            /*
                Browsers can block autoplay.
                The user can press Play.
            */

            if (songStatus) {

                songStatus.textContent =
                    "Press play to start";

            }

        });

}


/* Pause */

function pauseSong() {

    if (!audio) return;


    audio.pause();


    if (playPause) {

        playPause.textContent = "▶";

    }


    if (songStatus) {

        songStatus.textContent = "Paused";

    }

}


/* Play / Pause */

if (playPause) {

    playPause.addEventListener("click", () => {

        if (audio.paused) {

            playSong();

        } else {

            pauseSong();

        }

    });

}


/* Next */

if (nextSong) {

    nextSong.addEventListener("click", () => {

        currentSong++;

        if (currentSong >= songs.length) {

            currentSong = 0;

        }

        loadSong(currentSong);

        playSong();

    });

}


/* Previous */

if (previousSong) {

    previousSong.addEventListener("click", () => {

        currentSong--;

        if (currentSong < 0) {

            currentSong = songs.length - 1;

        }

        loadSong(currentSong);

        playSong();

    });

}


/* Automatic next song */

if (audio) {

    audio.addEventListener("ended", () => {

        currentSong++;

        if (currentSong >= songs.length) {

            currentSong = 0;

        }

        loadSong(currentSong);

        playSong();

    });

}


/* Mute */

if (muteButton) {

    muteButton.addEventListener("click", () => {

        audio.muted = !audio.muted;


        if (audio.muted) {

            muteButton.textContent = "🔇";

        } else {

            muteButton.textContent = "🔊";

        }

    });

}


/* Volume */

if (volumeSlider) {

    volumeSlider.addEventListener("input", () => {

        audio.volume =
            Number(volumeSlider.value);


        if (audio.volume === 0) {

            audio.muted = true;

            muteButton.textContent = "🔇";

        } else {

            audio.muted = false;

            muteButton.textContent = "🔊";

        }

    });

}


/* Load first song */

loadSong(0);
