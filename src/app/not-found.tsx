import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center px-4">
      <div className="text-center">
        <Dumbbell className="w-16 h-16 text-[#00FF00] mx-auto mb-6" />
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
        <p className="text-white/60 mb-8">
          A página que você está procurando não existe.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#00FF00] text-[#0D0D0D] font-bold rounded-xl hover:scale-105 transition-all duration-300"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
