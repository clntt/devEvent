import { EventItem } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const EventCard = ({ title, image, slug, date, location, time }: EventItem) => {
  return (
    <Link href={`/event/${slug}`}>
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />
      <div className="flex flex-row gap-2">
        <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
        <p>{location}</p>
      </div>
      <p className="title">{title}</p>

      <div className=" flex gap-2">
        <div className="flex gap-2">
          <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
          <p>{date}</p>
        </div>

        <div className="flex gap-2">
          <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
