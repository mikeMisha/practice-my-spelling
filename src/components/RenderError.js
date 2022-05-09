import React from "react";
import { motion } from "framer-motion";

const RenderError = ({ error, onClick }) => {
	return (
		<motion.div
			className="alert alert-warning alert-dismissible mb-0"
			role="alert"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.2 }}
			exit={{ opacity: 0 }}
		>
			<small className="text-center">{error}</small>
			<button
				type="button"
				className="btn-close"
				onClick={onClick}
				aria-label="Close"
			></button>
		</motion.div>
	);
};

export default RenderError;
