import React from "react";
import "../css/info.css"
import styles from "../css/app.module.css";

const Information = ({ setOpenInfo, darkMode }) => {
  return (
    <div
    //This makes it so that clicking outside of the info box closes it
    onClick={setOpenInfo.bind(this, false)}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      {/* Main Con */}
      <div
      //This makes it so that clicking the info box doesn't close it
      onClick={(e) => e.stopPropagation()} 
      className={darkMode ? styles.darkModal : ""}
        style={{
          background: "white",
          borderRadius: "10px",
          width: "50%",
          padding: "20px 10px",
          position: "relative",
          animation: "0.5s cubic-bezier(0.4, 0, 0.2, 1) 0s 1 normal none running botUp",
        }}
      >
        {/* Header Con */}
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h1>What is Soundex?</h1>
          <div
            onClick={setOpenInfo.bind(this, false)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",

            }}
          >
            <span className="material-symbols-outlined">cancel</span>
          </div>
        </div>
        {/* Info Con */}
        <div
          style={{
            padding: "0 20px 10px",
            fontSize: "1.2rem",
          }}
        >
          The Soundex is a coded surname index (using the first letter of the
          last name and three digits) based on the way a name sounds rather than
          the way it's spelled. Surnames that sound the same but are spelled
          differently - such as Smith and Smyth - have the same code and are
          filed together. This system was developed to make it easier to find a
          particular name even though it may have been spelled (or misspelled,
          as was more often the case) a variety of ways.
            <br /><br />
          This website uses the american soundex algorithm. More information 
          can be found <a
          style={{textDecoration: "none", color: "blue"}}
          href="https://en.wikipedia.org/wiki/Soundex">here</a>.
        </div>
      </div>
    </div>
  );
};

export default Information;
