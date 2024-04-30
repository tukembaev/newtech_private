import { useState } from 'react'

function useLoading(initialValue = false) {
  const [loading, setLoading] = useState(initialValue)

  const withLoading = async (asyncFunction) => {
    try {
      setLoading(true)
      await asyncFunction()
    } finally {
      setLoading(false)
    }
  }

  return { loading, withLoading }
}

export default useLoading
