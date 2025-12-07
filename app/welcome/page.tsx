import type { Metadata } from "next";
import WelcomeScreen from "./WelcomeScreen";

export const metadata: Metadata = {
  title: "Selamat Datang",
  description: "Selamat datang di dashboard personal Anda.",
};

export default function Page() {
  return <WelcomeScreen />;
}