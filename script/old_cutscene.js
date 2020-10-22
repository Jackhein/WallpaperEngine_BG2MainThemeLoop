'use strict';

var		animationPlayed = 0
var		loop_music = false
const	animationImage = ['image_bg2_sunrise', `image_bg2_sunset`]
const	animationSound = ['sound_bg2_sunrise', `sound_bg2_sunset`]

/**
 * 
 */
export function init() {
	var xhr = new XMLHttpRequest()

	xmlhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var myArr = JSON.parse(this.responseText);
			myFunction(myArr);
		}
	}
	xhr.open(`GET`, `http://ip-api.com/json/`, true)
	xhr.send()
}



export function myFunction(arr) {
	var out = "";
	var i;
	for(i = 0; i < arr.length; i++) {
		out += '<a href="' + arr[i].url + '">' +
		arr[i].display + '</a><br>';
	}
	document.getElementById("id01").innerHTML = out;
}

/**
 * @constant {date} get current time
 * @constant {bool} check if new hour
 * @constant {int} get animation for current time
 * Pause music and hide background to play time animation
 */
export function update() {
	const dateTime = new Date()
	const newHour = dateTime.getMinutes() === 0 && dateTime.getSeconds() < 1
	const animationValue = (dateTime.getHours() === 6 ? 1 : (dateTime.getHours() === 18 ? 2 : 0))
	if (animationPlayed === 0 && animationValue > 0 && newHour) {
		loop_music = thisScene.getLayer(`sound_bg2_main_theme_part_loop`).isPlaying()
		animationPlayed = animationValue
		thisLayer.visible = true
		thisScene.getLayer(animationSound[animationPlayed - 1]).play()
		thisScene.getLayer(animationImage[animationPlayed - 1]).visible = true
		thisScene.getLayer((loop_music ? `sound_bg2_main_theme_part_loop` : `sound_bg2_main_theme_part_one`)).pause()
	} else if (animationPlayed > 0 && !thisScene.getLayer(animationSound[animationPlayed - 1]).isPlaying()) {
		thisScene.getLayer((loop_music ? `sound_bg2_main_theme_part_loop` : `sound_bg2_main_theme_part_one`)).play()
		thisScene.getLayer(animationImage[animationPlayed - 1]).visible = false
		thisScene.getLayer(animationSound[animationPlayed - 1]).stop()
		thisLayer.visible = false
		animationPlayed = 0
	}
}