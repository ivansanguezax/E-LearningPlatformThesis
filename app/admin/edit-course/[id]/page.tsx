'use client'
import React from 'react'
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from '../../../utils/Heading';
import DashboardHeader from '../../../components/Admin/DashboardHeader';
import EditCourse from "../../../components/Admin/Course/EditCourse";

type Props = {}

const page = ({params}:any) => {
    const id = params?.id;

  return (
    <div>
        <Heading
          title="Area Profesores"
          description="Plataforma e-learning para niños con discapacidad auditiva de 8 a 12 años. Una solución educativa inclusiva diseñada para facilitar el aprendizaje y el desarrollo de habilidades."
          keywords="Elearning, Educación inclusiva, Discapacidad auditiva, Aprendizaje para niños"
        />
        <div className="flex">
            <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar />
            </div>
            <div className="w-[85%]">
               <DashboardHeader />
               <EditCourse id={id} />
            </div>
        </div>
    </div>
  )
}

export default page