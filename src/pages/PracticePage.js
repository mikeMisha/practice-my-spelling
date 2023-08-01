import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RenderError from '../components/RenderError';
import Logo from '../components/Logo';
import SpellingContainer from '../components/SpellingContainer';
import WordListContainer from '../components/WordListContainer';
import SettingsContainer from '../components/SettingsContainer';
import AddWordContainer from '../components/AddWordContainer';
import { useAuth0 } from '@auth0/auth0-react';

import {
  fetchLists,
  setAddError,
  setLoading,
  setIsAddErrorVis,
} from '../actions';
import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { setUser } from '../actions';

const PracticePage = (props) => {
  const {
    isDataLoading,
    fetchLists,
    addError,
    setUser,
    setLoading,
    setAddError,
    isAddErrorVis,
    setIsAddErrorVis,
  } = props;
  const { isLoading, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {});
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
        <Navbar />
        <div className="container-fluid h-100 mb-3">
          <div className="row g-3 h-100">
            <div className="col-lg-8 col-12 order-lg-1 order-1">
              <div className=" h-100">
                <div className="px-3 py-4 h-100 main-container-p bg-gray rounded-3 w-100">
                  <div className="pb-5">
                    <Logo width="400px" addClass="img-fluid mx-auto d-block" />
                    <h5 className="text-light text-center lead mt-3">
                      Practice spelling words over & over!
                    </h5>
                    {!isAuthenticated && (
                      <div className="pop-up text-light">
                        <i className="bi bi-info-circle-fill pe-1 "></i> Sign in
                        now to save your wordlist!
                      </div>
                    )}
                  </div>

                  <SettingsContainer />
                  <AddWordContainer exitBeforeEnter={true} />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isAddErrorVis ? '80px' : 0 }}
                    transition={{ delay: !isAddErrorVis && 0.2, duration: 0.2 }}
                    className=" d-flex justify-content-center align-items-center"
                  >
                    <AnimatePresence
                      exitBeforeEnter={true}
                      onExitComplete={() => setAddError('')}
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
            </div>
            <div className="col-lg-4 col-12 order-lg-2 order-2 h-100">
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
  setIsAddErrorVis,
  setAddError,
  fetchLists,
  setUser,
})(PracticePage);

/*
     <SpellReps />
     <SpellToggle />
    <UserAdd />
 */
