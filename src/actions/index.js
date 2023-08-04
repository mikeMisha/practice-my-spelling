import axios from 'axios';
import { db } from '../firebase';
import {
  arrayUnion,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayRemove,
} from 'firebase/firestore';

export const signIn = (userId) => {
  // Check if a user already exists
  return async (dispatch, getState) => {
    const userDoc = doc(db, 'users', userId);
    const docSnap = await getDoc(userDoc);

    if (!docSnap.exists()) {
      await setDoc(userDoc, {})
        .then(() => {
          console.log('User added successfully!');
        })
        .catch((error) => {
          console.error('Error adding user: ', error);
        });
    } else {
      console.log('User already exists!');
    }
    dispatch({ type: 'SIGN_IN', payload: userId });
  };
};

export const setUser = (userId) => {
  return {
    type: 'SET_USER',
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT',
  };
};

export const setReps = (num) => {
  return {
    type: 'SET_REPS',
    payload: num,
  };
};

export const setLoading = (isLoading) => {
  return {
    type: 'SET_LOADING',
    payload: isLoading,
  };
};

export const updateWordList = (wordList) => {
  return {
    type: 'UPDATE_WORDLIST',
    payload: wordList,
  };
};
export const createWordList = ({
  validList,
  filteredList,
  isSignedIn,
  userId,
  name,
}) => {
  return async (dispatch, getState) => {
    const currentWordList = getState().session.currentWordList;
    const isShuffleMode = getState().userAppSettings.isShuffleMode;
    const cachedList = getState().session.cachedList;
    if (isShuffleMode) {
      dispatch({ type: 'SET_CURRENT_LIST', payload: cachedList });
      dispatch({ type: 'SET_SHUFFLE_LIST', payload: [] });
      dispatch({ type: 'SET_CACHED_LIST', payload: [] });
      dispatch({ type: 'TOGGLE_SHUFFLE', payload: false });
    }
    const addedList = {
      name: name,
      list: !validList ? filteredList : validList,
    };
    const defaultList = addedList.list;
    if (isSignedIn) {
      const userDoc = doc(db, 'users', userId);
      await updateDoc(userDoc, {
        wordlist: arrayUnion(...defaultList),
      })
        .then(() => {
          console.log('Words added successfully to the wordlist!');
        })
        .catch((error) => {
          console.error('Error adding words to the wordlist: ', error);
        });
      /* let lists = [...getState().lists];

      if (lists.every((list) => list.name !== addedList.name)) {
        lists.push(addedList);
      } else {
        lists = lists.map((savedList) => {
          return savedList.name === addedList.name
            ? {
                name: addedList.name,
                list: [...savedList.list, ...addedList.list],
              }
            : savedList;
        });
      }

      const response = await axios.put(
        process.env.REACT_APP_HEROKU_DB + userId,
        { lists }
      );

      dispatch({
        type: 'CREATE_WORDLIST',
        payload: {
          lists: response.data.lists,
          createdList: lists.find((list) => list.name === addedList.name),
        },
      }); */
      dispatch({
        type: 'CREATE_WORDLIST',
        payload: {
          lists: [addedList],
          createdList: {
            ...addedList,
            list: [...currentWordList.list, ...addedList.list],
          },
        },
      });
    } else {
      dispatch({
        type: 'CREATE_WORDLIST',
        payload: {
          lists: [addedList],
          createdList: {
            ...addedList,
            list: [...currentWordList.list, ...addedList.list],
          },
        },
      });
    }
  };
};

