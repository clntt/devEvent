"use server";

import Event from "@/database/event.model";
import connectToDatabase from "../mongodb";
import { IEvent } from "@/database/event.model";
export const getSimilarEventsBySlug = async (
  slug: string
): Promise<IEvent[]> => {
  try {
    await connectToDatabase();
    // const event = await Event.findOne({ slug });

    // return await Event.find({
    //   _id: { $ne: event?._id },
    //   tags: { $in: event?.tags },
    // }).lean();

    const event: IEvent | null = await Event.findOne({ slug });

    if (!event) {
      return [];
    }

    const similarEvents: IEvent[] = await Event.find({
      _id: { $ne: event?._id },
      tags: { $in: event?.tags },
    });

    return similarEvents;
  } catch {
    return [];
  }
};
