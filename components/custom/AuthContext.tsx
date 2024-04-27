import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react"
type Props = { children: ReactNode }

/** Auth Store Context */
export const AuthStoreContext = createContext<{ session: AuthStoreContextType, setSession: Dispatch<SetStateAction<AuthStoreContextType>> }>({ session: null, setSession: () => { } });
export type AuthStoreContextType = Session | null;

/** Auth Context Wrapper */
export const AuthContext = ({ children }: Props) => {
  // SESSION
  const [session, setSession] = useState<AuthStoreContextType>(null)

  // AUTH HANDLING
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const ProviderValue = {
    session,
    setSession,
  };

  return (
    <AuthStoreContext.Provider value={ProviderValue}>
      {children}
    </AuthStoreContext.Provider>
  )

}
