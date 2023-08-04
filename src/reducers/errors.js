const wasInitialNoticeShown = JSON.parse(
  localStorage.getItem('wasInitialNoticeShown')
);

const INTIAL_STATE = {
  addError: wasInitialNoticeShown
    ? null
    : '\u24D8 You can add more then one word at a time by separating words with commas or spaces.',
  isAddErrorVis: !wasInitialNoticeShown,
};

const errors = (state = INTIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'ADD_ERROR':
      return {
        ...state,
        addError: payload,
        isAddErrorVis: payload !== '' && true,
      };
    case 'IS_ADD_ERROR':
      return { ...state, isAddErrorVis: payload };
    default:
      return state;
  }
};
export default errors;
