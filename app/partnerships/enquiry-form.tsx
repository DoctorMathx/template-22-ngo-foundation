"use client";

import { SimpleForm } from "@/components/ui/simple-form";
import { corporateTiers } from "@/mock/funders";

export function EnquiryForm() {
  return (
    <SimpleForm
      id="enquiry"
      submitLabel="Send enquiry"
      successTitle="Enquiry received"
      successText="Thank you. Our partnerships team will be in touch within two working days with a tailored proposal and our CSR impact pack."
      fields={[
        { name: "company", label: "Company", type: "text", required: true, half: true, autoComplete: "organization" },
        { name: "sector", label: "Sector", type: "select", half: true, options: ["Banking & finance", "Telecoms & tech", "Energy & oil and gas", "FMCG & manufacturing", "Professional services", "Other"] },
        { name: "name", label: "Your name", type: "text", required: true, half: true, autoComplete: "name" },
        { name: "role", label: "Role", type: "text", half: true, autoComplete: "organization-title" },
        { name: "email", label: "Work email", type: "email", required: true, half: true, autoComplete: "email" },
        { name: "phone", label: "Phone", type: "tel", half: true, autoComplete: "tel" },
        { name: "interest", label: "Partnership interest", type: "select", required: true, options: [...corporateTiers.map((t) => t.name), "Employee / payroll giving", "Match funding for an appeal", "In-kind (solar, engineering, logistics)", "Not sure yet"] },
        { name: "message", label: "Tell us about your goals", type: "textarea", placeholder: "e.g. CSR focus areas, states where you operate, reporting requirements" },
      ]}
    />
  );
}
