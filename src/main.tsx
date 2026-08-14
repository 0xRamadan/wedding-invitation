import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import PrivateGuestbook from "./components/PrivateGuestbook.tsx";
import "./index.css";

function Router() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (
    route === "#/guestbook-private" ||
    route === "#/rsvp-private" ||
    route === "#/private" ||
    route === "#/dashboard"
  ) {
    return <PrivateGuestbook />;
  }

  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
