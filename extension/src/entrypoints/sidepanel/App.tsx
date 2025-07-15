import ChatInterface from "@/components/ChatInterface";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/chrome-extension";
import { trpc } from "@/lib/trpc";
import { TRPCProvider } from "@/components/TrpcProvider";

const PUBLISHABLE_KEY = import.meta.env.WXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Please add the WXT_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env file"
  );
}

function AuthTest() {
  const { data: latestPost, isLoading: latestLoading } =
    trpc.post.getLatest.useQuery();
  const {
    data: helloData,
    isLoading: helloLoading,
    error: helloError,
  } = trpc.post.hello.useQuery({ text: "World" }, { enabled: true });

  return (
    <div className="p-4 border rounded mb-4">
      <h3 className="font-bold mb-2">Auth Test</h3>

      <div className="mb-2">
        <strong>Latest Post (Public):</strong>
        {latestLoading ? " Loading..." : ` ${latestPost?.name || "None"}`}
      </div>

      <div className="mb-2">
        <strong>Hello (Protected):</strong>
        {helloLoading
          ? " Loading..."
          : helloError
          ? ` Error: ${helloError.message}`
          : ` ${helloData?.greeting || "None"}`}
      </div>
    </div>
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
        <header className="w-full p-4 border-b">
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            
            <UserButton />
          </SignedIn>
        </header>
        <ChatInterface />
        <AuthTest />
      </TRPCProvider>
    </ClerkProvider>
  );
}
