const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, isSignedIn: true, userId: action.payload };
    case 'SIGN_OUT':
      return { ...state, isSignedIn: false, userId: null };
    case 'SET_USER':
      return { ...state, isSignedIn: true, userId: action.payload };
    default:
      return state;
  }
};
