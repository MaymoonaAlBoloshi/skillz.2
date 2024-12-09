import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { protectPage } from "@/lib/auth";

export const Route = createFileRoute("/mentee/dash")({
  component: Index,
  beforeLoad: ({ location }) => {
    protectPage(location);
  },
});

function Index() {
  return (
    <Layout>
      <div>hello mentor</div>
    </Layout>
  );
}
