import React from "react";
import "./App.css";
import ChatListItem from "./components/ChatListItem/ChatListItem";

import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Search from "@material-ui/icons/Search";
import ChatIntro from "./components/ChatIntro/ChatIntro";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import NewChat from "./components/NewChat/NewChat";
import Login from "./components/Login/Login";
import Api from "./Api";

export default function App() {
  const [chatList, setChatList] = React.useState([]);
  const [activeChat, setActiveChat] = React.useState({});

  //informações do usuário
  const [user, setUser] = React.useState(null);
  const [showNewChat, setShowNewChat] = React.useState(false);

  async function handleLoginData(u) {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL,
    };

    //add banco
    await Api.addUser(newUser);

    setUser(newUser);
  }

  React.useEffect(() => {
    function verifyUser() {
      if (user !== null) {
        let unsub = Api.onChatList(user.id, setChatList);
        return unsub;
      }
    }

    verifyUser();
  }, [user]);

  if (user === null) {
    return <Login onReceive={handleLoginData} />;
  }

  return (
    <div className="app-window">
      <div className="sidebar">
        <NewChat
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
          chatList={chatList}
        />
        <header>
          <img className="header--avatar" src={user.avatar} alt="" />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{ color: "#919191" }} />
            </div>
            <div onClick={() => setShowNewChat(true)} className="header--btn">
              <ChatIcon style={{ color: "#919191" }} />
            </div>
            <div className="header--btn">
              <MoreVertIcon style={{ color: "#919191" }} />
            </div>
          </div>
        </header>
        <div className="search">
          <div className="search--input">
            <Search fontSize="small" style={{ color: "#919191" }} />
            <input
              type="search"
              placeholder="Procurar ou começar uma nova conversa"
            />
          </div>
        </div>
        <div className="chatlist">
          {chatList.map((item, key) => (
            <ChatListItem
              key={key}
              data={item}
              isActive={activeChat.chatId === chatList[key].chatId}
              onClickProp={() => setActiveChat(chatList[key])}
            />
          ))}
        </div>
      </div>
      <div className="contentarea">
        {activeChat.chatId === undefined ? (
          <ChatIntro />
        ) : (
          <ChatWindow user={user} data={activeChat} />
        )}
      </div>
    </div>
  );
}
