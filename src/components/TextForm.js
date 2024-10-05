import React, { useState } from "react";

export default function TextForm(Props) {
  let [text, setText] = useState("Enter Text here");
  //Function to handle changes in the text area
  const handleOnChange = (event) => {
    //console.log("on change");
    setText(event.target.value);
  };
  //Function to handle click events on the primary button
  const handleOnClick = () => {
    const newtext = text.toUpperCase();
    setText(newtext);
    //console.log("Button pressed");
  };

  return (
    <div>
      <div className="mb-3 container">
        <h1>{Props.heading}</h1>
        <textarea
          class="form-control mb-3"
          id="MyBox"
          value={text}
          onChange={handleOnChange}
          rows="8"
        ></textarea>
        <button className="btn btn-primary" onClick={handleOnClick}>
          Convert to uppercase
        </button>
      </div>
    </div>
  );
}
