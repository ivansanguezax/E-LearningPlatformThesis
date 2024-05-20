import React, { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "../../../../app/styles/styles";
import Ratings from "../../../../app/utils/Ratings";
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
  const dicountPercentenge =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentengePrice = dicountPercentenge.toFixed(0);

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
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? "Free" : courseData?.price + "hrs"}
          </h1>
          <h5 className="ml-3 pt-5 text-[25px]">
            {courseData?.estimatedPrice}Cupos
          </h5>

          <h4 className="ml-3 pt-5 text-[25px]">
            {discountPercentengePrice} Extras
          </h4>
        </div>

        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[200px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Inscribirse ahora 
          </div>
        </div>


        <p className="pb-1">• Material de aprendizaje divertido incluido</p>
<p className="pb-1">• Acceso ilimitado para repasar siempre que quieras</p>
<p className="pb-1">• Certificado especial de "Aventurero del Aprendizaje" al finalizar</p>
<p className="pb-3 800px:pb-1">• Apoyo constante para todas tus preguntas</p>


      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600]">
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            
            <h5>0 Estudiantes inscritos</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-Poppins font-[600]">
            Que aprenderas en este curso?
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
          Cuales son los requisitos previos de este curso?
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
        {/* course description */}
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
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#1947E5] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Atras
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#1947E5] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => createCourse()}
        >
         {
          isEdit ? 'Actualizar Curso' : 'Crear curso'
         }
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
