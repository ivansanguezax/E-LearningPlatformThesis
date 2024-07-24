import { styles } from "@/app/styles/styles";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};

const ChangePassword: FC<Props> = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Contraseña no coincide");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Contraseña actualizada");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
      <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black  pb-2">
        Cambiar Contraseña
      </h1>
      <div className="w-full">
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[60%] mt-5">
            <label className={`${styles.label}`}>
              Ingrese su contraseña actual
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black `}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[60%] mt-2">
            <label className={`${styles.label}`}>
              Ingresa tu nueva contraseña
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black `}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[60%] mt-2">
            <label className={`${styles.label}`}>
              Ingresa para confirmar contraseña
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black `}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="flex justify-center ">
            <input
              className={`${styles.button} w-[95%] 800px:w-[50%] mt-5`}
              required
              value="Actualizar"
              type="submit"
            /></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
