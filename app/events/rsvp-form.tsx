"use client";

import { SimpleForm } from "@/components/ui/simple-form";
import { events } from "@/mock/events";

export function RsvpForm() {
  return (
    <SimpleForm
      id="rsvp"
      submitLabel="Register"
      successTitle="You’re on the list"
      successText="Thank you. We’ll email confirmation and joining details a week before the event."
      fields={[
        { name: "event", label: "Event", type: "select", required: true, options: events.map((e) => e.title) },
        { name: "name", label: "Full name", type: "text", required: true, half: true, autoComplete: "name" },
        { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
        { name: "organisation", label: "Organisation", type: "text", half: true, autoComplete: "organization" },
        { name: "guests", label: "Number of places", type: "number", half: true, placeholder: "1" },
        { name: "access", label: "Access or dietary requirements", type: "textarea" },
      ]}
    />
  );
}
