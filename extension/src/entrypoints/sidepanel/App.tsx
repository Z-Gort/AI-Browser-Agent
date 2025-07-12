import { useState } from "react";
import { Button } from "@/components/ui/button";

function App() {
  const [message, setMessage] = useState("Welcome to the Side Panel!");

  const handleClick = () => {
    setMessage(
      message === "Welcome to the Side Panel!"
        ? "Side Panel is working!"
        : "Welcome to the Side Panel!"
    );
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Side Panel</h1>
      <p className="text-gray-600">{message}</p>
      <Button onClick={handleClick}>Toggle Message</Button>
    </div>
  );
}

export default App;
