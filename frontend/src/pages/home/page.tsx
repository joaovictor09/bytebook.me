import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useAuth } from '@/stores/use-auth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

export function Home() {
  const [transactions, setTransactions] = useState()
  const { logout } = useAuth()

  async function fetchRecentsTransaction() {
    const response = await api.get('/communities/search')

    setTransactions(response.data)
  }

  useEffect(() => {
    fetchRecentsTransaction()
  }, [])

  return (
    <>
      <span>
        {JSON.stringify(transactions, null, 2)}

        <Button onClick={logout}>Sair</Button>

        <Button asChild>
          <Link to={'/dashboard'}>Dashboard</Link>
        </Button>
      </span>
    </>
  )
}
