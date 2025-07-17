import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  // Handle OAuth errors
  if (error) {
    console.error("OAuth error:", error);
    return NextResponse.json(
      { error: "OAuth authentication failed" },
      { status: 400 },
    );
  }

  // In a real implementation, you would:
  // 1. Validate the state parameter
  // 2. Exchange the code for tokens via Composio
  // 3. Store the connection
  // 4. Redirect to success page or close the popup

  // For now, just return a simple success page
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Connection Successful</title>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          height: 100vh; 
          margin: 0; 
          background: #f8f9fa;
        }
        .container { 
          text-align: center; 
          padding: 2rem; 
          background: white; 
          border-radius: 8px; 
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .success { color: #22c55e; font-size: 2rem; margin-bottom: 1rem; }
        .message { color: #374151; margin-bottom: 1rem; }
        .close-btn { 
          background: #3b82f6; 
          color: white; 
          border: none; 
          padding: 0.5rem 1rem; 
          border-radius: 6px; 
          cursor: pointer; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="success">✅</div>
        <div class="message">Integration connected successfully!</div>
        <button class="close-btn" onclick="window.close()">Close</button>
      </div>
      <script>
        // Auto-close after 3 seconds
        setTimeout(() => {
          window.close();
        }, 3000);
      </script>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
