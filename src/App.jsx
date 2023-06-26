import React, { useEffect } from "react";
import styles from "./css/app.module.css";
import Infomation from "./components/information.jsx";

import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");

  const [soundex, setSoundex] = useState("");
  const [soundex2, setSoundex2] = useState("");

  const [similar, setSimilar] = useState("");

  const [history, setHistory] = useState(() => {
    const localData = localStorage.getItem("history");
    return localData ? JSON.parse(localData) : [];
  });

  const [openInfo, setOpenInfo] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  /* Dark Mode Functions */
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  /* End of Dark Mode Functions */

  /* Soundex Logic */
  function soundexConvert(name) {
    name = name.toUpperCase().trim();
    name = name.replace(/[A,E,I,O,U,Y]/g, "0");
    name = name.replace(/[B,F,P,V]/g, "1");
    name = name.replace(/[C,G,J,K,Q,S,X,Z]/g, "2");
    name = name.replace(/[D,T]/g, "3");
    name = name.replace(/[L]/g, "4");
    name = name.replace(/[M,N]/g, "5");
    name = name.replace(/[R]/g, "6");
    name = name.replace(/[H,W]/g, "9");
    name = name.replace(/[',-, ]]/g, "");

    return name;
  }

  function nineAndRightRemoval(name) {
    let output = soundexConvert(name);

    for (let i = 0, j = 1, k = 2; i < output.length; i++, j++, k++) {
      if (output[i] == output[k] && output[j] == "9") {
        output = output.replace(output[j], "").replace(output[j], "");
        i = 0;
        j = 1;
        k = 2;
      }
    }

    return output;
  }

  function removeSameAdjDigits(name) {
    let output = nineAndRightRemoval(name);

    for (let i = 0, j = 1; i < output.length; i++, j++) {
      if (output[i] == output[j]) {
        output = output.replace(output[i], "");
        i -= 1;
        j -= 1;
      }
    }

    return output;
  }

  function firstLetterPlaced(name) {
    let output = removeSameAdjDigits(name);

    output = output.replace(output[0], name[0].toUpperCase());

    return output;
  }

  function removeNineAndZero(name) {
    let output = firstLetterPlaced(name);

    for (let i = 0; i < output.length; i++) {
      if (output[i] == "9" || output[i] == "0") {
        output = output.replace(output[i], "");
        i -= 1;
      }
    }

    return output;
  }

  function soundexComplete(name) {
    let output = removeNineAndZero(name);

    while (output.length < 4) {
      output = output + "0";
    }
    if (output.length > 4) {
      output = output.substring(0, 4);
    }

    return output;
  }

  /* End of Soundex Logic */

  function handleSubmit(e) {
    e.preventDefault();

    const soundexValue = soundexComplete(name);
    const soundexValue2 = soundexComplete(name2);

    setSoundex(soundexValue);
    setSoundex2(soundexValue2);

    if (soundexValue === soundexValue2) {
      setSimilar("Yes");
    } else {
      setSimilar("No");
    }

    setHistory((currentHistory) => {
      const newSimilar = soundexValue === soundexValue2 ? "Yes" : "No";
      return [
        ...currentHistory,
        {
          id: crypto.randomUUID(),
          title: name,
          title2: name2,
          soundex: soundexValue,
          soundex2: soundexValue2,
          similar: newSimilar,
          completed: false,
        },
      ];
    });
  }

  function deleteHistory() {
    localStorage.removeItem("history");
    setHistory([]);
  }

  const HistoryModal = ({ setOpenHistory }) => {
    return (
      <div
        onClick={setOpenHistory.bind(this, false)}
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
          onClick={(e) => e.stopPropagation()}
          className={darkMode ? styles.darkModal : ""}
          style={{
            background: "white",
            borderRadius: "10px",
            width: "50%",
            height: "auto",
            padding: "20px 10px",
            position: "relative",
            animation:
              "0.5s cubic-bezier(0.4, 0, 0.2, 1) 0s 1 normal none running botUp",
          }}
        >
          {/* Header Con */}
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h1>
              History{" "}
              <button
                onClick={deleteHistory}
                style={{
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                }}
                className={`material-symbols-outlined ${
                  darkMode ? styles.darkButton : ""
                }`}
              >
                delete
              </button>
            </h1>
            <div
              onClick={setOpenHistory.bind(this, false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
            >
              <span
                className={`material-symbols-outlined ${
                  darkMode ? styles.darkButton : ""
                }`}
              >
                cancel
              </span>
            </div>
          </div>

          {/* History Con */}
          <div
            style={{
              padding: "0 20px 10px",
              fontSize: "1.2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <p>Name</p>
              <p>Soundex</p>
              <p>Similar</p>
            </div>

            {history.map((item) => (
              <div key={item.id} className={styles.setCon}>
                <div className={styles.nameCon}>
                  <div>{item.title}</div>
                  <div>{item.title2}</div>
                </div>

                <div className={styles.soundexCon}>
                  <div>{item.soundex}</div>
                  <div>{item.soundex2}</div>
                </div>

                <div className={styles.simCon}>
                  <div>{item.similar}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {openHistory && (
        <HistoryModal setOpenHistory={setOpenHistory} darkMode={darkMode} />
      )}
      {openInfo && <Infomation setOpenInfo={setOpenInfo} darkMode={darkMode} />}

      <div className={styles.mainCon}>
        <div className={styles.title}>Soundex Encoding</div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputs}>
            <input
              type="text"
              id="name"
              placeholder=" Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div>Soundex: {soundex}</div>
          </div>

          <div className={styles.inputs2}>
            <input
              type="text"
              id="name2"
              placeholder=" Name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
            />
            <div>Soundex: {soundex2}</div>
          </div>

          <input className={styles.submit} type="submit" value="Encode" />
        </form>

        <div className={styles.similar}>Similar?: {similar}</div>

        <div className={styles.buttonGroup}>
          <button
            className={`material-symbols-outlined ${
              darkMode ? styles.darkButton : ""
            }`}
            onClick={toggleDarkMode}
          >
            brightness_4
          </button>
          <button
            className={`material-symbols-outlined ${
              darkMode ? styles.darkButton : ""
            }`}
            onClick={setOpenInfo.bind(this, true)}
          >
            help
          </button>
          <button
            className={`material-symbols-outlined ${
              darkMode ? styles.darkButton : ""
            }`}
            onClick={() => setOpenHistory(true)}
          >
            history
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
