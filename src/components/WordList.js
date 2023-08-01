import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

const WordList = ({ wordList, onWordClick, onDelete }) => {
  const [isListEmpty, setIsListEmpty] = useState(null);

  useEffect(() => {
    if (wordList.length === 0) {
      setIsListEmpty(true);
    } else {
      setIsListEmpty(false);
    }
  }, []);

  useEffect(() => {
    if (wordList.length > 0) {
      setIsListEmpty(false);
    }
  }, [wordList]);

  const renderWordList = () => {
    if (isListEmpty) {
      return (
        <motion.h4 className="text-center d-flex text-nowrap align-items-center justify-content-center h-100 w-100 ">
          No words added!
        </motion.h4>
      );
    }

    return wordList.map((word, index) => {
      return (
        <motion.li
          key={word}
          className="list-item d-flex  justify-content-center align-items-center"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ position: 'relative' }}
        >
          <button onClick={() => onWordClick(index)} className="word-btn">
            {word}
          </button>
          <button
            onClick={() => onDelete(word)}
            className="delete-btn bi bi-x-lg hide"
          ></button>
        </motion.li>
      );
    });
  };

  return (
    <LayoutGroup id="wordlist">
      <motion.div
        id="word-list"
        style={{ minWidth: '250px' }}
        className={isListEmpty ? 'w-100 text-light' : 'w-100 sidebar-list'}
      >
        <AnimatePresence
          onExitComplete={() => {
            wordList.length === 0 && setIsListEmpty(true);
          }}
          initial={false}
        >
          {renderWordList()}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
};

const mapStateToProps = (state) => {
  return {
    wordList: state.session.currentWordList.list,
  };
};

export default connect(mapStateToProps)(WordList);
