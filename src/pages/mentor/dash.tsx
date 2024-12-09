import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { protectPage } from "@/lib/auth";

export const Route = createFileRoute("/mentor/dash")({
  component: Index,
  beforeLoad: ({ location }) => {
    protectPage(location);
  },
});

function Index() {
  return (
    <Layout>
      <div>hello world mentor</div>
    </Layout>
  );
}
