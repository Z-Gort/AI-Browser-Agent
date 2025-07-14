import ChatInterface from "@/components/ChatInterface";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/chrome-extension";

const PUBLISHABLE_KEY = import.meta.env.WXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Please add the WXT_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env file"
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
      <header className="w-full">
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <ChatInterface />
    </ClerkProvider>
  );
}
