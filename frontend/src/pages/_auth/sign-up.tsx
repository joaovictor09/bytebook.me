import { signUp } from '@/api/sign-up'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { isAxiosError } from 'axios'

export const Route = createFileRoute('/_auth/sign-up')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Sign-up | bytebook.me',
      },
    ],
  }),
})

const signUpForm = z.object({
  name: z.string(),
  username: z.string().min(4),
  password: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

function RouteComponent() {
  const navigate = Route.useNavigate()

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })

  const { mutateAsync: register } = useMutation({ mutationFn: signUp })

  async function handleSignIn(data: SignUpForm) {
    try {
      const { name, username, password } = data
      await register({ name, username, password })

      navigate({
        to: '/sign-in',
        search: {
          username,
        },
      })
    } catch (error) {
      if (isAxiosError(error)) {
        let message: string
        switch (error.status) {
          case 409:
            message = 'Usuário já existe'
            break

          default:
            message = 'Erro desconhecido'
            break
        }

        toast.error(message)
      }
    }
  }

  return (
    <div className="p-8">
      <Button variant={'ghost'} asChild className="absolute right-8 top-8 ">
        <Link to={'/sign-up'}>Acessar conta</Link>
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Java Scripto da Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu nome de usuário</FormLabel>
                  <FormControl>
                    <Input placeholder="javascripto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sua senha</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full"
            >
              Criar conta
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
