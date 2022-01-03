import React from "react";
import "./NewChat.css";
import Api from "./../../Api";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function NewChat({ user, chatlist, show, setShow }) {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    async function getList() {
      if (user !== null) {
        let results = await Api.getContactList(user.id);
        setList(results);
      }
    }

    getList();
  }, [user]);

  function handleClose() {
    setShow(false);
  }

  async function addNewChat(user2) {
    await Api.addNewChat(user, user2);

    handleClose();
  }

  return (
    <div className="newChat" style={{ left: show ? 0 : -415 }}>
      <div className="newChat--head">
        <div onClick={handleClose} className="newChat--backbutton">
          <ArrowBackIcon style={{ color: "#fff" }} />
        </div>
        <div className="newChat--headtile">Nova Conversa</div>
      </div>
      <div className="newChat--list">
        {list.map((item, key) => (
          <div
            onClick={() => addNewChat(item)}
            className="newChat--item"
            key={key}
          >
            <img className="newChat--itemavatar" src={item.avatar} alt="" />
            <div className="newChat--itemname">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
