"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { membershipFields, validateMembership } from "@/lib/membership";

type Errors = ReturnType<typeof validateMembership>["errors"];

export function MembershipForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const [pending, setPending] = useState(false);
  const retry = useRef<{ payload: string; applicationId: string }>(null);
  const busy = useRef(false);
  const success = useRef<HTMLHeadingElement>(null);

  function showErrors(form: HTMLFormElement, issues: Errors) {
    setErrors(issues);
    setMessage("Review the highlighted fields.");
    requestAnimationFrame(() => {
      const first = form.elements.namedItem(Object.keys(issues)[0]);
      if (first instanceof HTMLElement) first.focus();
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    const privacyAcknowledged = fields.has("privacyAcknowledged");
    const { values, errors: validationErrors } = validateMembership({
      ...Object.fromEntries(fields),
      privacyAcknowledged,
    });
    if (Object.keys(validationErrors).length) {
      showErrors(form, validationErrors);
      return;
    }

    setErrors({});
    setMessage("");
    busy.current = true;
    setPending(true);
    try {
      const payload = { ...values, privacyAcknowledged };
      const serialized = JSON.stringify(payload);
      if (retry.current?.payload !== serialized) {
        retry.current = { payload: serialized, applicationId: crypto.randomUUID() };
      }

      const applicationId = retry.current.applicationId;
      const response = await fetch("/api/membership/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, applicationId }),
      });
      const result = await response.json();

      if (response.ok && result.applicationId === applicationId) {
        setReference(applicationId);
        requestAnimationFrame(() => success.current?.focus());
      } else if (response.status === 422 && result.errors) {
        showErrors(form, result.errors);
      } else {
        setMessage(result.message || "We could not confirm receipt. Please retry.");
      }
    } catch {
      setMessage("We could not confirm receipt. Your details are still in the form. Please retry.");
    } finally {
      busy.current = false;
      setPending(false);
    }
  }

  if (reference) {
    return <div className="notice" role="status">
      <h2 ref={success} tabIndex={-1}>Application received</h2>
      <p>Your application was recorded for review. Keep this reference for your records.</p>
      <p className="application-reference">{reference}</p>
    </div>;
  }

  return <form className="membership-form" method="post" onSubmit={submit} noValidate aria-busy={pending}>
    <fieldset disabled={pending}>
      <legend>Applicant details</legend>
      <p className="membership-form-hint">Fields are required unless marked optional.</p>
      <div className="membership-fields">
        {membershipFields.map((definition) => {
          const field = { type: "text", optional: false, autoComplete: undefined, ...definition };
          const error = errors[definition.name];
          const props = {
            id: field.name,
            name: field.name,
            required: !field.optional,
            "aria-invalid": Boolean(error),
            "aria-describedby": error ? field.name + "-error" : undefined,
          };
          return <div key={field.name} className={field.type === "textarea" ? "membership-field-wide" : undefined}>
            <label htmlFor={field.name}>{field.label}{field.optional && " (optional)"}</label>
            {field.type === "textarea"
              ? <textarea {...props} maxLength={field.maxLength} rows={4} />
              : <input {...props} type={field.type} autoComplete={field.autoComplete}
                  maxLength={field.type === "number" ? undefined : field.maxLength}
                  min={field.type === "number" ? 1 : undefined} max={field.type === "number" ? 120 : undefined} />}
            {error && <p className="field-error" id={field.name + "-error"}>{error}</p>}
          </div>;
        })}
      </div>
      <div className="membership-privacy">
        <p>Read the <Link href="/privacy/" target="_blank" rel="noopener">application privacy notice</Link> (opens in a new tab).</p>
        <label><input name="privacyAcknowledged" type="checkbox" required
          aria-invalid={Boolean(errors.privacyAcknowledged)}
          aria-describedby={errors.privacyAcknowledged ? "privacy-error" : undefined} />
          <span>I have read the notice and understand that my details will be stored in Google Sheets for membership review.</span>
        </label>
        {errors.privacyAcknowledged && <p id="privacy-error" className="field-error">{errors.privacyAcknowledged}</p>}
      </div>
      <button className="button button-gold" type="submit">{pending ? "Submitting…" : "Submit Application"}</button>
    </fieldset>
    {message && <p className="field-error" role="alert">{message}</p>}
    <noscript><p>Enable JavaScript to submit this form.</p></noscript>
  </form>;
}
