import { ReservationDetail } from '@booking/components/ReservationDetail';

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ reservationId: string }>;
}) {
  const { reservationId } = await params;
  return <ReservationDetail id={reservationId} />;
}
