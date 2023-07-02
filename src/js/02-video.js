import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const CURRENT_TIME = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
player.on('timeupdate', throttle(onPlay, 1000));
function onPlay({ seconds }) {
  localStorage.setItem(CURRENT_TIME, JSON.stringify(seconds));
}
let time = 0;
if (!localStorage.getItem(CURRENT_TIME)) {
  return;
} else {
  time = JSON.parse(localStorage.getItem(CURRENT_TIME));
}

player
  .setCurrentTime(time)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
