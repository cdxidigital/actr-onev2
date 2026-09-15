import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { AuthProvider } from "@/lib/auth/provider";
import { AccountProvider } from "@/components/account-provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { ThemeSync } from "@/components/theme-sync";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "actr.one";

const fetchSessionUser = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const u = await getSessionUser();
    return u ? { id: u.id, email: u.email } : null;
  } catch {
    return null;
  }
});

export const Route = createRootRoute({
  beforeLoad: async () => ({ sessionUser: await fetchSessionUser() }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { title: `${APP_NAME} — Your career, directed` },
      {
        name: "description",
        content:
          "Run the work. Book the room. actr.one is the career command center for actors — from first self-tape to a full book. Call Sheet is free.",
      },
      { name: "application-name", content: APP_NAME },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "theme-color", content: "#F4F1EA" },
      { name: "format-detection", content: "telephone=no" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: Root,
});

const THEME_BOOT = `(function(){try{var t=localStorage.getItem("actr-one-theme");if(t){document.documentElement.dataset.theme=t;return;}var r=localStorage.getItem("actr-one-os-v3:guest");if(!r)return;var p=JSON.parse(r).state.theme;if(p)document.documentElement.dataset.theme=p;}catch(e){}})();`;

function Root() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body className="antialiased">
        <PreviewHostBridge />
        <AuthProvider>
          <AccountProvider>
            <ThemeSync />
            <Outlet />
            <Toaster position="bottom-center" offset={24} />
          </AccountProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
