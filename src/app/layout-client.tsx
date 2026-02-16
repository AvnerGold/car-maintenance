'use client';

import { AuthProvider } from "@/context/AuthContext";
import { CarProvider } from "@/context/CarContext";
import { ReactNode } from "react";

export function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CarProvider>
        {children}
      </CarProvider>
    </AuthProvider>
  );
}
