import Player from "@vimeo/player";
import Throttle from "lodash.throttle";
// const playBTN = document.querySelector('#vimeo-player')
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// playBTN.addEventListener('click', onClick)
// function onClick() {
//     player.play()
// }

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
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
}


// done