"use client";

import { EditProblem } from "@/modules/problems";

export default function EditProblemPage({ params }: { params: { id: string } }) {
  return <EditProblem id={params.id} />;
}
