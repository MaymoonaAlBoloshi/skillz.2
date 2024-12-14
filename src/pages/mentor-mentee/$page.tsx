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
      <div className="px-8 space-y-8 bg-gray-50">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow text-white">
          <h1 className="text-4xl font-bold mb-2">{mentee.name}</h1>
          <p className="text-lg">{mentee.bio}</p>
          <div className="mt-4">
            <span className="px-4 py-2 text-sm font-medium bg-white text-blue-600 rounded-full shadow">
              {mentee.domain}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Skill Proficiency
            </h2>
            <Radar data={radarData} options={radarOptions} />
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
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
      </div>
    </Layout>
  );
}

export default Index;
