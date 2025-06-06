import ClientAanbodPage from "./ClientAanbodPage";

export default function Page({ params }: { params: { aanbodId: string } }) {
  return <ClientAanbodPage aanbodId={params.aanbodId} />;}