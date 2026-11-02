"use client";

import { SimpleForm } from "@/components/ui/simple-form";

export function ContactForm() {
  return (
    <SimpleForm
      id="contact"
      submitLabel="Send message"
      fields={[
        { name: "name", label: "Full name", type: "text", required: true, half: true, autoComplete: "name" },
        { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
        { name: "phone", label: "Phone", type: "tel", half: true, autoComplete: "tel" },
        { name: "topic", label: "Topic", type: "select", required: true, half: true, options: ["A donation or receipt", "Grants & partnerships", "Legacy giving", "Volunteering", "Media enquiry", "Safeguarding concern", "Something else"] },
        { name: "message", label: "Message", type: "textarea", required: true },
      ]}
    />
  );
}
