interface CommonJoke {
  alt: string;
  day: string;
  month: string;
  year: string;
  img: string;
  title: string;
}

interface SingleJoke extends CommonJoke {
  type: "single";
  joke: string;
}

interface TwopartJoke extends CommonJoke {
  type: "twopart";
  setup: string;
  delivery: string;
}

type Joke = SingleJoke | TwopartJoke;

const myEmail: string = "m.asatullaev@innopolis.university";

const jokeImage = document.getElementsByClassName(
  "jokeImage"
)[0] as HTMLFormElement;
const jokeTitle = document.getElementsByClassName(
  "jokeTitle"
)[0] as HTMLFormElement;
const jokeDate = document.getElementsByClassName(
  "jokeDate"
)[0] as HTMLFormElement;

const getId = async (email: string): Promise<string> => {
  const id: string = await fetch(
    `https://fwd.innopolis.app/api/hw2?email=${email}`
  ).then((res) => res.json());

  return id;
};

const fetchJoke = async (id: string): Promise<Joke> => {
  const data: Joke = await fetch(
    `https://getxkcd.vercel.app/api/comic?num=${id}`
  ).then((res) => res.json());

  return data;
};

const fillJokeObject = (jokeObj: Joke) => {
  const { alt, title, img, year, month, day } = jokeObj;

  const date: Date = new Date(
    parseInt(year),
    parseInt(month) + 1,
    parseInt(day)
  );

  jokeImage.src = img;
  jokeImage.alt = alt;
  jokeTitle.textContent = title;
  jokeDate.textContent = date.toLocaleDateString();
};

const showJoke = async () => {
  const jokeId = await getId(myEmail);

  const jokeObj: Joke = await fetchJoke(jokeId);

  fillJokeObject(jokeObj);
};

showJoke();
