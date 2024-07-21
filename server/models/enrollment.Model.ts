import mongoose, {Document, Model, Schema} from "mongoose";

export interface IEnrollment extends Document {
    courseId: string;
    userId: string;
    enrollmentDate: Date;
}

const enrollmentSchema = new Schema<IEnrollment>({
    courseId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const EnrollmentModel: Model<IEnrollment> = mongoose.model('enrollments', enrollmentSchema);

export default EnrollmentModel;