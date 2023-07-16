import "./App.css";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { ChangeEvent, useState } from "react";
import { Id } from "../convex/_generated/dataModel";

function App() {
  const messages = useQuery(api.messages.get);
  const addMessage = useMutation(api.messages.sendMessage);
  const deleteMessage = useMutation(api.messages.deleteMessage);

  const [message, setMessage] = useState("");
  const changeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const sendMessage = async () => {
    try {
      await addMessage({ messageText: message });
      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  const removeMessage = async (messageId: Id<"messages">) => {
    try {
      await deleteMessage({ messageId });
    } catch (e) {
      console.log(e);
    }
  };

  if (!messages) return <div>loading...</div>;

  return (
    <>
      <div>
        {messages?.map((m) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              message: <b>{m.messageText}</b>
            </div>
            <button onClick={() => removeMessage(m._id)}>x</button>
          </div>
        ))}
      </div>
      <input type="text" value={message} onChange={changeMessage} />
      <button disabled={!message} onClick={sendMessage}>
        send
      </button>
    </>
  );
}

export default App;
