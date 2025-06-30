import * as hmUI from "@zos/ui";
// import { log as Logger } from "@zos/utils";
import { TEXT_STYLE } from "zosLoader:./index.page.[pf].layout.js";
import * as display from "@zos/display";
import { create, id } from "@zos/media";
import { onDigitalCrown } from '@zos/interaction'
import * as hmInteraction from '@zos/interaction';

//sconst logger = Logger.getLogger("badapple");

let player = null;
let mainTimer = null;

onDigitalCrown({
	callback: (key, degree) => {
		if (key != hmInteraction.KEY_HOME) {
			return;
		}
		
		let curVol = null;
		
		if (player != null) {
			curVol = player.getVolume();
		}
		
		console.log('Volume: ' + curVol + ', degree: ' + degree);
		
		let rotation = -degree;
		
		curVol += rotation;
		
		
		if (curVol > 100) {
			curVol = 100;
		} else if (curVol < 0) {
			curVol = 0;
		}
		
		player.setVolume(curVol);
	},
})

Page({
	onInit() {
		//logger.debug("page onInit invoked");
	},
	build() {
		//logger.debug("page build invoked");
		//hmUI.createWidget(hmUI.widget.TEXT, TEXT_STYLE);

		display.pauseDropWristScreenOff({ duration: 0 });
		display.pausePalmScreenOff({ duration: 0 });
		display.setWakeUpRelaunch({ relaunch: true });

		player = create(id.PLAYER);

		player.addEventListener(player.event.PREPARE, function (result) {
			if (result) {
				//console.log('=== prepare succeed ===')

				player.start();
			} else {
				//console.log('=== prepare fail ===')
				player.release();
			}
		})

		player.setSource(player.source.FILE, { file: 'bad-apple.mp3' });
		player.prepare();

		// hmUI.createWidget(hmUI.widget.IMG, {
		//   x: px(0),
		//   y: px(60),
		//   src: 'bad-apple-vid/bad-apple-hv-' + 100 + '.png'
		// });

		let curImg = null;

		let frameCounter = 0;
		let imageCounter = 0;

		mainTimer = setInterval(() => {
			if (frameCounter % 4 == 0) {
				imageCounter++;
			}

			let curImageCounter = imageCounter * 4;

			if (curImg != null) {
				hmUI.deleteWidget(curImg);
				curImg = null;
			}

			if (frameCounter >= 23) {
				console.log(frameCounter % 4);
				console.log('bad-apple-vid/bad-apple-hv-' + curImageCounter + '.png');

				switch (frameCounter % 4) {
					case 0:
						curImg = hmUI.createWidget(hmUI.widget.IMG, {
							x: px(0),
							y: px(60),
							w: px(480),
							h: px(360),
							pos_x: px(0),
							pos_y: px(0),
							src: 'bad-apple-vid/bad-apple-hv-' + curImageCounter + '.png'
						});
						break;
					case 1:
						curImg = hmUI.createWidget(hmUI.widget.IMG, {
							x: px(0),
							y: px(60),
							w: px(480),
							h: px(360),
							pos_x: px(-480),
							pos_y: px(0),
							src: 'bad-apple-vid/bad-apple-hv-' + curImageCounter + '.png'
						});
						break;
					case 2:
						curImg = hmUI.createWidget(hmUI.widget.IMG, {
							x: px(0),
							y: px(60),
							w: px(480),
							h: px(360),
							pos_x: px(0),
							pos_y: px(-360),
							src: 'bad-apple-vid/bad-apple-hv-' + curImageCounter + '.png'
						});
						break;
					case 3:
						curImg = hmUI.createWidget(hmUI.widget.IMG, {
							x: px(0),
							y: px(60),
							w: px(480),
							h: px(360),
							pos_x: px(-480),
							pos_y: px(-360),
							src: 'bad-apple-vid/bad-apple-hv-' + curImageCounter + '.png'
						});
						break;
				}
			}

			frameCounter++;

			if (imageCounter >= 3261) {
				clearInterval(mainTimer);
			}
		}, 66.667);
	},
	onDestroy() {
		//logger.debug("page onDestroy invoked");
		if (mainTimer != null) {
			clearInterval(mainTimer);
		}
	}
});
