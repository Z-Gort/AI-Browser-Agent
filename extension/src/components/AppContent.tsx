import ChatInterface from "@/components/ChatInterface";
import IntegrationsPage from "@/components/IntegrationsPage";
import { UserButton, useAuth } from "@clerk/chrome-extension";
import { trpc } from "@/lib/trpc";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo, useEffect } from "react";
import { useChat } from "@ai-sdk/react";

export default function AppContent() {
  const [enabledTools, setEnabledTools] = useState<string[]>([]);
  const [createNewThread, setCreateNewThread] = useState(false);
  const { getToken, userId, isLoaded } = useAuth();

  const { data: integrationsData, isLoading: integrationsLoading } =
    trpc.integrations.getAll.useQuery();

  // Get thread - either most recent or create new based on createNewThread flag
  const {
    data: threadData,
    isLoading: threadLoading,
    refetch: refetchThread,
  } = trpc.history.getOrCreateThreadId.useQuery({
    resourceId: userId!,
    createNew: createNewThread,
  });

  // Fetch initial messages when we have a threadId
  const { data: messagesData, isLoading: messagesLoading } =
    trpc.history.getMessages.useQuery(
      {
        threadId: threadData?.threadId!,
      },
      {
        enabled: !!threadData?.threadId,
      }
    );

  // Set all available tools as enabled by default when data loads
  useEffect(() => {
    if (integrationsData?.integrations && enabledTools.length === 0) {
      const allSlugs = integrationsData.integrations.map(
        (integration) => integration.slug
      );
      setEnabledTools(allSlugs);
    }
  }, [integrationsData]);

  //The tools the AI can use
  const connectedAndEnabledTools = useMemo(() => {
    if (!integrationsData?.integrations) return [];

    return integrationsData.integrations
      .filter(
        (integration) =>
          integration.isConnected && enabledTools.includes(integration.slug)
      )
      .map((integration) => integration.slug);
  }, [integrationsData, enabledTools]);

  const chatState = useChat({
    api: import.meta.env.DEV
      ? "http://localhost:3001/api/chat"
      : "https://browser-cursor-six.vercel.app/api/chat",
    initialMessages: messagesData?.messages || [],
    experimental_prepareRequestBody: (request) => {
      // Get the last message from the request
      const lastMessage =
        request.messages.length > 0
          ? request.messages[request.messages.length - 1]
          : null;

      return {
        message: lastMessage,
        threadId: threadData?.threadId,
        resourceId: userId,
        enabledToolSlugs: connectedAndEnabledTools,
      };
    },
    async fetch(url, options) {
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

  console.log("THREAD DATA", threadData);
  console.log("create new thread", createNewThread);
  console.log("MESSAGES DATA", messagesData);

  // Function to create a new thread
  const handleNewThread = async () => {
    setCreateNewThread(true);
    await refetchThread();
    chatState.setMessages([]);
  };

  if (threadLoading || integrationsLoading || messagesLoading || !isLoaded) {
    return (
      <div className="h-full flex flex-col">
        <header className="sticky top-0 z-10 w-full p-4 border-b bg-background">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </header>
        <div className="flex-1 flex flex-col justify-between min-h-[calc(100vh-5rem)]">
          <div />
          <div className="p-4 border-t">
            <div className="flex gap-3">
              <Skeleton className="h-10 flex-1" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="chat" className="h-full flex flex-col">
      <header className="sticky top-0 z-10 w-full p-4 border-b bg-background">
        <div className="flex items-center gap-4">
          <TabsList className="grid grid-cols-2 flex-1">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          <UserButton />
        </div>
      </header>
      <TabsContent value="chat" className="flex-1 overflow-hidden m-0">
        <ChatInterface
          enabledToolSlugs={connectedAndEnabledTools}
          chatState={chatState}
          onNewThread={handleNewThread}
        />
      </TabsContent>
      <TabsContent value="integrations" className="flex-1 overflow-hidden m-0">
        <IntegrationsPage
          enabledTools={enabledTools}
          setEnabledTools={setEnabledTools}
        />
      </TabsContent>
    </Tabs>
  );
}
