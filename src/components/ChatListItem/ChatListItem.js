import React from "react";
import "./ChatListItem.css";

export default function ChatListItem({ onClickProp, isActive, data }) {
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    if (data.lastMessageData > 0) {
      let d = new Date(data.lastMessageData.seconds * 1000);
      let hours = d.getHours();
      let minutes = d.getMinutes();
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      setTime(`${hours}:${minutes}`);
    }
  }, [data]);

  return (
    <div
      className={`chatListItem ${isActive ? "active" : ""}`}
      onClick={onClickProp}
    >
      <img className="chatListItem--avatar" src={data.image} alt="" />
      <div className="chatListItem--lines">
        <div className="chatListItem--line">
          <div className="chatListItem--name">{data.title}</div>
          <div className="chatListItem--date">{time}</div>
        </div>
        <div className="chatListItem--line">
          <div className="chatListItem--lastMsg">
            <p>{data.lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
