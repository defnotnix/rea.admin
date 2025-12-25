import { EditAgenda } from "../../../../modules/agenda";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <EditAgenda id={id} />;
}
