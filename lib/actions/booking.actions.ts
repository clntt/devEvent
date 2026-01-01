"use server";

import { Booking } from "@/database";
import connectToDatabase from "../mongodb";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectToDatabase();
    await Booking.create({ eventId, slug, email });

    return { success: true };
  } catch (error) {
    console.log("create booking failed", error);
    return { succecss: false };
  }
};
