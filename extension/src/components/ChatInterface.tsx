import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { Loader2, Wrench, ArrowUp, Plus } from "lucide-react";
import type { UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

interface ChatInterfaceProps {
  enabledToolSlugs: string[];
  chatState: ReturnType<typeof useChat>;
  onNewThread: () => void;
}

export default function ChatInterface({
  enabledToolSlugs,
  chatState,
  onNewThread,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    chatState;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 110; // Match CSS max-height
      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`;
    }
  }, [input]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
    // Reset textarea height after submission
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  // Helper function to render tool calls
  // The 'index' parameter is for React's key prop when rendering arrays
  const renderToolCall = (part: UIMessage["parts"][0], index: number) => {
    console.log("Tool call part:", part);

    if (part.type === "tool-invocation") {
      console.log("Tool call part:", part);
      return (
        <div
          key={index}
          className="my-2 p-2 bg-muted rounded-lg border-l-4 border-primary"
        >
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Wrench className="h-4 w-4" />
            <span>
              {part.toolInvocation.toolName.toLowerCase().replace(/_/g, " ")}
            </span>
          </div>
          {/* Show tool execution status */}
          {part.toolInvocation.state === "call" && (
            <div className="mt-1 text-xs text-muted-foreground">
              ⏳ Executing...
            </div>
          )}
          {part.toolInvocation.state === "result" &&
            part.toolInvocation.result.successful && (
              <div className="mt-1 text-xs text-green-600">✅ Completed</div>
            )}
          {part.toolInvocation.state === "result" &&
            !part.toolInvocation.result.successful && (
              <div className="mt-1 text-xs text-red-600">❌ Error</div>
            )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p className="text-sm">
              Start a conversation with the AI assistant!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id}>
              {message.role === "user" ? (
                <div className="w-full">
                  <div className="w-full rounded-lg px-3 py-2 border border-primary text-foreground">
                    <div className="text-sm whitespace-pre-wrap break-words overflow-wrap-anywhere">
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
              ) : (
                <div className="w-full">
                  <div className="text-sm text-foreground prose prose-sm max-w-none">
                    {message.parts ? (
                      message.parts.map((part, index) => {
                        if (part.type === "text") {
                          return (
                            <div key={index}>
                              <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                {part.text.replace(/\n/gi, "&nbsp; \n")}
                              </ReactMarkdown>
                            </div>
                          );
                        } else if (part.type === "tool-invocation") {
                          return renderToolCall(part, index);
                        }
                        return null;
                      })
                    ) : (
                      <div>
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && messages[messages.length - 1].role === "user" && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-3 py-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Invisible div to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background p-3">
        <div className="relative border border-input rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <form onSubmit={handleFormSubmit} className="flex flex-col">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              placeholder="Chat with AI..."
              className="w-full max-h-[110px] px-2 py-2 bg-transparent border-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              disabled={isLoading}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleFormSubmit(e);
                }
              }}
            />
            <div className="flex justify-end pb-1.5 pr-1.5">
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                size="sm"
                className="h-6 w-6 p-0 rounded-full"
              >
                <ArrowUp className="h-2 w-2" />
              </Button>
            </div>

            {/* New Thread button - bottom left */}
            <div className="absolute bottom-0 left-0 pb-1.5 pl-1.5">
              <Button
                type="button"
                onClick={onNewThread}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full"
                title="Start new thread"
              >
                <Plus className="h-2 w-2" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
