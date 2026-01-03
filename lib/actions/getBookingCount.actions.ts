"use server";

import Booking from "@/database/booking.model";
import connectToDatabase from "@/lib/mongodb";
import { Types } from "mongoose";

export const getEventBookingCount = async (
  eventId: string
): Promise<number> => {
  await connectToDatabase();

  return Booking.countDocuments({
    eventId: new Types.ObjectId(eventId),
  });
};
