import React, { useEffect } from 'react';
import Logo from './Logo';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { signIn, signOut } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = ({ signIn, signOut }) => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      signIn(user.sub);
    } else {
      signOut();
    }
  }, [isAuthenticated]);

  return (
    <div className=" mynavbar d-flex navbar navbar-expand-md bg-gray rounded-3 px-4 ">
      <Link to="/" className="navbar-brand">
        <Logo height={'30px'} />
      </Link>
      <div className="d-flex align-items-center">
        <Link
          to="/practice"
          className="btn rounded-pill btn-sm btn-primary text-nowrap me-4"
        >
          Go Practice
        </Link>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  );
};

export default connect(null, { signIn, signOut })(Navbar);
