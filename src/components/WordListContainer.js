import React, { useEffect } from 'react';
import WordList from './WordList';
import { connect } from 'react-redux';
import { deleteFromWordList, setWordIndex, setSpellInput } from '../actions';
import { motion, AnimatePresence } from 'framer-motion';
import AddWordContainer from '../components/AddWordContainer';

const WordListContainer = (props) => {
  const { deleteFromWordList, setWordIndex, setSpellInput, lists } = props;

  useEffect(() => {
    if (props.isSignedIn) {
      props.setCurrentList({
        name: 'defaultlist',
        list: lists.filter((i) => i.name === 'defaultList')[0].list,
      });
    }
  }, [props.isSignedIn]);

  const onWordDelete = (word) => {
    deleteFromWordList(word);
  };

  const onWordClick = (index) => {
    setWordIndex(index);
    setSpellInput('');
  };

  return (
    <AnimatePresence>
      <motion.div
        id="word-list-container"
        className=" sidebar d-flex flex-column bg-gray wrap-item rounded-3  w-100 h-100"
      >
        <AddWordContainer />
        <h2 className="text-light text-center py-3 border-bottom  border-3 ">
          Word List
        </h2>
        <WordList onWordClick={onWordClick} onDelete={onWordDelete} />

        {props.isListPop && (
          <div className="d-flex mt-auto ">
            <div className="pop-up text-light w-100 py-3">
              <i className="bi bi-info-circle-fill pe-1 "></i> Sign in now to
              save your word list!
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
    isListPop: state.session.currentWordList.list.length !== 0,
  };
};

export default connect(mapStateToProps, {
  deleteFromWordList,
  setWordIndex,
  setSpellInput,
})(WordListContainer);
