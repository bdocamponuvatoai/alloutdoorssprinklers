"use client";

import { useRef, useState, type FormEvent, type RefObject } from "react";
import { flushSync } from "react-dom";
import { Icon } from "@/components/ui/icon";
import { site } from "@/config/site";
import type { ServiceOption } from "@/content/services";
import {
  DEFAULT_DETAILS,
  ENQUIRY_FILENAME,
  enquiryBody,
  enquiryMailto,
  type EnquiryPreset,
  type EnquiryValues,
} from "@/lib/enquiry";

type Step = "details" | "review";

type ContactFormProps = {
  preset: EnquiryPreset;
  services: readonly ServiceOption[];
};

function readValues(form: HTMLFormElement): EnquiryValues {
  const data = new FormData(form);
  const read = (name: keyof EnquiryValues) => String(data.get(name) ?? "").replace(/\r\n?/g, "\n");
  return {
    service: read("service"),
    city: read("city"),
    details: read("details"),
    name: read("name"),
    email: read("email"),
    phone: read("phone"),
  };
}

function downloadText(text: string, filename: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Two-step enquiry: details, then review. Both steps stay mounted (one is
 * `hidden`) so entries survive "Edit details". Nothing is sent anywhere: the
 * review step offers an email draft (`mailto:`) and a text download.
 */
export function ContactForm({ preset, services }: ContactFormProps) {
  const [step, setStep] = useState<Step>("details");
  const [service, setService] = useState(preset.service);
  const [enquiry, setEnquiry] = useState<EnquiryValues | null>(null);
  const detailsHeading = useRef<HTMLHeadingElement>(null);
  const reviewHeading = useRef<HTMLHeadingElement>(null);

  function goTo(next: Step, heading: RefObject<HTMLHeadingElement | null>) {
    flushSync(() => setStep(next));
    heading.current?.focus();
    heading.current?.scrollIntoView({ block: "start", behavior: "auto" });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setEnquiry(readValues(form));
    goTo("review", reviewHeading);
  }

  const label = services.find((s) => s.slug === enquiry?.service)?.name ?? "General enquiry";
  const body = enquiry ? enquiryBody(enquiry, label) : "";

  return (
    <div className="contact-form">
      <div className="form-progress">
        <span className={step === "details" ? "active" : undefined}>01 Your outdoors</span>
        <i />
        <span className={step === "review" ? "active" : undefined}>02 Review & send</span>
      </div>

      <form hidden={step !== "details"} onSubmit={handleSubmit}>
        <h2 ref={detailsHeading} tabIndex={-1}>
          What can we help with?
        </h2>
        <p className="form-intro">
          Create a short enquiry, then open it in your email app to send to John.
        </p>
        <fieldset>
          <legend>Choose a service</legend>
          <div className="service-choices">
            {services.map((option) => (
              <label key={option.slug} className={service === option.slug ? "selected" : undefined}>
                <input
                  type="radio"
                  name="service"
                  value={option.slug}
                  checked={service === option.slug}
                  onChange={() => setService(option.slug)}
                />
                <span>{option.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="field">
          City and ZIP code <span>(required)</span>
          <input
            name="city"
            required
            maxLength={100}
            autoComplete="address-level2"
            placeholder="e.g. Little Rock, 72227"
          />
        </label>
        <label className="field">
          Tell us a little about it
          <textarea
            name="details"
            rows={4}
            maxLength={2500}
            defaultValue={preset.details}
            placeholder="What are you noticing? What would you like to plan?"
          />
        </label>
        <div className="field-pair">
          <label className="field">
            Your name <span>(required)</span>
            <input name="name" required autoComplete="name" maxLength={100} />
          </label>
          <label className="field">
            Email address <span>(required)</span>
            <input name="email" required type="email" autoComplete="email" maxLength={150} />
          </label>
        </div>
        <label className="field">
          Phone number <span>(optional)</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={30} />
        </label>
        <button className="button button-dark" type="submit">
          {"Review my enquiry "}
          <Icon name="arrow" />
        </button>
        <p className="form-note">
          Nothing is sent at this step. Your entries stay in this page until you choose to send them
          from your email app.
        </p>
      </form>

      <div className="review-panel" hidden={step !== "review"}>
        <h2 ref={reviewHeading} tabIndex={-1}>
          Your enquiry is ready.
        </h2>
        <p>
          Review the details below. Open your email app to send them to John, or download a copy.
        </p>
        {enquiry && (
          <>
            <dl>
              <div>
                <dt>Service</dt>
                <dd>{label}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{enquiry.city}</dd>
              </div>
              <div>
                <dt>Your details</dt>
                <dd>
                  {enquiry.name}
                  <br />
                  {enquiry.email}
                  {enquiry.phone && (
                    <>
                      <br />
                      {enquiry.phone}
                    </>
                  )}
                </dd>
              </div>
              <div>
                <dt>About your outdoors</dt>
                <dd className="preserve-lines">{enquiry.details || DEFAULT_DETAILS}</dd>
              </div>
            </dl>
            <a className="button button-dark" href={enquiryMailto(site.email, label, body)}>
              {"Open my email app "}
              <Icon name="arrow" />
            </a>
            <div className="review-options">
              <button
                type="button"
                className="text-link"
                onClick={() => downloadText(body, ENQUIRY_FILENAME)}
              >
                Download a copy ↓
              </button>
              <button
                type="button"
                className="text-link"
                onClick={() => goTo("details", detailsHeading)}
              >
                Edit details
              </button>
            </div>
          </>
        )}
        <p className="form-note">
          Your enquiry has not been sent. Confirm and send it in your email app. Appointment
          availability is confirmed directly with John.
        </p>
      </div>
    </div>
  );
}
