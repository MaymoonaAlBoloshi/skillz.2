import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
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

import { Radar, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { useMenteeList } from "@/data";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
);

export const Route = createFileRoute("/mentor/dash")({
  component: Index,
  beforeLoad: ({ location }) => {
    protectPage(location);
  },
});

function Index() {
  const user = pb.authStore.model;
  const navigate = useNavigate();

  const {
    data: menteeList,
    isLoading,
    isError,
  } = useMenteeList(user?.["mentee_list"]);

  const handleViewClick = (menteeId: string) => {
    navigate({ to: `/mentor-mentee/${menteeId}` });
  };

  const radarData = {
    labels: [
      "Leadership",
      "Communication",
      "Technical Skills",
      "Empathy",
      "Time Management",
    ],
    datasets: [
      {
        label: "Your Skills",
        data: [8, 7, 9, 6, 7],
        backgroundColor: "rgba(34, 202, 236, 0.2)",
        borderColor: "rgba(34, 202, 236, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(34, 202, 236, 1)",
      },
    ],
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Mentee Meetings",
        data: [4, 5, 3, 6, 7, 8],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (isLoading)
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          <div className="text-xl font-semibold text-gray-600">
            Loading mentees...
          </div>
        </div>
      </Layout>
    );

  if (isError)
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          <div className="text-xl font-semibold text-red-500">
            Error loading mentees!
          </div>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="p-8 bg-gray-50 min-h-screen space-y-8">
        {/* Header Section */}
        <div className="mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}</h1>
          <p className="text-lg">
            Here’s an overview of your mentees and their progress.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">
              Total Mentees
            </h2>
            <p className="text-3xl font-bold text-blue-500">
              {menteeList?.length || 0}
            </p>
            <p className="text-gray-600">
              Assigned mentees under your guidance.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Feedback</h2>
            <p className="text-3xl font-bold text-blue-500">9.1</p>
            <p className="text-gray-600">
              Average feedback score from mentees.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Sessions</h2>
            <p className="text-3xl font-bold text-blue-500">24</p>
            <p className="text-gray-600">
              Mentoring sessions conducted this month.
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Skill Proficiency
            </h2>
            <Radar data={radarData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Mentee Meetings Over Time
            </h2>
            <Bar data={barData} />
          </div>
        </div>

        {/* Mentee Table Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Mentees
          </h2>
          <Table>
            <TableCaption className="text-gray-700 text-sm">
              A list of mentees assigned to you
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">ID</TableHead>
                <TableHead className="text-left">Name</TableHead>
                <TableHead className="text-left">Email</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menteeList?.map((mentee) => (
                <TableRow
                  key={mentee.id}
                  className="hover:bg-gray-100 transition duration-150"
                >
                  <TableCell>{mentee.id}</TableCell>
                  <TableCell>{mentee.name}</TableCell>
                  <TableCell>{mentee.email}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() => handleViewClick(mentee.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
