'use strict';

const logo = document.getElementById("logo");

/**
 * stop music for the duration of the cutscene
 */
cutscene.onplaying = function () {
    logo.hidden = true
    cutscene.hidden = false

    if (audioIntro.ended) {
        audioLoop.pause()
    } else {
        audioIntro.pause()
    }
}

/**
 * resume audio after cutscene
 */
cutscene.onended = function () {
    logo.hidden = false
    cutscene.hidden = true
    if (audioIntro.ended) {
        audioLoop.play()
    } else {
        audioIntro.play()
    }
}