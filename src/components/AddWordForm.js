import React from 'react';

const AddWordForm = (props) => {
  return (
    <form
      onSubmit={props.onFormSubmit}
      className="input-group justify-content-center w-75 "
    >
      <input
        value={props.inputValue}
        type="text"
        onChange={props.onInputChange}
        spellCheck="true"
        className="form-control col-xs-2 rounded"
        placeholder="add word(s) here"
      />
      <button type="submit" className="btn btn-outline-primary">
        ADD
      </button>
    </form>
  );
};

export default AddWordForm;
