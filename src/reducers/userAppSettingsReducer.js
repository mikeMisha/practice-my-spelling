const INTIAL_STATE = {
	reps: "5",
	isShuffleMode: false,
};

const userAppSettingsReducer = (state = INTIAL_STATE, action) => {
	switch (action.type) {
		case "SET_REPS":
			return { ...state, reps: action.payload };
		case "TOGGLE_SHUFFLE":
			return { ...state, isShuffleMode: action.payload };
		default:
			return state;
	}
};

export default userAppSettingsReducer;
