import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";

export const Route = createFileRoute("/dashbaord")({
  component: Index,
});

function Index() {
  return (
    <Layout>
      <div>hello world</div>
    </Layout>
  );
}
