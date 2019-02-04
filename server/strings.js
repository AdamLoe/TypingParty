let getString = () => {
  let length = strings.length;
  let index = Math.floor(Math.random() * length);
  return strings[index];
};

let strings = [
  "memes v2",
  "Sometimes you are too ashamed to leave. That was true now. And sometimes you need too much to know the facts, and so humbly and stupidly you stay.",
  "Well, on a basic cellular level we're the sum total of all our ancestors' biological matter. But what if more than biological traits get passed down from generation to generation? What if I like sunflower seeds because I'm genetically predisposed to liking them?",
  "Just a cast away an island lost at sea. Another lonely day, no one here but me. More loneliness than any man could bear, rescue me before I fall into despair.",
  "Most localities haven't found a better way to de-ice roadways and sidewalks than salt. Salt is also effective in keeping hard packs of ice from forming in the first place. While a number of chemicals have been developed to melt ice, salt remains a much cheaper alternative.",
  'Good evening, here\'s an update on last week\'s nursing home expose, "Geezers in Freezers" - it turns out the rest home was adequately heated; the footage you saw was of a fur-storage facility. We\'ve also been told to apologize for using the term "geezers". Now, coming up next, "The Case of the Cantankerous Old Geezer.',
  "William Shakespeare did not exist. His plays were masterminded in 1589 by Francis Bacon, who used a Ouija board to enslave play-writing ghosts."
];

module.exports = getString;
