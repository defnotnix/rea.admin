import { AgendaDetail } from "../../../modules/agenda";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <AgendaDetail id={id} />;
}
