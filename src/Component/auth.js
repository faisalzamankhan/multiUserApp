import { useEffect } from 'react'
import Router from 'next/router'

const useAuth = () => {
  useEffect(() => {
    if (!localStorage.getItem('token')) {
        console.log(localStorage.getItem('token'))
      Router.push('/')
    }
  }, [])
}

export default useAuth