export const setShuffleList = (isShuffleMode) => {
  const shuffleArray = (array) => {
    let arr = [...array];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  return (dispatch, getState) => {
    const { name, list } = getState().session.currentWordList;
    const cachedList = getState().session.cachedList;
    const shuffle = shuffleArray(list);
    if (isShuffleMode) {
      dispatch({ type: 'SET_CACHED_LIST', payload: { name, list } });
      dispatch({ type: 'SET_SHUFFLE_LIST', payload: shuffle });
      dispatch({ type: 'SET_CURRENT_LIST', payload: { name, list: shuffle } });
      dispatch({ type: 'TOGGLE_SHUFFLE', payload: true });
    } else {
      dispatch({ type: 'SET_CURRENT_LIST', payload: cachedList });
      dispatch({ type: 'SET_SHUFFLE_LIST', payload: [] });
      dispatch({ type: 'SET_CACHED_LIST', payload: [] });
      dispatch({ type: 'TOGGLE_SHUFFLE', payload: false });
    }
  };
};
export const deleteFromWordList = (deletedWord) => {
  return async (dispatch, getState) => {
    const currentWordList = getState().session.currentWordList;
    const currentWordIndex = getState().session.currentWordIndex;
    const currentWord = currentWordList.list[currentWordIndex];
    const isSignedIn = getState().auth.isSignedIn;
    const userId = getState().auth.userId;
    const savedLists = getState().lists;
    const shuffledList = getState().session.shuffledList;
    const cachedList = getState().session.cachedList;

    const isShuffleMode = getState().userAppSettings.isShuffleMode;
    const filteredCurrentList = currentWordList.list.filter(
      (word) => word !== deletedWord
    );

    if (isSignedIn) {
      const userDoc = doc(db, 'users', userId);

      await updateDoc(userDoc, {
        wordlist: arrayRemove(deletedWord),
      })
        .then(() => {
          console.log('Word removed successfully from the wordlist!');
        })
        .catch((error) => {
          console.error('Error removing word from the wordlist: ', error);
        });
      dispatch({ type: 'DELETE_FROM_WORDLIST', payload: filteredCurrentList });
    }

    if (shuffledList.length > 0) {
      var filteredShuffledList = shuffledList.filter(
        (word) => word !== deletedWord
      );
      dispatch({ type: 'SET_SHUFFLE_LIST', payload: filteredShuffledList });
    }

    if (cachedList.list) {
      var filteredCachedList = cachedList.list.filter(
        (word) => word !== deletedWord
      );
      dispatch({
        type: 'SET_CACHED_LIST',
        payload: { name: cachedList.name, list: filteredCachedList },
      });
    }

    const newIndex = isShuffleMode
      ? filteredShuffledList.indexOf(currentWord)
      : filteredCurrentList.indexOf(currentWord);

    dispatch({
      type: 'SET_CURRENT_INDEX',
      payload: newIndex === -1 ? 0 : newIndex,
    });

    isShuffleMode
      ? dispatch({
          type: 'SET_CURRENT_LIST',
          payload: { name: cachedList.name, list: filteredShuffledList },
        })
      : dispatch({
          type: 'SET_CURRENT_LIST',
          payload: { name: currentWordList.name, list: filteredCurrentList },
        });
  };
};

export const fetchLists = () => async (dispatch, getState) => {
  const { userId } = getState().auth;

  if (!userId) {
    return;
  }
  dispatch({ type: 'SET_LOADING', payload: true });

  const userDoc = doc(db, 'users', userId);
  const docSnap = await getDoc(userDoc);
  if (docSnap.exists()) {
    dispatch({
      type: 'FETCH_LISTS',
      payload: docSnap.data().wordlist,
    });
    dispatch({ type: 'SET_LOADING', payload: false });
  } else {
    dispatch({ type: 'SET_LOADING', payload: false });
    return;
  }
};

export const setNextWordIndex = () => {
  return (dispatch, getState) => {
    const wordList = getState().session.currentWordList.list;
    let wordIndex;
    if (wordList.length === 0) {
      wordIndex = 0;
    } else {
      wordIndex = (getState().session.currentWordIndex + 1) % wordList.length;
    }

    dispatch({ type: 'SET_CURRENT_INDEX', payload: wordIndex });
  };
};
export const setWordIndex = (wordIndex) => {
  return {
    type: 'SET_CURRENT_INDEX',
    payload: wordIndex,
  };
};
export const setCurrentList = (list) => {
  return {
    type: 'SET_CURRENT_LIST',
    payload: list,
  };
};

export const setSpellInput = (inputText) => {
  return {
    type: 'SET_USER_INPUT',
    payload: inputText,
  };
};

export const setCurrentRep = (num) => {
  return {
    type: 'SET_CURR_REP',
    payload: num,
  };
};

export const setAddError = (errorText) => {
  return {
    type: 'ADD_ERROR',
    payload: errorText,
  };
};
export const setIsAddErrorVis = (errorText) => {
  localStorage.setItem('wasInitialNoticeShown', true);
  return {
    type: 'IS_ADD_ERROR',
    payload: errorText,
  };
};

export const setCachedList = (list) => {
  return (dispatch, getState) => {
    const isShuffleMode = getState().userAppSettings.isShuffleMode;
    dispatch({
      type: 'SET_CACHED_LIST',
      payload: isShuffleMode ? list : [],
    });
  };
};
