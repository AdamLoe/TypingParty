let adjectives = ["Oniony", "Smelly", "Gooby", "Dingusy"];
let verbs = ["Running", "Peeing", "Dabbing"];
let nouns = ["Giraffe", "MemerDawg", "Astronaut"];

let getRandom = arr => {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

let getRandomServerName = () => {
  let string = getRandom(adjectives);
  string += getRandom(verbs);
  string += getRandom(nouns);
  return string;
};

export default getRandomServerName;
