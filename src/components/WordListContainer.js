import React, { useEffect }  from "react";
import WordList from "./WordList";
import { connect } from "react-redux";
import { deleteFromWordList, setWordIndex, setSpellInput } from "../actions";
import { motion, AnimatePresence } from 'framer-motion';
 

const WordListContainer = (props) => {

    const {deleteFromWordList, setWordIndex, setSpellInput, lists} = props;
    useEffect(()=>{
        if (props.isSignedIn){
            props.setCurrentList({name:'defaultlist', list:lists.filter((i)=>i.name==='defaultList')[0].list })    
        }
    },[props.isSignedIn])
    
 
      
    const onWordDelete = (word) =>{
        deleteFromWordList(word)  
    }

    const onWordClick = (index) => {
       setWordIndex(index)
       setSpellInput('')
    }
    
    return (
        <AnimatePresence>
        <motion.div id="word-list-container" className="col sidebar d-flex flex-column bg-gray wrap-item rounded-3">
             <h2 className="text-light text-center pt-3">Word List</h2>     
            <WordList onWordClick={onWordClick} onDelete={onWordDelete}/>
        </motion.div>
        </AnimatePresence>
    )
}

const mapStateToProps = (state) =>{
    return {       
        lists: state.lists,  
    }
};

export default connect(mapStateToProps,{deleteFromWordList, setWordIndex, setSpellInput })(WordListContainer);