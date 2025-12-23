"use client";

import { Button, Group } from "@mantine/core";
import { GoogleLogo } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../auth.store";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function GoogleSignInButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { loginWithGoogle } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Initialize Google Sign-In
    if (window.google && buttonRef.current) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          try {
            await loginWithGoogle(response.credential);
            router.push("/app");
          } catch (error) {
            console.error("Google sign-in failed:", error);
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        type: "standard",
        theme: "filled_black",
        size: "large",
        text: "continue_with",
        width: "100%",
      });
    }
  }, [loginWithGoogle, router]);

  return <div ref={buttonRef} />;
}
