const jokeButton = document.getElementsByClassName("jokeButton")[0];
const jokeText = document.getElementsByClassName("jokeText")[0];

const myEmail = "m.asatullaev@innopolis.university";

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

jokeButton.addEventListener("click", async function () {
  jokeText.textContent = "Wait, I'm thinking...";

  const jokeId = await getId(myEmail);

  const joke = await fetchJoke(jokeId);

  jokeText.textContent = joke.alt;
});
