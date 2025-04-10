import React, { useEffect, useState } from "react";
import { getEnrollmentsPerCourse } from "../utils/ApiFunctions";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./EnrollmentStats.css";

const EnrollmentStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      const data = await getEnrollmentsPerCourse(token);
      if (data) {
        setStats(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="stats-container">
      <div className="stats-card">
        <h2>Statistici înrolări pe cursuri</h2>

        {stats.length === 0 ? (
          <p>Nu există date de afișat.</p>
        ) : (
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={stats}
              margin={{ top: 10, right: 20, left: 0, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="title"
                interval={0}
                angle={-30}
                textAnchor="end"
                height={90}
                tick={{ fontSize: 11 }}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar
                dataKey="students"
                fill="#4e79a7"
                radius={[4, 4, 0, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default EnrollmentStats;
