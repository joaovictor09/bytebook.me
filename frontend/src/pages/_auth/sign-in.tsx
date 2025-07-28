import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { signIn } from '@/api/sign-in'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const signInSearchSchema = z.object({
  username: z.string().optional(),
})

export const Route = createFileRoute('/_auth/sign-in')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Sign-in | bytebook.me',
      },
    ],
  }),
  validateSearch: (search) => signInSearchSchema.parse(search),
})

const signInForm = z.object({
  username: z.string().min(4),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { username } = Route.useSearch()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      username,
    },
  })

  const { mutateAsync: authenticate } = useMutation({ mutationFn: signIn })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ username: data.username, password: data.password })

      navigate({
        to: '/',
      })
    } catch (error) {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <div className="p-8">
      <Button variant={'ghost'} asChild className="absolute right-8 top-8">
        <Link to={'/sign-up'}>Criar conta</Link>
      </Button>

      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center ">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar comunidade
          </h1>
          <p className="text-sm text-muted-foreground">
            Acesse nossa comunidade focada em tech
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Seu nome de usuário</Label>
            <Input
              id="username"
              type="username"
              placeholder="Seu username"
              {...register('username')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              {...register('password')}
            />
          </div>

          <Button disabled={isSubmitting} type="submit" className="w-full">
            Acessar painel
          </Button>
        </form>
      </div>
    </div>
  )
}
