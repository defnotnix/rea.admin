import { Metadata } from "next";
import { LoginPageContainer } from "@/modules/auth/pages/LoginPage";

export const metadata: Metadata = {
  title: "Sign In | Nepal Ekikaran Abhiyan",
  description: "Sign in to your account to participate in discussions",
};

export default function LoginPage() {
  return <LoginPageContainer />;
}
