import React from "react";

export default function Book(props) {
  return (
    <div id="wrapper">
      <div>
        <h3>{props.book.title}</h3>
        <p>{props.book.author[0]}</p>
        {props.book.pages ? <p>{props.book.pages} pages</p> : ""}
      </div>
      {props.book.cover ? <img src={props.book.cover} /> : ""}

      <style jsx>{`
        #wrapper {
          border: solid black 1px;
          padding: 4px;
          margin: 2px;
          display: flex;
          justify-content: space-around;
        }
        img {
          height: 140px;
        }
      `}</style>
    </div>
  );
}
