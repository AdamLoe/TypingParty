import React from "react";

import api from "../../actions/api";

class TypingController extends React.Component {
	constructor(props) {
		super(props);
		console.log("Making Typing Controller");

		let string = this.props.string;

		this.state = {
		    string: string,
			finished: false,
			words: string.split(" "),
			
			currWord: 0,
			lastWord: string.split(" ").length - 1,

			correctLetters: 0,
			incorrectLetters: 0,
			
		};
	}

	finishRace() {
		api.playerUpdate({
			finished: true
		});
		this.setState(state => ({
			...state,
			finished: true
		}));
		this.props.finishedRace();
	}

	nextWord(e) {
		e.target.value = "";
		let currWord = this.state.currWord + 1;

		this.setState(state => {
			return {
				...state,
				correctLetters: 0,
				incorrectLetters: 0,
				currWord: currWord,
			};
		});
		api.playerUpdate({
			currWord: currWord
		});
	}

	inputChange = (e) => {
		let { status } = this.props;
	    let { words, currWord, lastWord, finished } = this.state;
		let shouldDisable = (status === "LOBBY" || status === "POSTGAME" || finished);

		if (shouldDisable) {
			e.target.value = "";
		}
		else {
			let goalWord = words[currWord];
			let inputWord = e.target.value;

			let finishedRace = (inputWord === goalWord && currWord === lastWord );
			let finishedWord = (inputWord === goalWord + " ");

			if (finishedRace) {
				this.finishRace();

			} else if (finishedWord) {
				this.nextWord(e);

			} else {
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
						incorrectLetters: inputWord.length - correct,
					};
				});
			}


		}
	};

	render() {
	    let { words, currWord, correctLetters, incorrectLetters} = this.state;

	    let completedWords = words.slice(0, currWord).join(" ");
	    let leftWords = words.slice(currWord+1).join(" ");

	    let word = words[currWord];
	    let correct = word.slice(0, correctLetters);
	    let incorrect = word.slice(correctLetters, correctLetters + incorrectLetters);
	    let left = word.slice(correctLetters + incorrectLetters);

		return (
			<div className="TypingParagraph">
				<span className="completed">
					{ completedWords }
				</span>
				&nbsp;
				<span className="inProcess">
					<span className="Correct">
						{ correct }
					</span>
					<span className="Incorrect">
						{ incorrect }
					</span>
					{ left }
				</span>
				&nbsp;
				<span>
					{ leftWords }
				</span>
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