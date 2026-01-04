import React from "react";
import { IEvent } from "@/database";
import EventCard from "@/components/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const response = await fetch(`${BASE_URL}/api/events`);
const { events } = await response.json();
const EventBoard = () => {
  return (
    <div className="mt-5 space-y-7">
      <h3>Featured Events</h3>

      <ul className="events">
        {events &&
          events.length !== 0 &&
          events.map((event: IEvent) => (
            <li key={event.title} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default EventBoard;
