import Link from 'next/link';
import { RequireAuth } from '@account/components/RequireAuth';
import { Button } from '@components/ui/button';

export default function ReservationsPage() {
  return <RequireAuth><main className="mx-auto max-w-2xl space-y-4 px-4 py-8">
    <h1 className="text-2xl font-semibold">Minhas reservas</h1>
    <p>As reservas de ingressos ainda não estão disponíveis nesta versão. Quando a funcionalidade for disponibilizada, você poderá acompanhar suas reservas aqui.</p>
    <Button asChild><Link href="/">Explorar espetáculos</Link></Button>
  </main></RequireAuth>;
}
