import { AuthShell } from '@account/components/ui';
import { LoginFormContainer } from '@account/components';
import Link from 'next/link';
import { safeReturnTo } from '@account/lib/return-to';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const returnTo = safeReturnTo((await searchParams).returnTo);
  return (
    <AuthShell title="Entrar" description="Acesse sua conta">
      <LoginFormContainer returnTo={returnTo} />
      <p className="mt-4 text-center text-sm">
        Ainda não tem conta?{' '}
        <Link
          className="text-primary underline"
          href={`/registro?returnTo=${encodeURIComponent(returnTo)}`}
        >
          Criar conta
        </Link>
      </p>
    </AuthShell>
  );
}
