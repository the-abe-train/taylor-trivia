function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function getRandomLyrics() {
  const allLyrics = await fetch('./data.json')
    .then(response => response.json())
  const randIdx = randomIntFromInterval(1, allLyrics.length - 1);
  const randLyric = allLyrics[randIdx];
  console.log(randLyric)
  return randLyric
}

function reveal(lyrics) {
  document.querySelector("#song").innerHTML = `Song: ${lyrics.song}`
  document.querySelector("#album").innerHTML = `Album: ${lyrics.album}`
  document.querySelector("#answer").innerHTML = ""
  document.querySelector("#reveal").classList.add("hidden")
  document.querySelector("#form").classList.add("hidden")
}

function guess(e, lyrics) {
  // const button
  e.preventDefault();
  const { quote, song, album } = lyrics
  const form = document.querySelector("#form");
  const formData = new FormData(form);
  const guess = formData.get("guess")
  console.log(guess.trim().toLowerCase())
  console.log(song.trim().toLowerCase())
  const p = document.querySelector("#answer")

  if (guess.trim().toLowerCase() === song.trim().toLowerCase()) {
    p.innerHTML = "Great job!"
    reveal(lyrics)
    return
  }
  return p.innerHTML = "Try again!"

}

async function main() {
  const lyrics = await getRandomLyrics()
  const p = document.querySelector("#lyrics")


  document.querySelector("#reveal").addEventListener("click", () => reveal(lyrics))


  // const newGuess = ()

  const form = document.querySelector("#form");
  form.addEventListener("submit", (e) => guess(e, lyrics))
  p.innerHTML = `"${lyrics.quote}"`
}


main()