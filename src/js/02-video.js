import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const CURRENT_TIME = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
player.on('timeupdate', throttle(onPlay, 1000));
function onPlay({ seconds }) {
  localStorage.setItem(CURRENT_TIME, seconds);
}
let time = localStorage.getItem(CURRENT_TIME) || 0;

// if (!localStorage.getItem(CURRENT_TIME)) {
//   return;
// } else {
//   try {
//     time = JSON.parse(localStorage.getItem(CURRENT_TIME));
//   } catch (error) {
//     console.log(error.message);
//   }
// }

player
  .setCurrentTime(time)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
    }
  });
