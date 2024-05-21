import { styles } from "@/app/styles/styles";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { format } from "timeago.js";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setRoute: any;
  setOpen: any;
};

const CourseDetails = ({
  data,
  stripePromise,
  clientSecret,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {
  const { data: userData, refetch } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const dicountPercentenge =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  const discountPercentengePrice = dicountPercentenge.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
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
              <h5 className="text-black dark:text-white font-Poppins ">
                {data.purchased} Estudiantes
              </h5>
            </div>

            <br />
            <h1 className="text-[20px] font-Poppins font-[600] text-black dark:text-white">
              Que aprenderás de este curso?
            </h1>
            <div >
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black "
                    />
                  </div>
                  <p className="pl-2 text-black font-Poppins">
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
            {/* course description */}
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
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] text-black dark:text-white">
                  {data.price === 0 ? "Sin contenido" : data.price + " Horas de contenido"}
                </h1>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[200px] my-3 font-Poppins cursor-pointer`}
                    href={`/course-access/${data._id}`}
                  >
                    Ingresar al curso
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[250px] my-3 font-Poppins cursor-pointer `}
                    onClick={handleOrder}
                  >
                    Inscribirse al curso
                  </div>
                )}
              </div>
              <br />
              <p className="pb-1 text-black font-Poppins">
                • Material de aprendizaje divertido incluido
              </p>
              <p className="pb-1 text-black font-Poppins">
                • Acceso ilimitado para repasar siempre que quieras
              </p>
              <p className="pb-1 text-black font-Poppins">
                • Certificado especial de "Aventurero del Aprendizaje" al
                finalizar
              </p>
              <p className="pb-3 800px:pb-1 text-black font-Poppins">
                • Apoyo constante para todas tus preguntas
              </p>
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm
                      setOpen={setOpen}
                      data={data}
                      user={user}
                      refetch={refetch}
                    />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
