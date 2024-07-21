"use client";
import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  ExitToAppIcon,
} from "./Icon";
import avatarDefault from "../../../../public/assets/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setlogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const logoutHandler = () => {
    setlogout(true);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "#fff !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: "#000",
        },
      }}
      className="!bg-white"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 99999999999999,
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
               <Link href="/" className="block">
               <h3 className="text-[25px] font-Poppins uppercase text-black">
                  ELearning
                </h3>
               </Link>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className="inline-block">
                  <ArrowBackIosIcon className="text-black" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] text-black"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ m: "10px 0 0 0" }}
                  className="!text-[20px] text-black capitalize"
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black capitalize !font-[400]"
            >
              {!isCollapsed && "Datos"}
            </Typography>
            <Item
              title="Estudiantes"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Inscripciones"
              to="/admin/enrollments"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Contenido"}
            </Typography>
            <Item
              title="Crear curso"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Lista de Cursos"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Control de Profesores"}
            </Typography>
            <Item
              title="Profesores"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="!text-[18px] text-black capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Analíticas"}
            </Typography>
            <Item
              title="Data de Cursos"
              to="/admin/courses-analytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Data de Alumnos"
              to="/admin/users-analytics"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="!text-[18px] text-black capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <div onClick={logoutHandler}>
              <Item
                title="Salir"
                to="/"
                icon={<ExitToAppIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;