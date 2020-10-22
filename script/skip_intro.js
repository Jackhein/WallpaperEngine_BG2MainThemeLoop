'use strict';

const	audioIntro = new Audio(`audio/sound_bg2_theme_intro.mp3`)
const	audioLoop = new Audio(`audio/sound_bg2_theme_loop.mp3`)
const	audioSkip = new Audio(`audio/sound_bg2_scm_hitelec.wav`)

audioLoop.loop = true
audioIntro.play().then()

/**
 * play loop parts of the theme after intro ended
 */
audioIntro.onended = async function () {
	await audioLoop.play()
}

/**
 * stop intro part of the theme
 */
async function skipIntro() {
	if (!audioIntro.ended && !audioIntro.paused) {
		audioIntro.currentTime = audioIntro.duration
		await audioSkip.play()
	}
}