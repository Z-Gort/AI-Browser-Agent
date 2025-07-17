import ChatInterface from "@/components/ChatInterface";
import SimpleAuthForm from "@/components/SimpleAuthForm";
import IntegrationsPage from "@/components/IntegrationsPage";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/chrome-extension";
import { trpc } from "@/lib/trpc";
import { TRPCProvider } from "@/components/TrpcProvider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const PUBLISHABLE_KEY = import.meta.env.WXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Please add the WXT_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env file"
  );
}

function AppContent() {
  return (
    <Tabs defaultValue="chat" className="h-full flex flex-col">
      <header className="w-full p-4 border-b">
        <div className="flex items-center gap-4">
          <TabsList className="grid grid-cols-2 flex-1">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          <UserButton />
        </div>
      </header>

      {/* Tabs Content */}
      <TabsContent value="chat" className="flex-1 overflow-hidden m-0">
        <ChatInterface />
      </TabsContent>

      <TabsContent value="integrations" className="flex-1 overflow-hidden m-0">
        <IntegrationsPage />
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
