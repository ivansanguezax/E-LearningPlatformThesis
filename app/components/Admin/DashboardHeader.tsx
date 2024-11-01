"use client";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState<any>(
    typeof window !== "undefined" &&
      new Audio(
        "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3"
      )
  );

  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess,audio, refetch]);

  

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-[9999999]">
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer  text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[60vh] overflow-y-scroll py-3 px-2 border border-[#ffffff0c]  bg-white shadow-xl absolute top-16 z-[1000000000] rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black  p-3">
            Notificaciones
          </h5>
          {notifications &&
            notifications.map((item: any, index: number) => (
              <div
                className=" bg-[#00000013] font-Poppins border-b border-b-[#0000000f]"
                key={index}
              >
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black ">{item.title}</p>
                  <p
                    className="text-black  cursor-pointer"
                    onClick={() => handleNotificationStatusChange(item._id)}
                  >
                    Marcar como leído
                  </p>
                </div>
                <p className="px-2 text-black ">
                  {item.message}
                </p>
                <p className="p-2 text-black  text-[14px]">
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;