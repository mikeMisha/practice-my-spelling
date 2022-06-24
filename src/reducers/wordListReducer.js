const INTIAL_STATE = [
  {
    name: 'defaultList',
    list: [],
  },
];

const wordListReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_WORDLIST':
      return [...action.payload.lists];
    case 'DELETE_FROM_WORDLIST':
      return [...action.payload];
    case 'FETCH_LISTS':
      return [...action.payload];
    default:
      return state;
  }
};

export default wordListReducer;
