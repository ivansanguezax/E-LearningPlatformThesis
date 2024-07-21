import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { IEnrollment } from "../models/enrollment.Model";
import userModel from "../models/user.model";
import CourseModel, { ICourse } from "../models/course.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notificationModel";
import { getAllEnrollmentsService, newEnrollment } from "../services/enrollment.service";
import { redis } from "../utils/redis";
require("dotenv").config();

// create enrollment
export const createEnrollment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.body as IEnrollment;

      const user = await userModel.findById(req.user?._id);

      if (!user) {
        return next(new ErrorHandler("Usuario no encontrado", 404));
      }

      const courseExistInUser = user.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler("Ya estás inscrito en este curso", 400)
        );
      }

      const course: ICourse | null = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Curso no encontrado", 404));
      }

      if (course.maxCapacity && course.enrolled >= course.maxCapacity) {
        return next(new ErrorHandler("Este curso ha alcanzado su capacidad máxima", 400));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
      };

      const mailData = {
        enrollment: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/enrollment-confirmation.ejs"),
        { enrollment: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Inscripción exitosa",
            template: "enrollment-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses.push(course?._id);

      await redis.set(req.user?._id, JSON.stringify(user));

      await user?.save();

      await NotificationModel.create({
        user: user?._id,
        title: "Inscripción exitosa",
        message: `Tu inscripción en el curso ha sido exitosa:${course.name}`,
      });

      course.enrolled = (course.enrolled || 0) + 1;

      await course.save();

      newEnrollment(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get All enrollments --- only for admin
export const getAllEnrollments = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllEnrollmentsService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);