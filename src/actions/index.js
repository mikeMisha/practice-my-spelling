import axios from "axios";

export const signIn = (userId) => {
	return { type: "SIGN_IN", payload: userId };
};

export const signOut = () => {
	return {
		type: "SIGN_OUT",
	};
};

export const setReps = (num) => {
	return {
		type: "SET_REPS",
		payload: num,
	};
};

export const setLoading = () => {
	return {
		type: "SET_LOADING",
	};
};

export const updateWordList = (wordList) => {
	return {
		type: "UPDATE_WORDLIST",
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
			dispatch({ type: "SET_CURRENT_LIST", payload: cachedList });
			dispatch({ type: "SET_SHUFFLE_LIST", payload: [] });
			dispatch({ type: "SET_CACHED_LIST", payload: [] });
			dispatch({ type: "TOGGLE_SHUFFLE", payload: false });
		}
		const addedList = {
			name: name,
			list: !validList ? filteredList : validList,
		};
		if (isSignedIn) {
			let lists = [...getState().lists];

			if (lists.every((list) => list.name !== addedList.name)) {
				lists.push(addedList);
			} else {
				lists = lists.map((savedList) => {
					return savedList.name === addedList.name
						? { name: addedList.name, list: [...savedList.list, ...addedList.list] }
						: savedList;
				});
			}

			const response = await axios.put(
				`https://practice-my-spelling.herokuapp.com/users/${userId}`,
				{ lists }
			);
			console.log(response);
			dispatch({
				type: "CREATE_WORDLIST",
				payload: {
					lists: response.data.lists,
					createdList: lists.find((list) => list.name === addedList.name),
				},
			});
		} else {
			dispatch({
				type: "CREATE_WORDLIST",
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
			dispatch({ type: "SET_CACHED_LIST", payload: { name, list } });
			dispatch({ type: "SET_SHUFFLE_LIST", payload: shuffle });
			dispatch({ type: "SET_CURRENT_LIST", payload: { name, list: shuffle } });
			dispatch({ type: "TOGGLE_SHUFFLE", payload: true });
		} else {
			dispatch({ type: "SET_CURRENT_LIST", payload: cachedList });
			dispatch({ type: "SET_SHUFFLE_LIST", payload: [] });
			dispatch({ type: "SET_CACHED_LIST", payload: [] });
			dispatch({ type: "TOGGLE_SHUFFLE", payload: false });
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
			const updatedLists = savedLists.map((savedList) => {
				return savedList.name === currentWordList.name
					? { name: currentWordList.name, list: [...filteredCurrentList] }
					: savedList;
			});
			const response = await axios.patch(
				`https://practice-my-spelling.herokuapp.com/users/${userId}`,
				{ lists: updatedLists }
			);
			dispatch({ type: "DELETE_FROM_WORDLIST", payload: response.data.lists });
		}

		if (shuffledList.length > 0) {
			var filteredShuffledList = shuffledList.filter(
				(word) => word !== deletedWord
			);
			dispatch({ type: "SET_SHUFFLE_LIST", payload: filteredShuffledList });
		}

		if (cachedList.list) {
			var filteredCachedList = cachedList.list.filter(
				(word) => word !== deletedWord
			);
			dispatch({
				type: "SET_CACHED_LIST",
				payload: { name: cachedList.name, list: filteredCachedList },
			});
		}

		const newIndex = isShuffleMode
			? filteredShuffledList.indexOf(currentWord)
			: filteredCurrentList.indexOf(currentWord);

		dispatch({
			type: "SET_CURRENT_INDEX",
			payload: newIndex === -1 ? 0 : newIndex,
		});

		isShuffleMode
			? dispatch({
					type: "SET_CURRENT_LIST",
					payload: { name: cachedList.name, list: filteredShuffledList },
			  })
			: dispatch({
					type: "SET_CURRENT_LIST",
					payload: { name: currentWordList.name, list: filteredCurrentList },
			  });
	};
};

export const fetchLists = () => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const response = await axios.get(
		`https://practice-my-spelling.herokuapp.com/users?userId=${userId}`
	);
	if (userId === null) {
		return;
	}
	dispatch({ type: "FETCH_LISTS", payload: response.data[0].lists });
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

		dispatch({ type: "SET_CURRENT_INDEX", payload: wordIndex });
	};
};
export const setWordIndex = (wordIndex) => {
	return {
		type: "SET_CURRENT_INDEX",
		payload: wordIndex,
	};
};
export const setCurrentList = (list) => {
	return {
		type: "SET_CURRENT_LIST",
		payload: list,
	};
};

export const setSpellInput = (inputText) => {
	return {
		type: "SET_USER_INPUT",
		payload: inputText,
	};
};

export const setCurrentRep = (num) => {
	return {
		type: "SET_CURR_REP",
		payload: num,
	};
};

export const setAddError = (errorText) => {
	return {
		type: "ADD_ERROR",
		payload: errorText,
	};
};
export const setIsAddErrorVis = (errorText) => {
	return {
		type: "IS_ADD_ERROR",
		payload: errorText,
	};
};

export const setCachedList = (list) => {
	return (dispatch, getState) => {
		const isShuffleMode = getState().userAppSettings.isShuffleMode;
		dispatch({
			type: "SET_CACHED_LIST",
			payload: isShuffleMode ? list : [],
		});
	};
};
/*

export const createWordList = (wordList) => async (dispatch,getState) => {
    const response = await axios.post('https://practice-my-spelling.herokuapp.com/users/',{wordList})
    dispatch({type:'CREATE_WORDLIST',payload:response.data})
}

export const updateWordList = (wordList) => async (dispatch,getState) => {
    const response = await axios.patch('https://practice-my-spelling.herokuapp.com/users/1',{wordList})
    dispatch({type:'UPDATE_WORDLIST',payload:response.data})
}

export const fetchWordList = (id) => async (dispatch,getState) => {
    const response = await axios.get('https://practice-my-spelling.herokuapp.com/users/1')
    dispatch({type:'FETCH_WORDLIST',payload:response.data})
}
*/
