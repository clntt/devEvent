"use server";

import Event from "@/database/event.model";
import connectToDatabase from "@/lib/mongodb";
import slugify from "slugify";

export interface CreateEventInput {
  title: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
}

export const createEvent = async (data: CreateEventInput) => {
  try {
    await connectToDatabase();

    const slug = slugify(data.title, {
      lower: true,
      strict: true,
    });

    const event = await Event.create({
      ...data,
      slug,
    });

    return {
      success: true,
      event: JSON.parse(JSON.stringify(event)),
    };
  } catch (error) {
    console.error("Create Event Error:", error);
    return {
      success: false,
    };
  }
};
