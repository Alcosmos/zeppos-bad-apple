import * as hmUI from "@zos/ui";
// import { log as Logger } from "@zos/utils";
import { TEXT_STYLE } from "zosLoader:./index.page.[pf].layout.js";
import * as display from "@zos/display";
import { create, id } from "@zos/media";

//sconst logger = Logger.getLogger("badapple");
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
	
	const player = create(id.PLAYER);
	
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
	
	let mainTimer = setInterval(() => {
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
						src: 'bad-apple-vid/bad-apple-hv-' + curImageCounter + '.png'
					});
					break;
				case 1:
					curImg = hmUI.createWidget(hmUI.widget.IMG, {
						x: px(-480),
						y: px(60),
						src: 'bad-apple-vid/bad-apple-hv-' + curImageCounter + '.png'
					});
					break;
				case 2:
					curImg = hmUI.createWidget(hmUI.widget.IMG, {
						x: px(0),
						y: px(-420),
						src: 'bad-apple-vid/bad-apple-hv-' + curImageCounter + '.png'
					});
					break;
				case 3:
					curImg = hmUI.createWidget(hmUI.widget.IMG, {
						x: px(480),
						y: px(-420),
						src: 'bad-apple-vid/bad-apple-hv-' + curImageCounter + '.png'
					});
					break;
			}
		}
			
		frameCounter++;
		
		if (frameCounter >= 100) {
			clearInterval(mainTimer);
		}
	}, 66.667);
  },
  onDestroy() {
    //logger.debug("page onDestroy invoked");
  },
});
