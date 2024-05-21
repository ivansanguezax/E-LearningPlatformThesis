import Link from "next/link";
import React from "react";
import { HomeIcon, AcademicCapIcon, BookOpenIcon, UserIcon } from "@heroicons/react/24/outline";

export const navItemsData = [
  {
    name: "Inicio",
    url: "/",
    icon: HomeIcon,
  },
  {
    name: "Cursos",
    url: "/courses",
    icon: AcademicCapIcon,
  },
  {
    name: "Sobre la Tesis",
    url: "/about",
    icon: BookOpenIcon,
  },   
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link href={item.url} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#1947E5] text-[#1947E5] font-semibold"
                    : "dark:text-white text-black"
                } flex items-center text-[18px] px-6 font-Poppins font-[400]`}
              >
                <item.icon
                  className={`h-6 w-6 mr-2 ${
                    activeItem === index ? "text-[#1947E5]" : "text-gray-500"
                  }`}
                />
                {item.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full py-6 flex justify-center">
            <Link href="/">
              <img
                src="https://res.cloudinary.com/dfgjenml4/image/upload/v1716154730/qghejkwqbzybrjxpkixj.png"
                alt="AruQhana"
                className=""
              />
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((item, index) => (
              <Link href={item.url} passHref key={index}>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-[#1947E5] text-[#145adc]"
                      : "dark:text-white text-black"
                  } flex items-center py-5 text-[18px] px-6 font-Poppins font-[400]`}
                >
                  <item.icon
                    className={`h-6 w-6 mr-2 ${
                      activeItem === index ? "text-[#1947E5]" : "text-gray-500"
                    }`}
                  />
                  {item.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
