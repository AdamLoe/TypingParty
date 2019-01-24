import React from "react";

import { playerUpdate } from "../../actions/api";
import PT from "prop-types";

class TypingController extends React.Component {
  state = {
    string: "",
    started: false,
    finished: false,

    currWord: 0,
    lastWord: 1,

    correctLetters: 0,
    incorrectLetters: 0
  };

  currWord = () => this.state.currWord;

  shouldDisable = () => !this.state.started || this.state.finished;

  hasFinishedRace = e =>
    this.currWord() === e.target.value &&
    this.state.currWord === this.state.lastWord;

  hasFinishedWord = e =>
    this.currWord() === e.target.value + " " &&
    this.state.currWord !== this.state.lastWord;

  update = obj => {
    playerUpdate(obj);
    this.setState(state => ({
      ...state,
      ...obj
    }));
  };

  finishRace = e => {
    this.update({ finished: true });
    e.target.value = "";
  };

  finishWord = e => {
    this.update({ currChar: 0 });
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
    if (this.shouldDisable) e.target.value = "";
    else {
      if (this.hasFinishedRace(e)) this.finishRace(e);
      else if (this.hasFinishedWord(e)) this.finishWord(e);
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
      <div className="TypingParagraph">
        <span className="completed">{completedWords}</span>
        &nbsp;
        <span className="inProcess">
          <span className="Correct">{correct}</span>
          <span className="Incorrect">{incorrect}</span>
          {left}
        </span>
        &nbsp;
        <span>{leftWords}</span>
        <input
          autoComplete={"off"}
          autoCorrect={"off"}
          autoCapitalize={"off"}
          autoFocus
          onInput={this.inputChange}
        />
      </div>
    );
  }
}

export default TypingController;
