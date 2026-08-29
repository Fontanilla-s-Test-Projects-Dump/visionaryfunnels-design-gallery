import type { Metadata } from "next";
import { ConstructionPage } from "@/components/SkeuoSite";

export const metadata: Metadata = {
  title: "Site Tracking for Contractors — VisionaryFunnels",
  description:
    "An AI bridge from construction group chats to a tracked operational record.",
};

export default function Page() {
  return <ConstructionPage />;
}
