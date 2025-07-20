import SimpleAuthForm from "@/components/SimpleAuthForm";
import AppContent from "@/components/AppContent";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/chrome-extension";
import { TRPCProvider } from "@/components/TrpcProvider";

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
