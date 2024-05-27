import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import {addDoc,collection,onSnapshot,query,orderBy,serverTimestamp,updateDoc,doc,setDoc,deleteDoc,} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";


interface Message {
  id: string;
  text: string;
  user: string;
  userImage: string;
  createdAt: any;
  seenBy: string[];
}

const ChatRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState<number>(0);


  useEffect(() => {
    
    if (user && id) {
      const userRef = doc(db, "rooms", id, "users", user.uid);
      setDoc(userRef, {
        name: user.displayName,
        photoURL: user.photoURL,
      });

      const q = query(
        collection(db, "rooms", id || "", "messages"),
        orderBy("createdAt")
      );

      const Messages = onSnapshot(q, (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];
        setMessages(messagesData);

        messagesData.forEach((message) => {
          if (!message.seenBy.includes(user.uid)) {
            updateDoc(doc(db, "rooms", id, "messages", message.id), {
              seenBy: [...message.seenBy, user.uid],
            });
          }
        });
      });

      const Users = onSnapshot(
        collection(db, "rooms", id, "users"),
        (snapshot) => {
          setUsers(snapshot.docs.length);
        }
      );

      return () => {
        Messages();
        Users();
        deleteDoc(userRef);
      };
    }
  }, [id, user]);

  const SendMessage = async () => {
    if (newMessage.trim() !== "") {
      await addDoc(collection(db, "rooms", id || "", "messages"), {
        text: newMessage,
        user: user?.displayName,
        userImage: user?.photoURL,
        createdAt: serverTimestamp(),
        seenBy: [user?.uid],
      });
      setNewMessage("");
    }
  };

  const Logout = () => {
    auth.signOut();
  };

  

  return (
    <div className="chatRoom">
      <header>
        <h2>LET'S CHAT  : ROOM NAME ({id})</h2>
        <button onClick={Logout}>Logout</button>
        <div>ACTIVE MEMBERS : {users}</div>
        
      </header>
      <div className="messageContainer">
        
        {messages.map((message) => (
          <div key={message.id} className={user?.displayName === message.user ? "userMessage" : "otherMessage"}>
            <img src={message.userImage} alt={message.user} />
            <div>
              <p>{message.text}</p>
              <small>
                {new Date(message.createdAt?.seconds * 1000).toLocaleTimeString()}
              </small>
              <small>{message.seenBy.length > 1 ? 'Seen' : 'Unseen'}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="messageInput">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={SendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
