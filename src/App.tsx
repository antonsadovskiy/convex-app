import "./App.css";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { ChangeEvent, useState } from "react";
import { Id } from "../convex/_generated/dataModel";
import Table from "./components/ui/table/table.tsx";
import { Button, Chip, Stack } from "@mui/material";

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

  const [chips, setChips] = useState([
    { id: "1", label: "first chip" },
    { id: "2", label: "second chip" },
    { id: "3", label: "third chip" },
  ]);

  const deleteChip = (id: string) => {
    setChips(chips.filter((chip) => chip.id !== id));
  };

  if (!messages) return <div>loading...</div>;
  return (
    <>
      <Table />
      <Button size={"small"} variant={"contained"}>
        small button
      </Button>
      <Stack direction="row" spacing={1}>
        {chips.map((chip) => (
          <Chip
            size={"small"}
            key={chip.id}
            label={chip.label}
            onDelete={() => deleteChip(chip.id)}
          />
        ))}
      </Stack>
    </>
  );
}

export default App;
