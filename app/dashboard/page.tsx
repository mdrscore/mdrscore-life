import type { Metadata } from "next";
import DashboardScreen from "./DashboardScreen";

export const metadata: Metadata = {
  title: "Dashboard | MDRScore",
  description: "Pusat kontrol aktivitas dan perkembangan diri Anda.",
};

export default function Page() {
  return <DashboardScreen />;
}