"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from 'next/image';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../styles/styles";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("¡Por favor, ingresa tu nombre!"),
  email: Yup.string()
    .email("¡Correo inválido!")
    .required("¡Por favor, ingresa tu correo!"),
  password: Yup.string()
    .required("¡Por favor, ingresa tu contraseña!")
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registro exitoso";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      await register({ name, email, password });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className=" px-5  py-4 flex flex-col justify-center items-center">
      <div className="">
        <Image
          src="https://res.cloudinary.com/dfgjenml4/image/upload/v1716161299/c0fpzljz4xq6nvplovc7.png"
          alt="AruQhana"
          width={120}
          height={20}
        />
      </div>
      <div className="w-full">
    <h1 className={`${styles.title} flex items-center justify-center`}>
      Bienvenido a
      <span className="ml-2">
        <Image
          src="https://res.cloudinary.com/dfgjenml4/image/upload/v1716154730/qghejkwqbzybrjxpkixj.png"
          alt="AruQhana"
          width={130}  
          height={20}
        />
      </span>
    </h1>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="name">
            Ingresa tu nombre
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="Nombre completo"
            className={`${errors.name && touched.name && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
          )}
        </div>
        <label className={`${styles.label}`} htmlFor="email">
          Ingresa tu correo
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="tucorreo@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Ingresa tu contraseña
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="¡TuContraseñaSegura!"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-10 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-10 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Registrarse"
            className={`${styles.button}`}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black ">
          O únete con
        </h5>

        <div className="flex items-center justify-center my-3 p-3 bg-slate-200 rounded-lg">
          <h3 className="text-black mr-3 font-Poppins">Inicia con Google</h3>
          <FcGoogle size={30} className="cursor-pointer mr-2" />
        </div>
        <h5 className="text-center text-black pt-4 font-Poppins text-[14px]">
          ¿Ya tienes una cuenta?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Inicia sesión
          </span>
        </h5>
      </form>
      <br />
    </div>
            </div>
  );
};

export default Signup;
