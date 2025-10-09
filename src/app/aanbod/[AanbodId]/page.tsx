import ClientAanbodPage from "./ClientAanbodPage";
export default async function Page({
  params,
}: {
  params: Promise<{ AanbodId: string }>;
}) {
  const { AanbodId } = await params;
  return <ClientAanbodPage aanbodId={AanbodId} />;
}
