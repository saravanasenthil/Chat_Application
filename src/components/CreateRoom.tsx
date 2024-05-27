import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const CreateRoom: React.FC = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const CreateRoom = () => {
    const newRoomId = Date.now().toString();
    navigate(`/chatroom/${newRoomId}`);
  };

  const JoinRoom = () => {
    navigate(`/chatroom/${roomId}`);
  };

  return (
    <div className="createRoomContainer">
        <div className="createRoomBox">
      <h2>ENTER ROOM NAME</h2>
      
      <input
        type="text"
        placeholder="Enter Room Name"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={JoinRoom}>Join Room</button>
      <button onClick={CreateRoom}>Create Room</button>
      </div>
    </div>
  );
};

export default CreateRoom;
