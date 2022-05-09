import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import RenderError from "../components/RenderError";
import Logo from "../components/Logo";
import SpellingContainer from "../components/SpellingContainer";
import WordListContainer from "../components/WordListContainer";
import SettingsContainer from "../components/SettingsContainer";
import AddWordContainer from "../components/AddWordContainer";
import { useAuth0 } from "@auth0/auth0-react";
import {
	fetchLists,
	setAddError,
	setLoading,
	setIsAddErrorVis,
} from "../actions";
import axios from "axios";

const PracticePage = (props) => {
	const {
		isDataLoading,
		fetchLists,
		addError,
		setAddError,
		isAddErrorVis,
		setIsAddErrorVis,
	} = props;
	const { isLoading, isAuthenticated, user } = useAuth0();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/practice");
			axios
				.head(`https://practice-my-spelling.herokuapp.com/users/${user.sub}`)
				.then((response) => {
					if (response.status === 200) {
						fetchLists();
					}
				})
				.catch((error) => {
					const status = error.response.status;
					if (status === 404) {
						axios.post(`https://practice-my-spelling.herokuapp.com/users/`, {
							id: user.sub,
							lists: [
								{
									name: "defaultList",
									list: [],
								},
							],
						});
					}
				});
		}
	}, [isAuthenticated]);

	if (isLoading || isDataLoading) {
		return <div>Loading....</div>;
	}

	return (
		<React.Fragment>
			<Navbar />
			<div className="container-fluid py-4 mb-2">
				<div className="row h-100 mx-0 mb-3 g-4">
					<div
						id="primary-container"
						style={{ flex: "1 0 75%" }}
						className="ps-lg-0 wrap-item text-light"
					>
						<div className="px-3 py-4 h-100 main-container-p bg-gray rounded-3">
							<div className="pb-5">
								<Logo width="400px" addClass="img-fluid mx-auto d-block" />
								<h5 className="text-light text-center lead mt-3">
									Practice spelling words over & over!
								</h5>
							</div>
							<SettingsContainer />
							<AddWordContainer exitBeforeEnter={true} />
							<motion.div
								initial={{ height: 0 }}
								animate={{ height: isAddErrorVis ? "80px" : 0 }}
								transition={{ delay: !isAddErrorVis && 0.2, duration: 0.2 }}
								className=" d-flex justify-content-center align-items-center"
							>
								<AnimatePresence
									exitBeforeEnter={true}
									onExitComplete={() => setAddError("")}
								>
									{isAddErrorVis && (
										<RenderError
											error={addError}
											onClick={() => setIsAddErrorVis(false)}
										/>
									)}
								</AnimatePresence>
							</motion.div>
							<SpellingContainer />
						</div>
					</div>
					<WordListContainer />
				</div>
			</div>
		</React.Fragment>
	);
};
const mapStateToProps = (state) => {
	return {
		isDataLoading: state.session.isLoading,
		isListPop: state.session.currentWordList.list.length !== 0,
		addError: state.errors.addError,
		isAddErrorVis: state.errors.isAddErrorVis,
	};
};

export default connect(mapStateToProps, {
	setLoading,
	setIsAddErrorVis,
	setAddError,
	fetchLists,
})(PracticePage);

/*
     <SpellReps />
     <SpellToggle />
    <UserAdd />
 */
