import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

const CurrentWord = (props) => {
  const { userInput, index, wordList, setInvInputColor } = props;
  const correctLetters = [];
  let typingColor = 'text-success';
  const lastWord = useRef(wordList[0]);

  const renderWord = () => {
    if (wordList.length === 0)
      return (
        <div
          id="spell-word"
          className="spell-word text-wrap text-dark text-center px-5 fs-3 bg-light py-1"
          style={{ fontWeight: '600' }}
        >
          {lastWord.current}
        </div>
      );
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === wordList[index][i]) {
        correctLetters.push(userInput[i]);
        setInvInputColor('');
      } else {
        typingColor = 'text-danger';
        setInvInputColor('text-danger');
        break;
      }
    }
    const unSpelledChar = wordList[index].replace(correctLetters.join(''), '');

    return (
      <div
        id="spell-word"
        className={`spell-word text-wrap text-dark text-center px-5 fs-3 ${
          unSpelledChar.length === 0 ? 'bg-success' : 'bg-light'
        } py-1`}
        style={{ transition: 'background 0.2s', fontWeight: '600' }}
      >
        <span className={typingColor}>{correctLetters.join('')}</span>
        {unSpelledChar}
      </div>
    );
  };

  return renderWord();
};

const mapStateToProps = (state) => {
  return {
    userInput: state.session.userTextInput,
    index: state.session.currentWordIndex,
    wordList: state.session.currentWordList.list,
  };
};

export default connect(mapStateToProps)(CurrentWord);
