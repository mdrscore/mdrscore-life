import type { Metadata } from "next";
import LoginScreen from "./LoginScreen";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun Anda.",
};

export default function Page() {
  return <LoginScreen />;
}