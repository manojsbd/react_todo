import React, { useState } from "react";

const Todo = () => {
  const [activity, setActivity] = useState("");
  const [listData, setlistData] = useState([]);
  const [editid, seteditid] = useState();
  const [edittedText, setEdittedText] = useState("");

  const addListItem = (e) => {
    e.preventDefault();

    setlistData((listData) => {
      const updatedList = [
        ...listData,
        {
          id: Math.floor(Math.random() * 1000),
          text: activity,
        },
      ];
      setActivity("");
      return updatedList;
    });
  };

  const deleteItem = (id) => {
    const updatedListData = listData.filter((elem) => {
      return id !== elem.id;
    });

    setlistData(updatedListData);
  };

  const deleteAllItem = () => {
    setlistData([]);
  };

  const editItem = (id) => {
    seteditid(id);
  };

  const saveHandler = (id) => {
    const newdata = listData.map((items) => {
      return items.id === id ? { ...items, text: edittedText } : items;
    });
    setlistData(newdata);
    seteditid();
    setEdittedText("");
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <form onSubmit={addListItem}>
        <input
          type="text"
          placeholder="Enter your Todo"
          onChange={(e) => setActivity(e.target.value)}
          value={activity}
          className="effect-1"
        />
      </form>
      <h3>List of Activity</h3>
      {listData.map((data) => {
        return editid === data.id ? (
          <div>
            <input
              type="text"
              onChange={(e) => setEdittedText(e.target.value)}
              value={edittedText}
            />
            <button onClick={() => saveHandler(data.id)}>Save</button>
          </div>
        ) : (
          <div>
            <div className="list-data"> {data.text} </div>
            <button onClick={() => editItem(data.id)}>Edit</button>
            <button onClick={() => deleteItem(data.id)} className="delete-btn">
              Delete
            </button>
          </div>
        );
      })}
      {listData.length >= 2 && (
        <button onClick={deleteAllItem}>Delete All</button>
      )}
    </div>
  );
};

export default Todo;
