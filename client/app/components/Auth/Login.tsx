"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import Image from 'next/image';
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../styles/styles";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch: any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Correo inválido!")
    .required("Por favor, ingresa tu correo!"),
  password: Yup.string().required("Por favor, introduce tu contraseña!").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Inicio de sesión exitoso!");
      setOpen(false);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="">
        <Image
          src="https://res.cloudinary.com/dfgjenml4/image/upload/v1716050112/sb2n1eju8qlmpzczcy7c.png"
          alt="AruQhana"
          width={120}
          height={20}
        />
      </div>
      <div className="">
    <h1 className={`${styles.title} flex items-center justify-center`}>
      Inicia sesión a 
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
        <label className={`${styles.label}`} htmlFor="email">
          Ingresa tu email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="email">
            Ingresa tu contraseña
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Inicia Sesión"
            className={`${styles.button}`}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          O ingresa con
        </h5>
        <div className="flex items-center justify-center my-3 p-3 bg-slate-200 rounded-lg">
          <h3 className="text-black mr-3 font-Poppins">Inicia con Google </h3>
          <FcGoogle
            size={30}
            className="cursor-pointer"
            onClick={() => signIn("google")}
          />
        </div>
        <h5 className="text-center text-black pt-4 font-Poppins text-[14px]">
          No tienes una cuenta aún?{" "}
          <span
            className="text-[#1947E5] pl-1 cursor-pointer"
            onClick={() => setRoute("Sign-Up")}
          >
            Registrate
          </span>
        </h5>
      </form>
      <br />
    </div>
    </div>

  );
};

export default Login;
