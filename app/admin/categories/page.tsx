"use client";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import EditCategories from "../../components/Admin/Customization/EditCategories";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Area Profesores"
          description="Plataforma e-learning para niños con discapacidad auditiva de 8 a 12 años. Una solución educativa inclusiva diseñada para facilitar el aprendizaje y el desarrollo de habilidades."
          keywords="Elearning, Educación inclusiva, Discapacidad auditiva, Aprendizaje para niños"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <EditCategories />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;