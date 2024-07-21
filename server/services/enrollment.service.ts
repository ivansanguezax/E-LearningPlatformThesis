import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import EnrollmentModel from "../models/enrollment.Model";
import ErrorHandler from "../utils/errorHandler";

// create new enrollment
export const newEnrollment = CatchAsyncError(async(data: any, res: Response, next: NextFunction) => {
    try {
        const enrollment = await EnrollmentModel.create(data);

        res.status(201).json({
            success: true,
            enrollment,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// Get All Enrollments
export const getAllEnrollmentsService = async (res: Response) => {
    const enrollments = await EnrollmentModel.find().sort({ createdAt: -1 });
  
    res.status(201).json({
      success: true,
      enrollments,
    });
};