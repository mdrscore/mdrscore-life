import type { Metadata } from "next";
import RegisterScreen from "./RegisterScreen";

export const metadata: Metadata = {
  title: "Daftar Akun",
  description: "Buat akun baru.",
};

export default function Page() {
  return <RegisterScreen />;
}