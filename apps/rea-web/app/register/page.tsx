import { Metadata } from "next";
import { RegisterPageContainer } from "@/modules/auth/pages/RegisterPage";

export const metadata: Metadata = {
  title: "Register | Nepal Ekikaran Abhiyan",
  description: "Create an account to participate in democratic discussions",
};

export default function RegisterPage() {
  return <RegisterPageContainer />;
}
