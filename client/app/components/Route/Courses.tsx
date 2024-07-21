import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import Image from "next/image";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div>
      <div className={`w-[90%] 800px:w-[80%] m-auto h-full mt-7`}>
      <div className="flex justify-center mb-5">
        <Image
          src="https://res.cloudinary.com/dfgjenml4/image/upload/v1716166071/aixmqb6gmj7exwr4sagx.png"
          alt="AruQhana"
          width={160}
          height={20}
        />
      </div>
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl  800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
          ¡Explora y Aprende! <span className="text-gradient">Descubre tus Cursos Increíbles</span>
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses &&
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
