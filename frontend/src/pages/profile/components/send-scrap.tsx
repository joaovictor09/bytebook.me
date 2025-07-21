import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useSendScrap } from '@/mutations/scraps/use-send-scrap'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

interface SendScrapProps {
  userId: string
}

const formSchema = z.object({
  message: z.string().min(4),
})

type FormSchema = z.infer<typeof formSchema>

export function SendScrap({ userId }: SendScrapProps) {
  const { mutateAsync, isPending } = useSendScrap()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  async function handleSendScrap(data: FormSchema) {
    toast.promise(
      mutateAsync({
        message: data.message,
        recipientId: userId,
      }),
      {
        loading: 'Enviando...',
        success: 'Recado enviado com sucesso',
        error: 'Houve um erro ao envar',
        finally: () => {
          form.reset({
            message: '',
          })
        },
      },
    )
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSendScrap)}>
        <FormField
          disabled={isPending}
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deixar um recado:</FormLabel>
              <FormControl>
                <Textarea
                  className="w-full"
                  rows={3}
                  placeholder="Escreva sua mensagem..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending ? 'Enviando' : 'Enviar Recado'}
        </Button>
      </form>
    </Form>
  )
}
