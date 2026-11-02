"use client";

import { SimpleForm } from "@/components/ui/simple-form";

export function LegacyForm() {
  return (
    <SimpleForm
      id="legacy"
      submitLabel="Send in confidence"
      successTitle="Thank you — truly"
      successText="Our legacy officer will write to you personally within a week. Everything you share is held in confidence, and you are never under any obligation."
      note="Confidential. We never share your details."
      fields={[
        { name: "name", label: "Your name", type: "text", required: true, half: true, autoComplete: "name" },
        { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
        { name: "phone", label: "Phone", type: "tel", half: true, autoComplete: "tel" },
        { name: "country", label: "Country", type: "text", half: true, autoComplete: "country-name" },
        { name: "stage", label: "Where are you in your thinking?", type: "select", required: true, options: ["I’ve already included Ìrètí in my will", "I intend to include Ìrètí", "I’m considering it and would like information", "I’m a solicitor / executor with a question"] },
        { name: "interest", label: "Is there a cause close to your heart?", type: "select", options: ["Wherever it’s needed most", "Clean water & sanitation", "Maternal & child health", "Women’s livelihoods", "A particular community"] },
        { name: "message", label: "Anything you’d like us to know", type: "textarea" },
        { name: "pack", label: "Please post me the printed legacy guide", type: "checkbox" },
      ]}
    />
  );
}
