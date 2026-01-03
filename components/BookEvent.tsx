"use client";
import { createBooking } from "@/lib/actions/booking.actions";
import { cn } from "@/lib/utils";
import posthog from "posthog-js";
import React, { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { success } = await createBooking({ eventId, slug, email });

    if (success) {
      setSubmitted(true);
      posthog.capture("event_booked", { eventId, slug, email });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } else {
      console.log("Booking failed");
      posthog.captureException("Booking creation failed");
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p>Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Enter your email address."
              />
            </label>
          </div>

          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
