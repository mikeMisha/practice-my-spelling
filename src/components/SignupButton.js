import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SignupButton = () => {
	const { loginWithRedirect } = useAuth0();
	return (
		<button
			className="btn rounded-pill btn-sm btn-secondary me-3"
			onClick={() =>
				loginWithRedirect({
					screen_hint: "signup",
				})
			}
		>
			Sign Up
		</button>
	);
};

export default SignupButton;
