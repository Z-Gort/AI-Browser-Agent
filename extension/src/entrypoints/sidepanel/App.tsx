import ChatInterface from "@/components/ChatInterface";
import SimpleAuthForm from "@/components/SimpleAuthForm";
import IntegrationsPage from "@/components/IntegrationsPage";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/chrome-extension";
import { trpc } from "@/lib/trpc";
import { TRPCProvider } from "@/components/TrpcProvider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useMemo, useEffect } from "react";
import { useChat } from "@ai-sdk/react";

const PUBLISHABLE_KEY = import.meta.env.WXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Please add the WXT_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env file"
  );
}

function AppContent() {
  const [enabledTools, setEnabledTools] = useState<string[]>([]);
  const { getToken } = useAuth();

  const { data: integrationsData } = trpc.integrations.getAll.useQuery();

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

  // Lift chat state to this level to persist across tab switches
  const chatState = useChat({
    api: "http://localhost:3001/api/chat",
    body: {
      enabledToolSlugs: connectedAndEnabledTools,
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

export default function App() {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY!}
      afterSignOutUrl={browser.runtime.getURL("/sidepanel.html")}
      signInFallbackRedirectUrl={browser.runtime.getURL("/sidepanel.html")}
      signUpFallbackRedirectUrl={browser.runtime.getURL("/sidepanel.html")}
    >
      <TRPCProvider>
        <SignedIn>
          <AppContent />
        </SignedIn>
        <SignedOut>
          <SimpleAuthForm />
        </SignedOut>
      </TRPCProvider>
    </ClerkProvider>
  );
}
