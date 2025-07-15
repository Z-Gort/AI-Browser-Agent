import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/chrome-extension";

export default function ChatInterface() {
  const { getToken } = useAuth();

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "http://localhost:3001/api/chat",
      async fetch(url, options) {
        //override default fetch
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
    <div className="flex flex-col h-screen bg-background">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
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
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
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

        {/* Loading indicator - only show when AI hasn't started responding yet */}
        {isLoading &&
          messages[messages.length - 1].role === "user" && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-3 py-2">
                <p className="text-sm text-muted-foreground">thinking...</p>
              </div>
            </div>
          )}
      </div>

      {/* Input Form - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2 max-w-full">
          <Input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            className="flex-1"
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
