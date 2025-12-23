import { LayoutApp } from "@/layouts/app";
// import { ProtectedRoute } from "@/modules/auth/components/ProtectedRoute";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    // TODO: Re-enable ProtectedRoute after testing
    <LayoutApp>{children}</LayoutApp>
    // <ProtectedRoute>
    //   <LayoutApp>{children}</LayoutApp>
    // </ProtectedRoute>
  );
}
