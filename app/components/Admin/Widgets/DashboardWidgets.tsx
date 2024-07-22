import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import EnrollmentsAnalytics from "../Analytics/EnrollmentsAnalytics";
import AllEnrollments from "../Enrollments/AllEnrollments";
import {
  useGetEnrollmentsAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [enrollmentsComparePercentage, setEnrollmentsComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: enrollmentsData, isLoading: enrollmentsLoading } =
  useGetEnrollmentsAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && enrollmentsLoading) {
      return;
    } else {
      if (data && enrollmentsData) {
        const usersLastTwoMonths = data.users.last12Months.slice(-2);
        const enrollmentsLastTwoMonths = enrollmentsData.enrollments.last12Months.slice(-2);

        if (
          usersLastTwoMonths.length === 2 &&
          enrollmentsLastTwoMonths.length === 2
        ) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const enrollmentsCurrentMonth = enrollmentsLastTwoMonths[1].count;
          const enrollmentsPreviousMonth = enrollmentsLastTwoMonths[0].count;

          const usersPercentChange = usersPreviousMonth !== 0 ?
            ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) *
            100 : 100;

          const enrollmentsPercentChange = enrollmentsPreviousMonth !== 0 ?
            ((enrollmentsCurrentMonth - enrollmentsPreviousMonth) / enrollmentsPreviousMonth) *
            100 : 100;

          setUserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });

          setEnrollmentsComparePercentage({
            currentMonth: enrollmentsCurrentMonth,
            previousMonth: enrollmentsPreviousMonth,
            percentChange: enrollmentsPercentChange,
          });
        }
      }
    }
  }, [isLoading, enrollmentsLoading, data, enrollmentsData]);

  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8 ">
          <UserAnalytics isDashboard={true} />
        </div>

        <div className="pt-[80px] pr-8">
          <div className="w-full rounded-sm !bg-white shadow-custom">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className=" text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins  text-black text-[20px]">
                  {enrollmentsComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins  text-black text-[20px] font-[400]">
                  Inscripciones
                </h5>
              </div>
              <CircularProgressWithLabel 
                value={enrollmentsComparePercentage?.percentChange} 
                open={open}
              />
            </div>
          </div>

          <div className="w-full  rounded-sm !bg-white shadow-custom my-8">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <PiUsersFourLight className=" text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins  text-black text-[20px]">
                  {userComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins  text-black text-[20px] font-[400]">
                  Nuevos Estudiantes
                </h5>
              </div>
              <CircularProgressWithLabel 
                value={userComparePercentage?.percentChange} 
                open={open}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[65%,35%] mt-[-20px] ">
        <div className=" w-[94%] mt-[30px] h-[40vh] !bg-white shadow-custom rounded-lg m-auto pt-5">
          <EnrollmentsAnalytics isDashboard={true} />
        </div>
        <div className="p-5">
          <h5 className=" text-black text-[20px] font-[400] font-Poppins pb-3">
            Estudiantes recientes
          </h5>
          <AllEnrollments isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;