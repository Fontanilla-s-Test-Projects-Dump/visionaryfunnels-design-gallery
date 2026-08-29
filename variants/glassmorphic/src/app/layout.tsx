import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://visionaryfunnels.com"),
  title: "VisionaryFunnels — Clearer operations, in glass",
  description:
    "Connected systems, automations, and practical AI for growing businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
