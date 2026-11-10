import type { Metadata } from "next";
import { MembershipForm } from "@/components/membership-form";
import { PageIntro } from "@/components/sections";

export const metadata: Metadata = { title: "Membership Application" };

export default function ApplyPage() {
  return <>
    <PageIntro eyebrow="Join the Brotherhood" title="Membership Application" intro="Tell us about yourself and why you would like to join." />
    <section id="membership-application" className="section">
      <div className="container application-container">
        <MembershipForm />
      </div>
    </section>
  </>;
}
