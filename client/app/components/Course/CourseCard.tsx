import Image from "next/image";
import Link from "next/link";
import { styles } from "@/app/styles/styles";
import React, { FC } from "react";
import { AiOutlineUnorderedList, AiOutlineClockCircle } from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
    >
      <div className="w-full !bg-white min-h-[25vh] backdrop-blur border-2 border-gray-900 shadow-[0px_5px_0px_0px_#18191F] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 dark:shadow-inner">
        <Image
          src={item.thumbnail.url}
          width={500}
          height={300}
          objectFit="contain"
          className="rounded w-full"
          alt=""
        />
        <br />
        <h1 className="font-Poppins text-[16px] font-semibold text-black dark:text-[#fff]">
          {item.name}
        </h1>
        <div className="w-full flex items-center justify-between pt-2">
          <h5
            className={`dark:text-[#fff] text-gray-400 font-Poppins ${
              isProfile && "hidden 800px:inline"
            }`}
          >
            {item.enrolled} Estudiantes
          </h5>
        </div>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex items-center">
            <AiOutlineClockCircle size={20} className="text-black dark:text-[#fff]" />
            <h3 className="text-black dark:text-[#fff] ml-2">
              {item.duration} minutos
            </h3>
          </div>
          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={20} className="text-black dark:text-[#fff]" />
            <h5 className="pl-2 text-black dark:text-[#fff]">
              {item.courseData?.length} Clases
            </h5>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            className={`${styles.button} !w-[200px] my-5 font-Poppins cursor-pointer`}
            href={
              !isProfile ? `/course/${item._id}` : `course-access/${item._id}`
            }
          >
            {isProfile ? "Continuar curso" : "Ver detalles"}
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;