import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import SpellingContainer from '../components/SpellingContainer';
import WordListContainer from '../components/WordListContainer';
import SettingsContainer from '../components/SettingsContainer';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchLists, setLoading } from '../actions';
import { setUser } from '../actions';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

const PracticePage = (props) => {
  const { isDataLoading, fetchLists, setUser, setLoading } = props;
  const { isLoading, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setUser(user.sub);
      fetchLists();
    } else if (!isLoading) {
      setLoading(false);
    }
  }, [isAuthenticated, isLoading]);

  if (isDataLoading || isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100 w-100">
        <div
          className="spinner-border text-light "
          style={{ width: '4rem', height: '4rem' }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else
    return (
      <div className="d-flex flex-column  h-100">
        <div className="container-fluid h-100 p-3">
          <div className="row g-3 h-100">
            <div className="col-lg-8 col-12 order-lg-1 order-1">
              <div className=" h-100">
                <div
                  style={{ minHeight: '650px' }}
                  className="px-3 py-4 h-100 main-container-p bg-gray rounded-3 w-100 position-relative d-flex flex-column justify-content-center"
                >
                  <div className="pb-5 ">
                    <div>
                      <Logo
                        width="400px"
                        addClass="img-fluid mx-auto d-block"
                      />
                      <h5 className="text-light text-center lead mt-3">
                        Practice spelling words over & over!
                      </h5>

                      {!isAuthenticated && !props.isListPop && (
                        <div className="pop-up text-light fs-5  mt-5">
                          <i className="bi bi-info-circle-fill pe-1 "></i> Add
                          words to the list on the right to start practicing!
                        </div>
                      )}
                    </div>
                    <div
                      className="position-absolute"
                      style={{ top: '20px', left: '20px' }}
                    >
                      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                    </div>
                  </div>

                  <SpellingContainer />
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-12 order-lg-2 order-2 h-100"
              style={{ minHeight: '650px' }}
            >
              <WordListContainer />
            </div>
          </div>
        </div>
      </div>
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

  fetchLists,
  setUser,
})(PracticePage);
