import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Code, Users, GitBranch, Terminal, Zap, Heart } from 'lucide-react'
import { SignInForm } from './components/sign-in-form'

export function SignIn() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#2D3748] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Code className="w-8 h-8" />
              devkut
            </h1>
            <div className="text-sm">
              <span className="opacity-90">conecte • code • colabore</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Welcome Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#2D3748] mb-4">
                Bem-vindo ao devkut
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                A rede social nostálgica para desenvolvedores! Conecte-se com
                outros devs, compartilhe código, participe de discussões
                técnicas e cresça profissionalmente em uma comunidade
                acolhedora.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#2D3748] rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2D3748] mb-2">
                    Conecte-se com devs
                  </h3>
                  <p className="text-gray-600">
                    Encontre desenvolvedores com interesses similares, forme
                    parcerias e expanda sua rede profissional.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#2D3748] rounded-full flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2D3748] mb-2">
                    Compartilhe código
                  </h3>
                  <p className="text-gray-600">
                    Publique snippets, receba code reviews e colabore em
                    projetos open source com a comunidade.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#2D3748] rounded-full flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2D3748] mb-2">
                    Participe de grupos tech
                  </h3>
                  <p className="text-gray-600">
                    Junte-se a grupos especializados em suas tecnologias
                    favoritas e participe de discussões técnicas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#2D3748] rounded-full flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2D3748] mb-2">
                    Mostre seus projetos
                  </h3>
                  <p className="text-gray-600">
                    Exiba seu portfólio, receba feedback da comunidade e
                    descubra oportunidades de colaboração.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-semibold text-[#2D3748]">
                  Nostalgia + Tecnologia
                </span>
              </div>
              <p className="text-sm text-gray-700">
                Inspirado no clássico Orkut, o devkut traz de volta a
                simplicidade e o calor humano das redes sociais dos anos 2000,
                mas focado na comunidade de desenvolvimento!
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md border-[#E2E8F0] shadow-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-[#2D3748] mb-2 flex items-center justify-center gap-2">
                  <Code className="w-6 h-6" />
                  Entrar no devkut
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Entre e conecte-se com a comunidade dev
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <SignInForm />

                <div className="text-center space-y-3">
                  <a
                    href="#"
                    className="text-sm text-[#2D3748] hover:underline block"
                  >
                    Esqueceu sua senha?
                  </a>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Novo na comunidade?
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-[#2D3748] text-[#2D3748] hover:bg-[#2D3748] hover:text-white bg-transparent"
                    >
                      Criar conta de dev
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Ao entrar, você concorda com nosso{' '}
                    <a href="#" className="text-[#2D3748] hover:underline">
                      Código de Conduta
                    </a>{' '}
                    e{' '}
                    <a href="#" className="text-[#2D3748] hover:underline">
                      Política de Privacidade
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-8">
          <h3 className="text-center text-xl font-semibold text-[#2D3748] mb-8 flex items-center justify-center gap-2">
            <Zap className="w-6 h-6" />
            Junte-se à comunidade dev mais nostálgica do Brasil
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#2D3748] mb-2">50K+</div>
              <div className="text-sm text-gray-600">
                Desenvolvedores ativos
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#2D3748] mb-2">
                1.2K+
              </div>
              <div className="text-sm text-gray-600">Grupos tech</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#2D3748] mb-2">
                100K+
              </div>
              <div className="text-sm text-gray-600">Code snippets</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#2D3748] mb-2">25K+</div>
              <div className="text-sm text-gray-600">
                Projetos compartilhados
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Showcase */}
        <div className="mt-12 text-center">
          <h4 className="text-lg font-semibold text-[#2D3748] mb-6">
            Tecnologias populares na comunidade
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'JavaScript',
              'TypeScript',
              'React',
              'Vue.js',
              'Angular',
              'Node.js',
              'Python',
              'Java',
              'Go',
              'Rust',
              'PHP',
              'C#',
              'Swift',
              'Kotlin',
              'Docker',
              'Kubernetes',
              'AWS',
              'PostgreSQL',
              'MongoDB',
              'Redis',
            ].map((tech) => (
              <span
                key={tech}
                className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm hover:border-[#2D3748] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-[#2D3748] mb-3 flex items-center gap-2">
                <Code className="w-4 h-4" />
                devkut
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:underline">
                    Sobre o devkut
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog tech
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Open Source
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#2D3748] mb-3">Recursos</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:underline">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Code Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Tutoriais
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Status Page
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#2D3748] mb-3">Comunidade</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:underline">
                    Código de Conduta
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Diretrizes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Moderação
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Eventos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#2D3748] mb-3">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:underline">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Feedback
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Report Bug
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-500">
              © 2024 DevKut. Feito com ❤️ para a comunidade de desenvolvedores
              brasileiros.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
