import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { getSimilarEventsBySlug } from "@/lib/actions/events.actions";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";
import { getEventBookingCount } from "@/lib/actions/getBookingCount.actions";

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
  // "use cache";
  // cacheLife("hours");
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const { event } = await request.json();

  if (!event) notFound();
  const bookings = await getEventBookingCount(event._id.toString());
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

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
            <p>{event?.overview}</p>
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

          <EventAgender agendaItems={event?.agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{event?.organizer}</p>
          </section>

          <EventTags tags={event?.tags} />
        </div>
        {/* rightSide Event Content */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>

            {bookings > 0 ? (
              <div>
                <p className="text-sm">
                  Join {bookings} {bookings > 1 ? "persons" : "person"} who have
                  already booked thier spot.
                </p>
              </div>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}

            <BookEvent eventId={event?._id} slug={event?.slug} />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent) => {
              console.log("Similar Event: ", similarEvent.title);
              return (
                <EventCard
                  key={similarEvent?.id}
                  // {...similarEvent}
                  image={similarEvent?.image}
                  date={similarEvent?.date}
                  slug={similarEvent?.slug}
                  title={similarEvent?.title}
                  time={similarEvent?.time}
                  location={similarEvent?.location}
                />
              );
            })}
        </div>

        {similarEvents.length === 0 && (
          <p>
            There are no Similar Events that match your current selection at the
            moment. Try again!
          </p>
        )}
      </div>
    </section>
  );
};

export default EventDetailsPage;
