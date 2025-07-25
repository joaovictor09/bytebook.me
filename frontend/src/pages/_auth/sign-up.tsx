import { createFileRoute } from '@tanstack/react-router'

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

function RouteComponent() {
  return <div>Hello "/_auth/sign-up"!</div>
}
