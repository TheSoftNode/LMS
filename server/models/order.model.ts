import mongoose, { Model, Schema } from "mongoose";
import { IOrder } from "./Interfaces/orderInterface";

const orderSchema = new Schema<IOrder>(
  {
    courseId: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    payment_info: Object,
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.model("Order", orderSchema);
export default Order;
