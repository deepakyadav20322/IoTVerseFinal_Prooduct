"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface NextAuthSessionProviderProps{
  children: React.ReactNode
}

 function NextAuthSessionProvider({
  children
} : NextAuthSessionProviderProps) {
  return (
    <SessionProvider basePath='https://iot-verse-final-prooduct.vercel.app/api/auth/'>
      {children}
    </SessionProvider>
  )
}

export default NextAuthSessionProvider