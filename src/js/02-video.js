import Player from "@vimeo/player";
import Throttle from "lodash.throttle";
const iframe = document.querySelector('iframe');
const player = new Player(iframe);


const timeKey = 'videoplayer-current-time';
function saveTimeToLocal({ seconds }) {
    localStorage.setItem(timeKey, seconds);
};
window.addEventListener("load", afterReloading);
player.on('timeupdate', Throttle(saveTimeToLocal, 1000));
function afterReloading() {
    if (!localStorage.getItem(timeKey)) { return };
    const currentVideoTime = localStorage.getItem(timeKey)
    player.setCurrentTime(currentVideoTime).then().catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            break;

        default:
            break;
    }
});
}

