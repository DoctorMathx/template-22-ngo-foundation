"use client";

import { SimpleForm } from "@/components/ui/simple-form";

export function VolunteerForm() {
  return (
    <SimpleForm
      id="volunteer"
      submitLabel="Submit application"
      successTitle="Application received"
      successText="Thank you for offering your time and skills. Our volunteer coordinator reviews applications every fortnight and will contact you about suitable roles."
      fields={[
        { name: "name", label: "Full name", type: "text", required: true, half: true, autoComplete: "name" },
        { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
        { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, half: true, autoComplete: "tel" },
        { name: "location", label: "City & state / country", type: "text", required: true, half: true },
        { name: "skill", label: "Main skill area", type: "select", required: true, half: true, options: ["Water / civil engineering", "Medicine, nursing or midwifery", "Accounting & finance", "Monitoring & evaluation / data", "Communications & photography", "Legal", "Events & fundraising", "General support"] },
        { name: "availability", label: "Availability", type: "select", required: true, half: true, options: ["A few hours a month (remote)", "1–2 days a month", "A week or more in the field", "Event days only"] },
        { name: "experience", label: "Relevant experience", type: "textarea", required: true, placeholder: "Tell us briefly about your experience and why you’d like to volunteer." },
        { name: "safeguarding", label: "I understand that field volunteers must complete safeguarding training and a reference check.", type: "checkbox", required: true },
      ]}
    />
  );
}

export function FundraiseForm() {
  return (
    <SimpleForm
      id="fundraise"
      submitLabel="Request a fundraising pack"
      successTitle="Your pack is on its way"
      successText="We’ll email your fundraising pack, a personal donation link and a sponsorship form within one working day. Thank you!"
      fields={[
        { name: "name", label: "Your name", type: "text", required: true, half: true, autoComplete: "name" },
        { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
        { name: "type", label: "What are you planning?", type: "select", required: true, half: true, options: ["Water Walk / run / sports challenge", "Birthday, wedding or naming ceremony", "Church, mosque or community appeal", "School or university event", "Workplace fundraiser", "Something else"] },
        { name: "target", label: "Target (₦)", type: "number", half: true, placeholder: "e.g. 250000", hint: "Whole naira, no commas." },
        { name: "date", label: "Date", type: "date", half: true },
        { name: "project", label: "Fund a specific project?", type: "select", half: true, options: ["Where it’s needed most", "Solar borehole, Igbo-Ora", "Maternity ward, Bida PHC", "Girls’ sanitation block, Kishi", "Shea processing centre, Share"] },
      ]}
    />
  );
}
