import React, { useState } from "react";
import { connect } from "react-redux";
import AddWordForm from "./AddWordForm";
import {
	createWordList,
	setAddError,
	setIsAddErrorVis,
	setCurrentList,
} from "../actions";

const AddWordContainer = (props) => {
	const {
		wordList,
		isSignedIn,
		userId,
		createWordList,
		setAddError,
		setIsAddErrorVis,
	} = props;

	const [inputValue, setInputValue] = useState("");

	const validateInput = (input) => {
		if (/^[\p{L}, ]+$/u.test(input)) {
			var wordListArr = input
				.toLowerCase()
				.split(/\s*(?:,|$)\s*|\s/)
				.filter((e) => e !== "");
		}
		return [...new Set(wordListArr)];
	};

	const onFormSubmit = (e) => {
		const validList = validateInput(inputValue);
		e.preventDefault();

		if (validList.length === 0) {
			setAddError(
				"Word(s) must contain no numbers, symbols, or special characters."
			);
			return;
		}

		setInputValue("");

		if (listContainsWords(validList)) {
			const { containedList, filteredList } = listContainsWords(validList);
			createWordList({ filteredList, isSignedIn, userId, name: "defaultList" });
			setAddError(
				`All words were added except "${containedList.join(
					", "
				)}" since the word list already contains them.`
			);
			return;
		}
		setIsAddErrorVis(false);
		createWordList({ validList, isSignedIn, userId, name: "defaultList" });
		setCurrentList({ name: "defaultlist", list: validList });
	};

	const listContainsWords = (list) => {
		if (wordList === null) return;

		const containedList = [];
		const filteredList = list.filter((word) => {
			if (wordList.includes(word)) {
				containedList.push(word);
				return false;
			}
			return word;
		});

		if (containedList.length === 0) {
			return false;
		}

		return { containedList, filteredList };
	};

	const onInputChange = (e) => setInputValue(e.target.value);

	return (
		<div>
			<small className="d-flex justify-content-center pt-4 pb-1">
				<i className="bi bi-info-circle-fill pe-1"></i> You can add more then one
				word at a time by seprating words with commas or spaces.
			</small>
			<div className="d-flex justify-content-center pt-1">
				<AddWordForm
					onFormSubmit={onFormSubmit}
					onInputChange={onInputChange}
					inputValue={inputValue}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		wordList: state.session.currentWordList.list,
		isSignedIn: state.auth.isSignedIn,
		userId: state.auth.userId,
	};
};

export default connect(mapStateToProps, {
	createWordList,
	setAddError,
	setIsAddErrorVis,
	setCurrentList,
})(AddWordContainer);
