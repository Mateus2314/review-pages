import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Sparkles, Library, Quote } from 'lucide-react';
import { getStoredUser } from '../services/auth';

export default function HomePage() {
  const user = getStoredUser();

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07051A] via-[#1A1040] to-[#0F172A] px-6 py-24 lg:py-36">
        <div className="absolute -left-40 -top-40 w-[600px] h-[600px] rounded-full bg-[#2D1B69] opacity-20 blur-3xl" />
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-[#4C1D95] opacity-10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-950/50 border border-purple-900/30 rounded-full px-4 py-1.5 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs text-purple-400 font-medium tracking-wide">Plataforma de resenhas e análises</span>
          </div>

          <h1 className="font-serif text-5xl lg:text-7xl text-white font-bold leading-tight">
            Review Pages
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 mt-6 max-w-2xl mx-auto leading-relaxed font-light">
            Registre e analise suas leituras. Livros, artigos, papers — tudo em um só lugar.
          </p>
          <div className="flex items-center justify-center gap-4 mt-10">
            <Link
              to="/readings"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-500 transition-all hover:shadow-lg hover:shadow-purple-600/25"
            >
              Explorar leituras
              <ArrowRight className="w-4 h-4" />
            </Link>
            {!user && (
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-white/5 text-slate-200 px-6 py-3 rounded-xl font-medium hover:bg-white/10 border border-white/10 transition-all"
              >
                Criar conta
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              icon: BookOpen,
              title: 'Leituras',
              desc: 'Catalogue livros e artigos com notas, avaliações e tags para organizar sua biblioteca pessoal.',
              link: '/readings',
              cta: 'Ver leituras'
            },
            {
              icon: Library,
              title: 'Capítulos',
              desc: 'Acompanhe conteúdo extraído de livros, capítulo por capítulo, com resenhas e análises detalhadas.',
              link: '/books/1',
              cta: 'Ver exemplo'
            },
            {
              icon: Quote,
              title: 'Comunidade',
              desc: 'Compartilhe suas impressões, curta e comente as leituras de outros usuários.',
              link: user ? '/dashboard' : '/register',
              cta: user ? 'Dashboard' : 'Participar'
            }
          ].map(f => (
            <div key={f.title} className="text-center">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <f.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-serif text-xl text-slate-900 font-bold mb-3">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{f.desc}</p>
              <Link to={f.link} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1 transition-colors">
                {f.cta} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#1A1040] to-[#07051A] px-6 py-20 lg:py-24 text-center">
        <Quote className="w-8 h-8 text-purple-600 mx-auto mb-6" />
        <blockquote className="max-w-2xl mx-auto">
          <p className="font-serif text-2xl text-slate-200 italic leading-relaxed font-light">
            "Ler é uma forma de viajar sem sair do lugar. Resenhar é uma forma de levar outros viajantes com você."
          </p>
        </blockquote>
      </section>
    </div>
  );
}
