/* =========================================================
   KLYPSE WEBSITE SCRIPT
   Works on:
   - index.html
   - features.html
   - updates.html
========================================================= */


/* =========================================================
   LOADING SCREEN
========================================================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (!loader) {
        return;
    }

    setTimeout(function () {

        loader.classList.add("hidden");

    }, 1600);

});



/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursorDot = document.querySelector(".cursor-dot");

const cursorRing = document.querySelector(".cursor-ring");


let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


document.addEventListener("mousemove", function (event) {

    mouseX = event.clientX;
    mouseY = event.clientY;


    if (cursorDot) {

        cursorDot.style.left = mouseX + "px";

        cursorDot.style.top = mouseY + "px";

    }

});


function updateCursor() {

    ringX += (mouseX - ringX) * 0.15;

    ringY += (mouseY - ringY) * 0.15;


    if (cursorRing) {

        cursorRing.style.left = ringX + "px";

        cursorRing.style.top = ringY + "px";

    }


    requestAnimationFrame(updateCursor);

}


if (cursorRing) {

    updateCursor();

}



/* =========================================================
   CURSOR HOVER EFFECT
========================================================= */

const hoverElements = document.querySelectorAll(
    "a, button, input, .card, .music-player"
);


hoverElements.forEach(function (element) {

    element.addEventListener("mouseenter", function () {

        if (cursorRing) {

            cursorRing.classList.add("hover");

        }

    });


    element.addEventListener("mouseleave", function () {

        if (cursorRing) {

            cursorRing.classList.remove("hover");

        }

    });

});



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add("visible");

    });

}



/* =========================================================
   KLYPSE RADIO
========================================================= */


/*
    PUT YOUR MUSIC HERE:

    music/song1.mp3
    music/song2.mp3
    music/song3.mp3

    Add more objects if you want more songs.
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

const playPauseButton = document.getElementById("playPause");

const previousButton = document.getElementById("previousSong");

const nextButton = document.getElementById("nextSong");

const muteButton = document.getElementById("muteButton");

const volumeSlider = document.getElementById("volumeSlider");

const songTitle = document.getElementById("songTitle");

const songStatus = document.getElementById("songStatus");


let currentSong = 0;



/* =========================================================
   MUSIC SETUP
========================================================= */

if (audio) {

    audio.volume = 0.35;

}


if (volumeSlider) {

    volumeSlider.value = "0.35";

}



/* =========================================================
   LOAD SONG
========================================================= */

function loadSong(index) {

    if (!audio || songs.length === 0) {
        return;
    }


    if (index < 0) {

        index = songs.length - 1;

    }


    if (index >= songs.length) {

        index = 0;

    }


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



/* =========================================================
   PLAY
========================================================= */

function playSong() {

    if (!audio) {
        return;
    }


    const playPromise = audio.play();


    if (playPromise !== undefined) {

        playPromise
            .then(function () {

                if (playPauseButton) {

                    playPauseButton.textContent = "Ⅱ";

                }


                if (songStatus) {

                    songStatus.textContent = "Playing";

                }

            })
            .catch(function () {

                if (songStatus) {

                    songStatus.textContent =
                        "Press play to start";

                }

            });

    }

}



/* =========================================================
   PAUSE
========================================================= */

function pauseSong() {

    if (!audio) {
        return;
    }


    audio.pause();


    if (playPauseButton) {

        playPauseButton.textContent = "▶";

    }


    if (songStatus) {

        songStatus.textContent = "Paused";

    }

}



/* =========================================================
   PLAY / PAUSE BUTTON
========================================================= */

if (playPauseButton) {

    playPauseButton.addEventListener(
        "click",
        function () {

            if (!audio) {
                return;
            }


            if (audio.paused) {

                playSong();

            } else {

                pauseSong();

            }

        }
    );

}



/* =========================================================
   NEXT SONG
========================================================= */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        function () {

            currentSong++;

            if (currentSong >= songs.length) {

                currentSong = 0;

            }


            loadSong(currentSong);

            playSong();

        }
    );

}



/* =========================================================
   PREVIOUS SONG
========================================================= */

if (previousButton) {

    previousButton.addEventListener(
        "click",
        function () {

            currentSong--;

            if (currentSong < 0) {

                currentSong = songs.length - 1;

            }


            loadSong(currentSong);

            playSong();

        }
    );

}



/* =========================================================
   AUTOMATIC NEXT SONG
========================================================= */

if (audio) {

    audio.addEventListener(
        "ended",
        function () {

            currentSong++;

            if (currentSong >= songs.length) {

                currentSong = 0;

            }


            loadSong(currentSong);

            playSong();

        }
    );

}



/* =========================================================
   MUTE
========================================================= */

if (muteButton) {

    muteButton.addEventListener(
        "click",
        function () {

            if (!audio) {
                return;
            }


            audio.muted = !audio.muted;


            if (audio.muted) {

                muteButton.textContent = "🔇";

                if (songStatus) {
                    songStatus.textContent = "Muted";
                }

            } else {

                muteButton.textContent = "🔊";

                if (songStatus) {
                    songStatus.textContent =
                        audio.paused ? "Paused" : "Playing";
                }

            }

        }
    );

}



/* =========================================================
   VOLUME
========================================================= */

if (volumeSlider) {

    volumeSlider.addEventListener(
        "input",
        function () {

            if (!audio) {
                return;
            }


            const volume =
                Number(volumeSlider.value);


            audio.volume = volume;


            if (volume <= 0) {

                audio.muted = true;

                if (muteButton) {
                    muteButton.textContent = "🔇";
                }

            } else {

                audio.muted = false;

                if (muteButton) {
                    muteButton.textContent = "🔊";
                }

            }

        }
    );

}



/* =========================================================
   START FIRST SONG
========================================================= */

if (audio && songs.length > 0) {

    loadSong(0);

}
