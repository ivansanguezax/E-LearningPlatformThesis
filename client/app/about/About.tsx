import React from "react";
import { styles } from "../styles/styles";

const About = () => {
  return (
    <div className="text-black dark:text-white h-screen">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        PLATAFORMA E-LEARNING PARA NIÑOS CON <br />
        <span className="text-gradient">
           DISCAPACIDAD AUDITIVA DE 8 A 12 AÑOS
        </span>
      </h1>
      <h5 className="text-[18px] font-Poppins text-center">
        Tesis de Grado para obtener el Título de Licenciatura en Informática <br />
          Mención Ingeniería de Sistemas Informáticos
        </h5>

      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Poppins text-justify">
          El propósito principal de esta investigación es introducir un método
          para que los niños con discapacidad auditiva realicen su educación
          incluso en tiempos de crisis. Se presentará un método para aprender
          programación en bloques, la programación es una habilidad cada vez más
          importante en el mundo actual. La importancia de esta investigación
          radica en que se basa en plataformas de e-learning para niños con
          discapacidad auditiva. La idea de plataformas de e-learning para niños
          con discapacidades es una tendencia emergente en el campo del
          e-learning. Por lo tanto, este estudio analiza las plataformas de
          e-learning existentes para niños con discapacidad auditiva y las
          tecnologías y tendencias utilizadas por otros investigadores para
          resolver problemas existentes.
        </p>
        <br />
        <span className="text-[22px]">
          
        </span>
        
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
