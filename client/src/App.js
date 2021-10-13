import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    axios
      .get("/api/item")
      .then(({ data }) => setItems(data))
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const addItem = () => {
    axios
      .post("/api/item", {
        text: inputText,
      })
      .then(({ data }) => {
        setItems([...items, data.newItem]);
        setInputText("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeItem = (id) => {
    axios
      .delete(`/api/item/${id}`)
      .then((data) => {
        let newList = [...items];
        setItems(newList.filter((e) => e._id !== id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="input__wrapper">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <span onClick={addItem}>+</span>
      </div>
      <ul>
        {items.map((data) => (
          <li key={data._id}>
            {data.text}
            <span onClick={(e) => removeItem(data._id)}> -</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
