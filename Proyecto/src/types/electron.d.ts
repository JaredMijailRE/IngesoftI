declare global {
  interface Window {
    electronAPI: {
      auth: {
        login: (credentials: { login: string; password: string }) => Promise<{
          success: boolean
          user?: any
          error?: string
        }>
        signup: (userData: {
          email: string
          username: string
          firstnames: string
          lastnames: string
          password: string
          birth_date?: string
          gender?: string
          medical_conditions?: string
        }) => Promise<{
          success: boolean
          user?: any
          error?: string
          message?: string
        }>
        logout: () => Promise<{ success: boolean }>
        check: () => Promise<{ isAuthenticated: boolean; user?: any }>
        getCurrentUser: () => Promise<any>
      }
      api: {
        request: (
          config: any
        ) => Promise<{ success: boolean; data?: any; error?: string }>
        get: (url: string, config?: any) => Promise<any>
        post: (url: string, data?: any, config?: any) => Promise<any>
        put: (url: string, data?: any, config?: any) => Promise<any>
        delete: (url: string, config?: any) => Promise<any>
      }
      storage: {
        get: (key: string) => Promise<any>
        set: (key: string, value: any) => Promise<{ success: boolean }>
        remove: (key: string) => Promise<{ success: boolean }>
        clear: () => Promise<{ success: boolean }>
      }
      app: {
        getVersion: () => Promise<string>
        openExternal: (url: string) => Promise<{ success: boolean }>
        sendMessage: (message: string) => Promise<{ success: boolean }>
      }
      events: {
        onAuthChange: (callback: (event: any, data: any) => void) => void
        onStorageChange: (callback: (event: any, data: any) => void) => void
        removeAllListeners: (channel: string) => void
      }
    }
  }
}

export {}
