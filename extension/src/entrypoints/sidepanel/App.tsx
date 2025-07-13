import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

function App() {
  const [message, setMessage] = useState("Welcome to the Side Panel!");

  // Simple hello query test
  const {
    data: helloData,
    isLoading,
    error,
    refetch,
  } = trpc.post.hello.useQuery({ text: "Extension" }, { enabled: true });

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

      {/* Simple tRPC Hello Test */}
      <div className="border-t pt-4 space-y-3">
        <h2 className="text-lg font-semibold text-gray-700">tRPC Hello Test</h2>

        <div className="space-y-2">
          <p className="text-sm">
            <strong>Status:</strong>{" "}
            {isLoading ? "Loading..." : error ? "Error" : "Success"}
          </p>

          {error && (
            <p className="text-sm text-red-600">
              <strong>Error:</strong> {error.message}
            </p>
          )}

          {helloData && (
            <p className="text-sm text-green-600">
              <strong>Response:</strong> {helloData.greeting}
            </p>
          )}

          <Button size="sm" onClick={() => refetch()}>
            Test Hello Query
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
