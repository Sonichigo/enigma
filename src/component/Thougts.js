import React from "react";
import { useState } from "react";
import questData from "../data/thought";
import '../styles/Thoughts.css';

const Thougt = () => {
  const [thougts, setThougt] = useState(questData);

  return (
    <div className="main">
      <div className="header1">
        <h1><b>Thought</b></h1>
      </div>
      <ul>
        {thougts.day1.map((quest, key) => (
          <li className="checked">
            <label>
              <span className="item-name">{quest}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Thougt;