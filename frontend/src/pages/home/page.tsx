import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useAuth } from '@/stores/use-auth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

export function Home() {
  const [transactions, setTransactions] = useState()
  const { logout, setAccessToken } = useAuth()

  async function fetchRecentsTransaction() {
    const response = await api.get('transactions/recents')

    setTransactions(response.data)
  }

  useEffect(() => {
    fetchRecentsTransaction()
  }, [])

  return (
    <>
      <span>
        {JSON.stringify(transactions, null, 2)}

        <Button
          onClick={() => {
            setAccessToken(null)
          }}
        >
          Limpar token
        </Button>
        <Button onClick={logout}>Sair</Button>

        <Button asChild>
          <Link to={'/dashboard'}>Dashboard</Link>
        </Button>
      </span>
    </>
  )
}
