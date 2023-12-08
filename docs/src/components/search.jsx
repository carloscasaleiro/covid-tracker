import React, { useState, useEffect } from "react";

function Search({ onSubmit, selected, unique }) {
  const [text, setText] = useState("");

  function submit(event) {
    event.preventDefault();
    onSubmit(text);
  }

  function clearText() {
    setText("");
    onSubmit("");
  }

  useEffect(() => {
    if (unique !== "Global") {
      setText(unique);
    }
  }, [unique]);

  function handleChange(event) {
    const searchText = event.target.value;
    setText(searchText);
    onSubmit(searchText);
  }

  return (
    <form onSubmit={submit} className="form-inline">
      <input
        value={text}
        type="text"
        className={`form-control ${selected ? "border-danger" : "border-info"}`}
        placeholder="Search..."
        onChange={handleChange}
      />
      {text && (
        <div className="clear">
          <button
            type="button"
            className={`btn  ml-2 ${selected ? "btn-danger" : "btn-info"}`}
            onClick={clearText}
          >
            Clear Search
          </button>
        </div>
      )}
    </form>
  );
}

export default Search;
