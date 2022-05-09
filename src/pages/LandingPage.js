import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LandingPage = () => {
	const animateGear = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			rotate: 180,
			transition: {
				delay: 0.4,
				duration: 0.8,
			},
		},
	};
	const animateConfused = {
		hidden: {
			opacity: 0,
			scale: 1.2,
		},
		visible: {
			opacity: 1,
			scale: 1.0,
			transition: {
				type: "spring",
				bounce: 0.5,
				delay: 0.4,
				duration: 0.8,
			},
		},
	};

	return (
		<React.Fragment>
			<div
				style={{
					paddingTop: "10px",
					background: `linear-gradient(90deg, rgba(14,38,222,1) 0%, rgba(0,144,255,0.6) 100%), url(./images/background.jpg) no-repeat center center / cover `,
				}}
			>
				<Navbar style={{ marginTop: "10px" }} />
				<div className=" p-4 py-5 dot container-fluid front-page-banner">
					<div className="row my-5 justify-content-center ">
						<div className="col-md-6 mt-lg-5">
							<motion.div
								className="text-light ps-lg-5 align-items-center mt-5 display-4"
								initial={{ x: "-100vw", opacity: 0 }}
								animate={{ x: "0", opacity: 1 }}
								transition={{ duration: 1.0 }}
							>
								Practice your spelling anytime anywhere.
							</motion.div>
							<motion.p
								className="banner-quote text-light"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 2 }}
							>
								<em>
									"I fear not the man who has practiced 10,000 kicks once, but I
									fear the man who has practiced one kick 10,000 times." -Bruce
									Lee
								</em>
							</motion.p>
						</div>
						<motion.div
							className="col-6 banner-img m-auto"
							initial={{ x: "100vw", opacity: 0 }}
							animate={{ x: "0", opacity: 1 }}
							transition={{ delay: 1, duration: 1 }}
						>
							<img
								alt=""
								className="devices img-fluid d-none d-lg-block"
								src="./images/mockup.png"
								width="600"
							/>
						</motion.div>
					</div>
				</div>
			</div>
			<div className="position-relative overflow-hidden p-3 p-md-5  text-center background">
				<div className="row">
					<div className="col-lg-5 mx-auto my-5">
						<div>
							<motion.img
								initial="hidden"
								variants={animateGear}
								whileInView="visible"
								alt=""
								style={{
									height: "150px",
									color: "white",
									margin: " 1rem 0 1rem 0",
								}}
								src="./images/gear.svg"
							/>
						</div>
						<div className="text-light display-6 font-weight-normal text-nowrap pb-3">
							<span className="underline">Practice makes Perfect</span>
						</div>
						<div className="text-light lead font-weight-normal fn-fam-pop px-3">
							Build up your spelling skills! Anytime you run into a spelling
							problem, just add it to the word list and practice away!
						</div>
					</div>
					<div className="col-lg-5 mx-auto my-5">
						<motion.img
							initial="hidden"
							variants={animateConfused}
							whileInView="visible"
							alt=""
							style={{
								height: "150px",
								color: "white",
								margin: "1rem 0 1rem 0",
							}}
							src="./images/confused.svg"
						/>
						<div className="text-light font-weight-normal pb-3 display-6 text-nowrap">
							<span className="underline">How does it work?</span>
						</div>
						<div className="text-light lead font-weight-normal fn-fam-pop px-3">
							Simply add the words you wish to the word box, choose how many
							times you want to spell each word, and practice away! The spelling
							word changes color as you type each letter, so you know where you
							went wrong!
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<Link to="/practice">
							<motion.button
								className="btn rounded-pill btn-primary btn-lg my-3"
								whileHover={{ scale: 1.1 }}
							>
								Start Practicing
							</motion.button>
						</Link>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default LandingPage;
