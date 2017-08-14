import React from "react";
import ReactDOM from "react-dom";
import "./css/multiSelector.css";
import MultiSelect from './lib';

ReactDOM.render(<MultiSelect dataSource={[{id: 1, name: "test1"}, {
    id: 2,
    name: "test2",
    children: [
      {
        id: 2.1,
        name: "test2.1",
      },
      {
        id: 2.2,
        name: "test2.2",
      },
      {
        id: 2.3,
        name: "test2.3",
      },
      {
        id: 2.4,
        name: "test2.4",
      }
    ]
  }]} initValue={[1,2.4]}/>
  , document.getElementById('root'));