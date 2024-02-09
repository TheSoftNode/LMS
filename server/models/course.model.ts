import mongoose, { Model, Schema } from "mongoose";
import ICourse from "./Interfaces/courseInterface";
import slugify from "slugify";

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: [true, "Course must have a name"],
    },

    slug: String,

    description: {
      type: String,
      required: [true, "Course must have a description"],
    },

    price: {
      type: Number,
      required: [true, "Course must have a price"],
    },

    estimatedPrice: Number,

    thumbnail: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },

    tags: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    demoUrl: {
      type: String,
      required: true,
    },

    benefits: [{ title: String }],

    prerequisites: [{ title: String }],

    courseData: {
      type: Schema.ObjectId,
      ref: "CourseData",
    },

    ratings: {
      type: Number,
      default: 0,
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val: number) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val: number) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },

    purchased: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

courseSchema.index({ slug: 1 });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
courseSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

courseSchema.pre(/^find/, function (this: any, next) {
  this.populate({
    path: "courseData",
    select: "-__v -videoUrl -suggestion -questions -links",
  });

  next();
});

const Course: Model<ICourse> = mongoose.model("Course", courseSchema);
export default Course;
