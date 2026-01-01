import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />

    <p>{label}</p>
  </div>
);

const EventAgender = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agender</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap-wrap">
    {tags.map((tag) => (
      <div key={tag} className="pill">
        {tag}
      </div>
    ))}
  </div>
);

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const { event } = await request.json();

  if (!event) notFound();

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description </h1>
        <p>{event?.description}</p>
      </div>

      <div className="details">
        {/* LeftSide Event Content */}
        <div className="content">
          <Image
            src={event?.image}
            alt="Event banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{event?.Overview}</p>
          </section>

          <section className="flex-col-gfap-2">
            <h1>Event Details</h1>

            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calender"
              label={event?.date}
            />

            <EventDetailItem
              icon="/icons/clock.svg"
              alt="clock"
              label={event?.time}
            />

            <EventDetailItem
              icon="/icons/pin.svg"
              alt="pin"
              label={event?.location}
            />

            <EventDetailItem
              icon="/icons/mode.svg"
              alt="mode"
              label={event?.mode}
            />

            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={event?.audience}
            />
          </section>

          <EventAgender agendaItems={JSON.parse(event?.agenda[0])} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{event?.organizer}</p>
          </section>

          <EventTags tags={JSON.parse(event?.tags[0])} />
        </div>
        {/* rightSide Event Content */}
        <aside className="booking">
          <p className="text-lg font-semibold"> Book Event </p>
        </aside>
      </div>
    </section>
  );
};

export default EventDetailsPage;
