 'use strict';

var animation_timer = 0.0

/**
 * @param {Boolean} value - for property 'visible'
 */
export function update(value) {
	if (thisScene.getLayer(`effect_switch_song`).visible) {
		animation_timer -= engine.frametime
		thisScene.getLayer(`effect_switch_song`).visible = (animation_timer > 0)
	}
	return value;
}

export function cursorClick() {
	if (thisScene.getLayer(`sound_bg2_main_theme_part_one`).isPlaying()) {
		animation_timer = 0.5
		thisScene.getLayer(`effect_switch_song`).visible = true
		thisScene.getLayer(`sound_switch_song`).play()
		thisScene.getLayer(`sound_bg2_main_theme_part_one`).stop()
	}
}