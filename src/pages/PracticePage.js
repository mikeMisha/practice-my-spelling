import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Logo from '../components/Logo';
import SpellingContainer from '../components/SpellingContainer';
import WordListContainer from '../components/WordListContainer';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchLists, setLoading } from '../actions';
import { setUser } from '../actions';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import SettingsContainer from '../components/SettingsContainer';

const PracticePage = (props) => {
  const { isDataLoading, fetchLists, setUser, setLoading } = props;
  const { isLoading, isAuthenticated, user } = useAuth0();

  const [isMobileLayout, setIsMobileLayout] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileLayout(window.innerWidth < 992);
    };

    // Add event listener on mount
    window.addEventListener('resize', handleResize);

    // Remove event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
              <div className="h-100">
                <div
                  style={{ minHeight: '650px' }}
                  className="px-3 py-4 h-100 main-container-p bg-gray position-relative rounded-3 w-100  d-flex flex-column justify-content-center"
                >
                  <div className="position-sm-absolute mb-auto mb-sm-0 top-0 end-0 start-0 d-flex justify-content-between px-3 pt-3 flex-column flex-sm-row align-items-center gap-3">
                    <Logo width="150px" addClass="img-fluid " />
                    <SettingsContainer />
                    <div
                      style={{ width: '150px' }}
                      className="d-flex justify-content-end align-items-center position-absolute-only-sm top-0 end-0 pe-2 pt-2 pt-sm-0 pe-sm-0"
                    >
                      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                    </div>
                  </div>

                  {!isAuthenticated && !props.isListPop && (
                    <div className="d-flex justify-content-center pop-up-design">
                      <div className=" text-light fs-5  my-4 px-2 text-wrap">
                        <i className="bi bi-info-circle-fill pe-1 "></i> Add
                        words to the list on the{' '}
                        {isMobileLayout ? 'bottom' : 'right'} to start
                        practicing!
                      </div>
                    </div>
                  )}

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
