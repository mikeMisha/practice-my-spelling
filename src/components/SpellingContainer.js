import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NumTracker from "./NumTracker";
import TypingInput from "./TypingInput";
import CurrentWord from "./CurrentWord";
import RepCounter from "./RepCounter";
import { connect } from "react-redux";
import { setNextWordIndex, setCurrentRep, setSpellInput } from "../actions";

const SpellingContainer = (props) => {
	const {
		wordList,
		wordIndex,
		setNextWordIndex,
		setCurrentRep,
		userInput,
		currentRep,
		selectedReps,
		setSpellInput,
	} = props;
	var isCorrect = userInput === wordList[wordIndex];
	const [invInputColor, setInvInputColor] = useState("");
	const dropInContainer = {
		hidden: {
			opacity: 0,
		},
		visible: {
			y: "0",
			opacity: 1,
			transition: {
				delay: 0.3,
				type: "spring",
				stiffness: 400,
				damping: 40,
			},
		},
		exit: {
			opacity: 0,
		},
	};
	const dropInBground = {
		hidden: {
			height: 0,
		},
		visible: {
			height: "300px",
		},
		exit: {
			height: 0,
			transition: {
				delay: 0.3,
				type: "spring",
				stiffness: 400,
				damping: 40,
			},
		},
	};

	useEffect(() => {
		setCurrentRep(selectedReps);
	}, []);

	useEffect(() => {
		if (isCorrect) {
			setTimeout(() => {
				if (selectedReps === "infinity") {
					setSpellInput("");
					return;
				}

				if (currentRep === 1 || selectedReps == 1) {
					setNextWordIndex();
					setSpellInput("");
					setCurrentRep(selectedReps);
				} else {
					setCurrentRep(currentRep - 1);
					setSpellInput("");
				}
			}, 200);
		}
	}, [isCorrect]);

	return (
		<AnimatePresence initial={false} exitBeforeEnter={true}>
			{wordList.length !== 0 && (
				<motion.div
					variants={dropInBground}
					initial="hidden"
					animate="visible"
					exit="exit"
					className="mt-4"
				>
					<motion.div
						variants={dropInContainer}
						initial="hidden"
						animate="visible"
						exit="exit"
						className={`d-flex flex-column align-items-center `}
					>
						<div>
							<RepCounter />
						</div>

						<div className="mt-4">
							<CurrentWord setInvInputColor={setInvInputColor} />
						</div>

						<div className="mb-3">
							<NumTracker current={wordIndex + 1} total={wordList.length} />
						</div>
						<div className="my-3">
							<TypingInput invInputColor={invInputColor} />
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const mapStateToProps = (state) => {
	return {
		wordList: state.session.currentWordList.list,
		wordIndex: state.session.currentWordIndex,
		userInput: state.session.userTextInput,
		selectedReps: state.userAppSettings.reps,
		currentRep: state.session.currentRep,
	};
};

export default connect(mapStateToProps, {
	setNextWordIndex,
	setCurrentRep,
	setSpellInput,
})(SpellingContainer);
