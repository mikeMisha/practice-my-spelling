import React, { useState } from 'react';
import { connect } from 'react-redux';
import AddWordForm from './AddWordForm';
import {
  createWordList,
  setAddError,
  setIsAddErrorVis,
  setCurrentList,
} from '../actions';
import RenderError from '../components/RenderError';
import { AnimatePresence, motion } from 'framer-motion';

const AddWordContainer = (props) => {
  const {
    wordList,
    isSignedIn,
    userId,
    createWordList,
    setAddError,
    isAddErrorVis,
    addError,
    setIsAddErrorVis,
  } = props;

  const [inputValue, setInputValue] = useState('');

  const validateInput = (input) => {
    if (/^[\p{L}, ]+$/u.test(input)) {
      var wordListArr = input
        .toLowerCase()
        .split(/\s*(?:,|$)\s*|\s/)
        .filter((e) => e !== '');
    }
    return [...new Set(wordListArr)];
  };

  const onFormSubmit = (e) => {
    const validList = validateInput(inputValue);
    e.preventDefault();

    if (validList.length === 0) {
      setAddError(
        'Word(s) must contain no numbers, symbols, or special characters.'
      );
      return;
    }

    setInputValue('');

    if (listContainsWords(validList)) {
      const { containedList, filteredList } = listContainsWords(validList);
      createWordList({ filteredList, isSignedIn, userId, name: 'defaultList' });
      setAddError(
        `All words were added except "${containedList.join(
          ', '
        )}" since the word list already contains them.`
      );
      return;
    }
    setIsAddErrorVis(false);
    createWordList({ validList, isSignedIn, userId, name: 'defaultList' });
    setCurrentList({ name: 'defaultlist', list: validList });
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
    <div className="text-light  my-2">
      <div className="d-flex justify-content-center flex-column py-1 ">
        <motion.div
          animate={{
            height: isAddErrorVis ? '80px' : 0,
            marginBottom: isAddErrorVis ? '8px' : 0,
          }}
          transition={{ delay: !isAddErrorVis && 0.2, duration: 0.2 }}
          className={'d-flex justify-content-center align-items-center'}
        >
          <AnimatePresence
            exitBeforeEnter={true}
            onExitComplete={() => setAddError('')}
          >
            {isAddErrorVis && (
              <RenderError
                error={addError}
                onClick={() => setIsAddErrorVis(false)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="d-flex justify-content-center pb-2">
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
    isAddErrorVis: state.errors.isAddErrorVis,
    addError: state.errors.addError,
  };
};

export default connect(mapStateToProps, {
  createWordList,
  setAddError,
  setIsAddErrorVis,
  setCurrentList,
})(AddWordContainer);
