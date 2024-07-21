import { styles } from "@/app/styles/styles";
import { useGetEnrollmentsAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";

type Props = {
  isDashboard?: boolean;
};

export default function EnrollmentsAnalytics({ isDashboard }: Props) {
  const { data, isLoading } = useGetEnrollmentsAnalyticsQuery({});

  const analyticsData: any = [];

  // Modificamos cómo accedemos a los datos
  data?.enrollments?.last12Months?.forEach((item: any) => {
    analyticsData.push({ name: item.month, Count: item.count });
  });

  // Agrega un console.log para verificar los datos
  console.log("Enrollment Analytics Data:", data);
  console.log("Processed Analytics Data:", analyticsData);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
          <div
            className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Análisis de Inscripciones
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Datos de los últimos 12 meses
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              !isDashboard ? "h-[90%]" : "h-full"
            } flex items-center justify-center`}
          >
            {analyticsData.length > 0 ? (
              <ResponsiveContainer
                width={isDashboard ? "100%" : "90%"}
                height={isDashboard ? "100%" : "50%"}
              >
                <LineChart
                  width={500}
                  height={300}
                  data={analyticsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {!isDashboard && <Legend />}
                  <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p>No hay datos disponibles para mostrar.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}