/**
 * Módulo de definición del esquema y modelo para el documento de curso en MongoDB utilizando Mongoose.
 *
 * @packageDocumentation
 */

import mongoose, { Document, Model, Schema } from "mongoose";

/**
 * Interfaz que define la estructura del comentario en el documento de curso.
 */
interface IComment extends Document {
  user: object;
  comment: string;
  commentReplies?: IComment[];
}

/**
 * Interfaz que define la estructura de la revisión en el documento de curso.
 */
interface IReview extends Document {
  user: object;
  rating: number;
  comment: string;
  commentReplies: IComment[];
}

/**
 * Interfaz que define la estructura del enlace en el documento de curso.
 */
interface ILink extends Document {
  title: string;
  url: string;
}

/**
 * Interfaz que define la estructura de los datos del curso en el documento de curso.
 */
interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}

/**
 * Interfaz que define la estructura del curso en el documento de curso.
 */
interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags?: string;
  level: string;
  demoUrl: string;
  benefits: {
    title: string;
  }[];
  prerequisites: {
    title: string;
  }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased?: number;
}

/**
 * Esquema de mongoose para la revisión.
 */
const reviewSchema = new Schema<IReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
});

/**
 * Esquema de mongoose para el enlace.
 */
const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

/**
 * Esquema de mongoose para el comentario.
 */
const commentSchema = new Schema<IComment>({
  user: Object,
  comment: String,
  commentReplies: [Object],
});

/**
 * Esquema de mongoose para los datos del curso.
 */
const courseDataSchema = new Schema<ICourseData>({
  videoUrl: String,
  videoThumbnail: Object,
  title: String,
  videoSection: String,
  description: String,
  videoLength: Number,
  videoPlayer: String,
  links: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});

/**
 * Esquema de mongoose para el curso.
 */
const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  estimatedPrice: {
    type: Number,
  },
  thumbnail: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  tags: {
    type: String,
    require: true,
  },
  level: {
    type: String,
    require: true,
  },
  demoUrl: {
    type: String,
    require: true,
  },
  benefits: [{ title: String }],
  prerequisites: [{ title: String }],
  reviews: [reviewSchema],
  courseData: [courseDataSchema],
  ratings: {
    type: Number,
    default: 0,
  },
  purchased: {
    type: Number,
    default: 0,
  },
});

/**
 * Modelo de mongoose para el curso.
 */
const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

export default CourseModel;
