import { PieChart } from "lucide-react";
import { useTheme } from "next-themes";
import { Cell, Pie, ResponsiveContainer } from "recharts";

const CircularChart = ({ value, color }: { value: number; color: string }) => {
  const data = [
    { name: "Completed", value: value },
    { name: "Remaining", value: 100 - value },
  ];

  const { theme } = useTheme();
  const COLORS = [color, theme === "dark" ? "#374151" : "#e5e7eb"];

  return (
    <ResponsiveContainer width={60} height={60}>
      <PieChart>
        <Pie data={data} cx='50%' cy='50%' innerRadius={18} outerRadius={28} startAngle={90} endAngle={-270} dataKey='value' strokeWidth={0}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CircularChart;