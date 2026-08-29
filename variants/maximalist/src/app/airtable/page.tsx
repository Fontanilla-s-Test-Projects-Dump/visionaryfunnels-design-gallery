import type { Metadata } from "next";
import { AirtablePage } from "@/components/MaximalistSite";

export const metadata: Metadata = {
  title: "Custom Airtable Systems — VisionaryFunnels",
  description:
    "Custom Airtable systems, dashboards, and AI workflows that replace spreadsheets and manual handoffs.",
};

export default function Page() {
  return <AirtablePage />;
}
