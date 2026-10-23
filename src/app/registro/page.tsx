import { AuthShell } from '@account/components/ui';
import { RegisterFormContainer } from '@account/components';
import Link from 'next/link';
import { safeReturnTo } from '@account/lib/return-to';

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const returnTo = safeReturnTo((await searchParams).returnTo);
  return (
    <AuthShell title="Criar conta" description="Cadastre-se para continuar">
      <RegisterFormContainer returnTo={returnTo} />
      <p className="mt-4 text-center text-sm">
        Já tem conta?{' '}
        <Link
          className="text-primary underline"
          href={`/login?returnTo=${encodeURIComponent(returnTo)}`}
        >
          Entrar
        </Link>
      </p>
    </AuthShell>
  );
}
