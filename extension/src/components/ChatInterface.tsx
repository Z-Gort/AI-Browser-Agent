import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/chrome-extension";

export default function ChatInterface() {
  const { getToken } = useAuth();

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "http://localhost:3001/api/chat",
      async fetch(url, options) { //override default fetch
        const token = await getToken();
        const headers = {
          ...options?.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        return fetch(url, {
          ...options,
          headers,
        });
      },
    });

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h1 className="text-lg font-semibold text-gray-800">AI Assistant</h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>Start a conversation with the AI assistant!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">
                  {message.parts
                    ? message.parts.map((part, index) =>
                        part.type === "text" ? (
                          <span key={index}>{part.text}</span>
                        ) : null
                      )
                    : message.content}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-3 py-2">
              <p className="text-sm text-gray-600">AI is thinking...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <Button type="submit" disabled={!input.trim() || isLoading} size="sm">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
