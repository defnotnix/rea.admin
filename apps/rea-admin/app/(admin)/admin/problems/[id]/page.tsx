"use client";

import { ProblemDetail } from "@/modules/problems";

export default function ProblemDetailPage({ params }: { params: { id: string } }) {
  return <ProblemDetail id={params.id} />;
}
