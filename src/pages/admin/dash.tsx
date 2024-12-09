import { createFileRoute } from "@tanstack/react-router";

import { protectPage } from "@/lib/auth";
export const Route = createFileRoute("/admin/dash")({
  component: () => <div>Hello /admin/dashboard!</div>,
  beforeLoad: ({ location }) => {
    protectPage(location, ["admin"]);
  },
});

