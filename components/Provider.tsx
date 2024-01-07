"use client";

import { AuthProvider } from "@/context/auth";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
