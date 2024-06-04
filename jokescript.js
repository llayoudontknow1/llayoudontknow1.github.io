const audio = document.getElementById("badum");
const muteButton = document.getElementById("mute");
const jokeButton = document.querySelector('.getJoke');
const jokeButtonSpan = jokeButton.querySelector('.jokeText');
const jokeHolder = document.querySelector('.joke p');
const loader = document.querySelector('.loader');
const refreshButton = document.getElementById("refresh");

const buttonText = [
  'Ugh.',
  'OMG Dad.',
  'You are the worst',
  'Seriously..',
  'Stop it.',
  'Please stop',
  'That was the worst one',
];
async function fetchJoke() {
  // turn loader on
  loader.classList.remove('hidden');
  const response = await fetch('https://icanhazdadjoke.com', {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  // turn the loader off
  loader.classList.add('hidden');
  return data;
}

function randomItemFromArray(arr, not) {
  const item = arr[Math.floor(Math.random() * arr.length)];
  if (item === not) {
    return randomItemFromArray(arr, not);
  }
  return item;
}
async function handleClick() {
  refreshButton.hidden = false;
  const {
    joke
  } = await fetchJoke();
  jokeHolder.textContent = joke;
  jokeButtonSpan.textContent = randomItemFromArray(
    buttonText,
    jokeButtonSpan.textContent
  );
  setTimeout(playSound, 2000);

}

function mutePage() {
  switch (document.getElementById("badum").muted) {
    case true:
      document.getElementById("badum").muted = false;
      muteButton.textContent = "Mute";
      return
    case false:
      document.getElementById("badum").muted = true;
      muteButton.textContent = "Unmute";
      return
    default:
      console.log("Mute status unavailable.");
      return
  }
  console.log(document.getElementById("badum").muted);
}

function playSound() {
  audio.volume = 0.2;
  audio.currentTime = 0;
  audio.play();
};

function stopSound() {
  if (audio.currentTime >= 1) {
    audio.pause();
    audio.currentTime = 0;
  }
};

function clearPage() {
  jokeHolder.textContent = "";
  jokeButtonSpan.textContent = "Get a Joke";
  refreshButton.hidden = true;
}
  

jokeButton.addEventListener('click', handleClick);
audio.addEventListener('timeupdate', stopSound);
