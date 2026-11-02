"use client";

import { SimpleForm } from "@/components/ui/simple-form";
import { programmes } from "@/mock/programmes";
import { projects } from "@/mock/projects";

export function ProposalForm() {
  return (
    <SimpleForm
      id="proposal"
      submitLabel="Submit concept note"
      successTitle="Concept note received"
      successText="Thank you. Our Head of Partnerships will acknowledge within two working days and, if there’s a fit, propose a call within two weeks. Our full due-diligence pack will be shared with you."
      note="We respond to every enquiry. Nothing is sent from this demo."
      fields={[
        { name: "organisation", label: "Organisation", type: "text", required: true, half: true, autoComplete: "organization" },
        { name: "orgType", label: "Organisation type", type: "select", required: true, half: true, options: ["Private / family foundation", "Development agency / bilateral", "Multilateral / UN agency", "Corporate (CSR)", "Trust / pooled fund", "Diaspora network", "Government", "Other"] },
        { name: "contact", label: "Your name", type: "text", required: true, half: true, autoComplete: "name" },
        { name: "role", label: "Role / title", type: "text", half: true, autoComplete: "organization-title" },
        { name: "email", label: "Work email", type: "email", required: true, half: true, autoComplete: "email" },
        { name: "phone", label: "Phone", type: "tel", half: true, autoComplete: "tel" },
        { name: "programme", label: "Programme interest", type: "select", required: true, half: true, options: [...programmes.map((p) => p.title), "Core / unrestricted support", "Monitoring, evaluation & learning", ...projects.map((p) => `Project: ${p.title}`)] },
        { name: "budget", label: "Indicative budget range", type: "select", required: true, half: true, options: ["Under ₦5m", "₦5m – ₦30m", "₦30m – ₦150m", "₦150m – ₦500m", "Over ₦500m", "Not yet determined"] },
        { name: "timeline", label: "Preferred start", type: "select", required: true, half: true, options: ["Within 3 months", "3 – 6 months", "6 – 12 months", "Next funding cycle", "Flexible"] },
        { name: "duration", label: "Grant duration", type: "select", half: true, options: ["Under 12 months", "1 – 2 years", "2 – 3 years", "3 – 5 years"] },
        { name: "fundingType", label: "Funding type", type: "select", half: true, options: ["Restricted (project)", "Restricted (programme)", "Unrestricted / core", "Match funding", "In-kind"] },
        { name: "geography", label: "Geographic focus", type: "select", half: true, options: ["Any of our four states", "Oyo", "Kwara", "Niger", "Plateau"] },
        { name: "summary", label: "Concept summary", type: "textarea", required: true, placeholder: "Your objectives, any outcomes or indicators you need us to report against, and reporting requirements.", hint: "A few paragraphs is plenty. We can send our standard concept-note template if helpful." },
        { name: "diligence", label: "Please send our due-diligence pack with the acknowledgement", type: "checkbox" },
        { name: "consent", label: "I agree that Ìrètí Foundation may store these details to respond to this enquiry (NDPA 2023).", type: "checkbox", required: true },
      ]}
    />
  );
}
