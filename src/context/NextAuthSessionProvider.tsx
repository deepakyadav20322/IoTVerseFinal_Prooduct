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
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default NextAuthSessionProvider