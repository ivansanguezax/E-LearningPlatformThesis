import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createEnrollment,
  getAllEnrollments,
} from "../controllers/enrollment.controller";
const enrollmentRouter = express.Router();

enrollmentRouter.post("/create-enrollment", isAutheticated, createEnrollment);

enrollmentRouter.get(
  "/get-enrollments",
  isAutheticated,
  authorizeRoles("admin"),
  getAllEnrollments
);


export default enrollmentRouter;