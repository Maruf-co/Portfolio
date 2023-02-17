const myEmail = "m.asatullaev@innopolis.university";

const jokeButton = document.getElementsByClassName("jokeButton")[0];

const jokeImage = document.getElementsByClassName("jokeImage")[0];
const jokeTitle = document.getElementsByClassName("jokeTitle")[0];
const jokeDate = document.getElementsByClassName("jokeDate")[0];

const getId = (email) => {
  return fetch(`https://fwd.innopolis.app/api/hw2?email=${email}`).then((res) =>
    res.json()
  );
};

const fetchJoke = (id) => {
  return fetch(`https://getxkcd.vercel.app/api/comic?num=${id}`).then((res) =>
    res.json()
  );
};

const fillJokeObject = (jokeObj) => {
  const { alt, title, img, year, month, day } = jokeObj;

  const date = new Date(year, month, day);

  jokeImage.src = img;
  jokeImage.alt = alt;
  jokeTitle.textContent = title;
  jokeDate.textContent = date.toLocaleDateString();
};

jokeButton.addEventListener("click", async function () {
  jokeTitle.textContent = "Wait, I'm thinking...";

  const jokeId = await getId(myEmail);

  const jokeObj = await fetchJoke(jokeId);

  console.log("got Joke:", jokeObj);
  await fillJokeObject(jokeObj);
});
