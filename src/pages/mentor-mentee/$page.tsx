import { createFileRoute } from "@tanstack/react-router";
import { protectPage } from "@/lib/auth";
import Layout from "@/components/layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Radar } from "react-chartjs-2"; // Install react-chartjs-2 for the diagram
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export const Route = createFileRoute("/mentor-mentee/$page")({
  component: Index,
  beforeLoad: ({ location }) => {
    protectPage(location);
  },
});

function Index() {
  const mentee = {
    name: "John Doe",
    bio: "Aspiring software developer with a focus on front-end technologies.",
    skills: ["React", "TypeScript", "CSS", "Node.js", "GraphQL", "Git"],
    domain: "Web Development",
  };

  const skillLevels = {
    React: 8,
    TypeScript: 7,
    CSS: 6,
    "Node.js": 5,
    GraphQL: 6,
    Git: 7,
  };

  const skillNames = Object.keys(skillLevels);
  const skillValues = Object.values(skillLevels);

  const radarData = {
    labels: skillNames,
    datasets: [
      {
        label: "Skill Proficiency",
        data: skillValues,
        backgroundColor: "rgba(34, 202, 236, 0.2)",
        borderColor: "rgba(34, 202, 236, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(34, 202, 236, 1)",
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        ticks: { beginAtZero: true, max: 10 },
        grid: { color: "#E5E7EB" },
      },
    },
    plugins: {
      tooltip: { enabled: true },
    },
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 bg-white rounded-lg shadow">
        {/* Mentee Name */}
        <h1 className="text-3xl font-bold text-gray-800">{mentee.name}</h1>

        {/* Mentee Bio */}
        <p className="text-gray-600">{mentee.bio}</p>

        {/* Domain */}
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded">
            {mentee.domain}
          </span>
        </div>

        {/* Radar Chart */}
        <div className="mt-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Skill Proficiency
          </h2>
          <Radar data={radarData} options={radarOptions} />
        </div>

        {/* Skill List */}
        <div className="mt-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Skill List
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Skill</TableHead>
                <TableHead>Proficiency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skillNames.map((skill) => (
                <TableRow key={skill}>
                  <TableCell>{skill}</TableCell>
                  <TableCell>{skillLevels[skill]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
