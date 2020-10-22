'use strict';

const cutScene = document.getElementById("cutscene");
const source = document.createElement('source');

/**
 * modify source of cutscene and play it
 */
async function playSourcedCutScene() {
    cutScene.appendChild(source);
    cutScene.play();
}

/**
 * sunrise cutscene played by morning
 */
async function sunRise() {
    source.setAttribute('src', 'video/video_bg2_sunrise.mp4');
    await playSourcedCutScene()
    await sunData()
}

/**
 * sunset cutscene played by evening
 */
async function sunSet() {
    source.setAttribute('src', 'video/video_bg2_sunset.mp4');
    await playSourcedCutScene()
    await sunData()
}