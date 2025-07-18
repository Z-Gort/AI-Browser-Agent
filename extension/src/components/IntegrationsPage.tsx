import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { useState, useEffect, useRef, useCallback } from "react";

type ConnectionStatus =
  | "idle"
  | "connecting"
  | "checking"
  | "active"
  | "failed"
  | "expired";

interface IntegrationsPageProps {
  enabledTools: string[];
  setEnabledTools: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function IntegrationsPage({
  enabledTools,
  setEnabledTools,
}: IntegrationsPageProps) {
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("idle");
  const [activeConnectionId, setActiveConnectionId] = useState<string | null>(
    null
  );
  const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    data: integrationsData,
    isLoading,
    refetch,
  } = trpc.integrations.getAll.useQuery();

  const { refetch: checkStatus } =
    trpc.integrations.getConnectionStatus.useQuery(
      { connectionId: activeConnectionId! },
      { enabled: false }
    );

  const connectMutation = trpc.integrations.connect.useMutation({
    onSuccess: (data) => {
      if (data.redirectUrl && data.connectionId) {
        setActiveConnectionId(data.connectionId);

        window.open(data.redirectUrl, "_blank");

        setConnectionStatus("connecting");

        setTimeout(() => {
          checkConnectionStatus(data.connectionId);
        }, 2000);
      }
    },
    onError: () => {
      setConnectionStatus("failed");
      setConnectingId(null);
    },
  });

  const disconnectMutation = trpc.integrations.disconnect.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const checkConnectionStatus = useCallback(
    async (connectionId: string) => {
      setConnectionStatus("checking");
      try {
        const response = await checkStatus();

        if (response.data) {
          const { status } = response.data;

          switch (status) {
            case "ACTIVE":
              setConnectionStatus("active");
              refetch();
              break;
            case "FAILED":
              setConnectionStatus("failed");
              break;
            case "EXPIRED":
              setConnectionStatus("expired");
              break;
            case "INITIALIZING":
            case "INITIATED":
              pollingTimeoutRef.current = setTimeout(() => {
                checkConnectionStatus(connectionId);
              }, 2000);
              break;
          }
        }
      } catch (error) {
        console.error("Failed to check connection status:", error);
        setConnectionStatus("failed");
      }
    },
    [checkStatus, refetch, pollingTimeoutRef]
  );

  useEffect(() => {
    const integrations = integrationsData?.integrations || [];
    const connectingIntegration = integrations.find(
      (i) => i.id === connectingId
    );

    if (connectingIntegration?.isConnected) {
      setConnectionStatus("idle");
      setActiveConnectionId(null);
      setConnectingId(null);
    }
  }, [integrationsData, connectingId]);

  useEffect(() => {
    return () => {
      setConnectionStatus("idle");
      setActiveConnectionId(null);
      setConnectingId(null);
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
      }
    };
  }, []);

  const handleConnect = async (integrationId: string) => {
    setConnectingId(integrationId);
    setConnectionStatus("connecting");
    connectMutation.mutate({ integrationId });
  };

  const handleDisconnect = async (connectionId: string) => {
    disconnectMutation.mutate({ connectionId });
  };

  const handleRetry = (integrationId: string) => {
    setConnectionStatus("idle");
    setActiveConnectionId(null);
    handleConnect(integrationId);
  };

  const handleToggle = (
    toolSlug: string,
    enabled: boolean,
    isConnected = false
  ) => {
    setEnabledTools((prev) => {
      if (enabled) {
        // Add if not already present
        return prev.includes(toolSlug) ? prev : [...prev, toolSlug];
      } else {
        // Remove if present
        return prev.filter((slug) => slug !== toolSlug);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        {Array.from({ length: 1 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-5 w-9" />
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <Skeleton className="h-4 w-32" />
            </CardContent>
            <CardFooter className="pt-0">
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  const integrations = integrationsData?.integrations || [];

  return (
    <div className="p-4">
      {integrations.length === 0 ? (
        <div>No integrations available.</div>
      ) : (
        <div className="space-y-3">
          {integrations.map((integration) => {
            const isCurrentlyConnecting = connectingId === integration.id;
            const showConnectionStatus =
              isCurrentlyConnecting &&
              (connectionStatus === "connecting" ||
                connectionStatus === "checking");
            const showFailedStatus =
              isCurrentlyConnecting &&
              (connectionStatus === "failed" || connectionStatus === "expired");
            const showActiveStatus =
              isCurrentlyConnecting && connectionStatus === "active";
            const isConnected = showActiveStatus || integration.isConnected;
            const isEnabled = enabledTools.includes(integration.slug);

            let buttonText = "Connect";
            let isDisabled = false;
            let variant: "default" | "outline" = "default";

            if (showConnectionStatus) {
              buttonText =
                connectionStatus === "connecting"
                  ? "Connecting..."
                  : "Verifying...";
              isDisabled = true;
            } else if (isConnected) {
              buttonText = disconnectMutation.isPending
                ? "Disconnecting..."
                : "Disconnect";
              isDisabled = disconnectMutation.isPending;
              variant = "outline";
            } else if (showFailedStatus) {
              buttonText = "Try Again";
            }

            if (
              !enabledTools.includes(integration.slug) &&
              !integration.isConnected
            ) {
              isDisabled = true;
            }

            return (
              <Card key={integration.id}>
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {integration.logo ? (
                        <img
                          src={integration.logo}
                          alt={`${integration.name} logo`}
                          width={20}
                          height={20}
                          className="size-5 object-contain"
                        />
                      ) : (
                        <div className="size-5 bg-muted rounded" />
                      )}
                      <CardTitle className="text-base">
                        {integration.name}
                      </CardTitle>
                    </div>
                    <Switch
                      id={`enable-${integration.slug}`}
                      checked={isEnabled}
                      onCheckedChange={(enabled: boolean) =>
                        handleToggle(
                          integration.slug,
                          enabled,
                          integration.isConnected || false
                        )
                      }
                      aria-label={`Enable ${integration.name}`}
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs">
                    {integration.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant={variant}
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      if (isConnected) {
                        handleDisconnect(integration.connectionId!);
                      } else if (showFailedStatus) {
                        handleRetry(integration.id);
                      } else {
                        handleConnect(integration.id);
                      }
                    }}
                    disabled={isDisabled}
                  >
                    {buttonText}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
