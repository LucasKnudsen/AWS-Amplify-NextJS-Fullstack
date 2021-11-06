import Auth from '@aws-amplify/auth'
import { Hub } from '@aws-amplify/core'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { userState } from '../recoil/atoms'

interface Props {
  children: React.ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const setUser = useSetRecoilState(userState)

  useEffect(() => {
    Hub.listen('auth', () => {
      checkUser()
    })

    return () => Hub.remove('auth', () => null)
  }, [])

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser()
      if (amplifyUser) {
        setUser({ authenticated: true, username: amplifyUser.username })
        console.log('Found user')
      } else {
        setUser({ authenticated: false, username: '' })
      }
    } catch (error) {
      console.log('Auth error:', error)
      setUser({ authenticated: false, username: '' })
    }
    return () => Hub.remove('auth', () => null)
  }

  return <>{children}</>
}

export default MainLayout
