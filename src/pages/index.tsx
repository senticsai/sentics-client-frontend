// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

const Home = () => {
  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    router.replace('/dashboard')
  }, [])

  return <Spinner />
}

export default Home
