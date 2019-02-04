import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import { playerUpdate } from "../../actions/api";

class TypingController extends React.Component {
  state = {
    string: this.props.string,
    words: this.props.string.split(" "),
    maxChars: this.props.string.length,

    currWord: 0,
    lastWord: this.props.string.split(" ").length - 1,

    started: true,
    finished: false,

    correctLetters: 0,
    incorrectLetters: 0
  };

  currWord = () => this.state.words[this.state.currWord];

  shouldDisable = () =>
    !this.props.hasRaceStarted || !this.state.started || this.state.finished;

  hasFinishedRace = e =>
    this.currWord() === e.target.value &&
    this.state.currWord === this.state.lastWord;

  hasFinishedWord = e =>
    this.currWord() + " " === e.target.value &&
    this.state.currWord !== this.state.lastWord;

  finishRace = e => {
    playerUpdate({ currChar: this.state.maxChars, finished: true });
    this.setState(state => ({
      ...state,
      finished: true,
      correctLetters: this.state.correctLetters + 1
    }));
    e.target.value = "";
  };

  finishWord = e => {
    let { currWord, words } = this.state;

    currWord += 1;
    let currChar = words.slice(0, currWord).toString(" ").length;

    playerUpdate({ currChar });
    this.setState(state => ({
      ...state,
      currWord,
      correctLetters: 0,
      incorrectLetters: 0
    }));
    e.target.value = "";
  };

  handleWord = e => {
    let inputWord = e.target.value;
    let goalWord = this.currWord();

    let correct = 0;
    for (let i = 0; i < inputWord.length; i++) {
      if (inputWord[i] === goalWord[i]) {
        correct += 1;
      } else {
        break;
      }
    }
    this.setState(state => {
      return {
        ...state,
        correctLetters: correct,
        incorrectLetters: inputWord.length - correct
      };
    });
  };

  handleInput = e => {
    if (this.shouldDisable()) e.target.value = "";
    else {
      if (this.hasFinishedWord(e)) this.finishWord(e);
      else if (this.hasFinishedRace(e)) this.finishRace(e);
      else this.handleWord(e);
    }
  };

  render() {
    let { words, currWord, correctLetters, incorrectLetters } = this.state;

    let completedWords = words.slice(0, currWord).join(" ");
    let leftWords = words.slice(currWord + 1).join(" ");

    let word = words[currWord];
    let correct = word.slice(0, correctLetters);
    let incorrect = word.slice(
      correctLetters,
      correctLetters + incorrectLetters
    );
    let left = word.slice(correctLetters + incorrectLetters);

    return (
      <div className="TypingController">
        <div className="TypingParagraph">
          <span className="completed">{completedWords}</span>
          {"\u00A0"}
          <span className="inProcess">
            <span className="Correct">{correct}</span>
            <span className="Incorrect">{incorrect}</span>
            {left}
          </span>
          {"\u00A0"}
          <span>{leftWords}</span>
        </div>
        <div className="TypingInput">
          <input
            autoComplete={"off"}
            autoCorrect={"off"}
            autoCapitalize={"off"}
            autoFocus
            onInput={this.handleInput}
          />
        </div>
      </div>
    );
  }
}
TypingController.propTypes = {
  string: PT.string.isRequired,
  hasRaceStarted: PT.bool.isRequired
};

let mapState = state => {
  let { string, hasRaceStarted } = state.game.info;
  return {
    string,
    hasRaceStarted
  };
};

export default connect(mapState)(TypingController);
