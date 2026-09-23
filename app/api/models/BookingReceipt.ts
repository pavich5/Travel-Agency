import mongoose from "mongoose";
const receiptSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["processing", "sent", "failed"],
      required: true,
    },
    leaseUntil: { type: Date, required: true },
  },
  { timestamps: true },
);
export default mongoose.models.BookingReceipt ||
  mongoose.model("BookingReceipt", receiptSchema);
