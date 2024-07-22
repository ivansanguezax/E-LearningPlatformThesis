import React, { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "../../../styles/styles";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
  courseData,
  handleCourseCreate,
  setActive,
  active,
  isEdit
}) => {
  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.name}
          />
        </div>
        <div className="flex items-center !text-black">
          <h1 className="pt-5 text-[25px]">
            Duración: {courseData?.duration} minutos
          </h1>
        </div>
        <div className="flex items-center">
          <h5 className="pt-5 text-[20px]">
            Capacidad máxima: {courseData?.maxCapacity || "Ilimitada"} estudiantes
          </h5>
        </div>

        <div className="flex items-center ">
          <div className={`${styles.button} !w-[200px] my-3 font-Poppins`}>
            Inscribirse ahora 
          </div>
        </div>

        <p className="pb-1 !text-black font-Poppins">• Material de aprendizaje divertido incluido</p>
        <p className="pb-1 !text-black font-Poppins">• Acceso ilimitado para repasar siempre que quieras</p>
        <p className="pb-1 !text-black font-Poppins">• Certificado especial de "Aventurero del Aprendizaje" al finalizar</p>
        <p className="pb-3 800px:pb-1 !text-black font-Poppins">• Apoyo constante para todas tus preguntas</p>
      </div>
      <div className="mt-5 w-full !text-black ">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600]">
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <h5>{courseData?.enrolled || 0} Estudiantes inscritos</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-Poppins font-[600]">
            ¿Qué aprenderás en este curso?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <h1 className="text-[25px] font-Poppins font-[600]">
          ¿Cuáles son los requisitos previos de este curso?
        </h1>
        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600]">
            Detalles del curso
          </h1>
          <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className={`${styles.button} !w-[200px] my-3 font-Poppins`}
          onClick={() => prevButton()}
        >
          Atrás
        </div>
        <div
          className={`${styles.button} !w-[200px] my-3 font-Poppins`}
          onClick={() => createCourse()}
        >
         {isEdit ? 'Actualizar Curso' : 'Crear curso'}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;