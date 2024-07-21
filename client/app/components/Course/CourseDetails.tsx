import { styles } from "@/app/styles/styles";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import CourseContentList from "../Course/CourseContentList";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { AiOutlineClockCircle } from "react-icons/ai";

type Props = {
  data: any;
  setRoute: any;
  setOpen: any;
};

const CourseDetails = ({
  data,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {
  const { data: userData, refetch } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const isEnrolled =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleEnrollment = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row gap-12">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[45px] font-Poppins font-[600] text-black dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <h5 className="text-black dark:text-white font-Poppins ">
                {data.enrolled} Estudiantes inscritos
              </h5>
            </div>

            <br />
            <h1 className="text-[20px] font-Poppins font-[600] text-black dark:text-white">
              ¿Qué aprenderás en este curso?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white font-Poppins">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <div>
              <h1 className="text-[20px] font-Poppins font-[600] text-black dark:text-white">
                Contenido del curso
              </h1>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>
            <br />
            <br />
            <div className="w-full">
              <h1 className="text-[20px] font-Poppins font-[600] text-black dark:text-white">
                Descripción del curso
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                {data.description}
              </p>
            </div>
            <br />
            <br />
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center mt-5">
                <AiOutlineClockCircle size={20} className="text-black dark:text-white mr-2" />
                <h1 className="text-[25px] text-black dark:text-white">
                  {data.duration} minutos de contenido
                </h1>
              </div>
              <div className="flex items-center mt-5">
                {isEnrolled ? (
                  <Link
                    className={`${styles.button} !w-[200px] my-3 font-Poppins cursor-pointer`}
                    href={`/course-access/${data._id}`}
                  >
                    Ingresar al curso
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[250px] my-3 font-Poppins cursor-pointer`}
                    onClick={handleEnrollment}
                  >
                    Inscribirse al curso
                  </div>
                )}
              </div>
              <br />
              <p className="pb-1 text-black dark:text-white font-Poppins">
                • Material de aprendizaje divertido incluido
              </p>
              <p className="pb-1 text-black dark:text-white font-Poppins">
                • Acceso ilimitado para repasar siempre que quieras
              </p>
              <p className="pb-1 text-black dark:text-white font-Poppins">
                • Certificado especial de "Aventurero del Aprendizaje" al
                finalizar
              </p>
              <p className="pb-3 800px:pb-1 text-black dark:text-white font-Poppins">
                • Apoyo constante para todas tus preguntas
              </p>
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[400px] min-h-[400px] bg-white rounded-xl text-black shadow p-5">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full flex flex-col items-center justify-center space-y-4">
                <h1 className="text-center text-xl font-bold">¡Ups! No estás inscrito</h1>
                <Image
                  src="https://res.cloudinary.com/dfgjenml4/image/upload/v1716161299/c0fpzljz4xq6nvplovc7.png"
                  alt="Clase"
                  width={300}
                  height={200}
                  className="rounded"
                />
                <h2 className="mt-4 text-center text-lg font-semibold text-blue-500">
                  Pídele a tu profesor que active esta clase para ti
                </h2>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;