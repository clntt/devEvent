import { Event } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Invalid JSON format" },
        { status: 400 }
      );
    }

    const createdEvent = await Event.create(event);
    return NextResponse.json(
      { message: "Event created Successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
