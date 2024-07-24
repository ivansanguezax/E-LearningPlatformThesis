import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: userData } = useLoadUserQuery(undefined, {});

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data.course.name + " - ELearning"}
            description={
              "Plataforma e-learning para niños con discapacidad auditiva de 8 a 12 años. Una solución educativa inclusiva diseñada para facilitar el aprendizaje y el desarrollo de habilidades."
            }
            keywords={data?.course?.tags}
          />
          
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          
          <CourseDetails
            data={data.course}
            setRoute={setRoute}
            setOpen={setOpen}
          />

          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;