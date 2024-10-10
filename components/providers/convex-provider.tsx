"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
  // Verificar que las variables de entorno estén definidas
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    console.error("Falta la clave pública de Clerk.");
    return null;
  }

  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    console.error("Falta la URL de Convex.");
    return null;
  }

  // Chequear si estamos en el cliente
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      onError={(error: any) => {
        console.error("Error de inicialización de Clerk:", error);
      }}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
