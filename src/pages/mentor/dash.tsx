import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { protectPage } from "@/lib/auth";
import { pb } from "@/lib/pocketbase";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useMenteeList } from "@/data";

export const Route = createFileRoute("/mentor/dash")({
  component: Index,
  beforeLoad: ({ location }) => {
    protectPage(location);
  },
});

function Index() {
  const user = pb.authStore.model;

  const {
    data: menteeList,
    isLoading,
    isError,
  } = useMenteeList(user?.["mentee_list"]);

  if (isLoading)
    return (
      <Layout>
        <div>Loading mentees...</div>
      </Layout>
    );

  if (isError)
    return (
      <Layout>
        <div>Error loading mentees!</div>
      </Layout>
    );

  return (
    <Layout>
      <Table>
        <TableCaption>Your mentee list</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menteeList?.map((mentee) => (
            <TableRow key={mentee.id}>
              <TableCell>{mentee.id}</TableCell>
              <TableCell>{mentee.name}</TableCell>
              <TableCell>{mentee.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
}

export default Index;
