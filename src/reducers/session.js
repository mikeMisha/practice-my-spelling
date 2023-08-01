const INTIAL_STATE = {
  currentWordIndex: 0,
  currentWordList: { name: 'defaultList', list: [] },
  shuffledList: [],
  userTextInput: '',
  currentRep: null,
  isLoading: true,
  cachedList: {},
};

const session = (state = INTIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'SET_CURRENT_INDEX':
      return { ...state, currentWordIndex: payload };
    case 'SET_CURRENT_LIST':
      return { ...state, currentWordList: payload };
    case 'CREATE_WORDLIST':
      return { ...state, currentWordList: payload.createdList };
    case 'SET_USER_INPUT':
      return { ...state, userTextInput: payload };
    case 'SET_CURR_REP':
      return { ...state, currentRep: payload };
    case 'SET_LOADING':
      return { ...state, isLoading: payload };
    case 'FETCH_LISTS':
      // const defaultList = payload.find((list) => list.name === 'defaultList');
      return {
        ...state,
        currentWordList: { name: 'defaultList', list: payload },
      };
    case 'SET_SHUFFLE_LIST':
      return { ...state, shuffledList: payload };
    case 'SET_CACHED_LIST':
      return { ...state, cachedList: payload };
    default:
      return state;
  }
};

export default session;
