import { supabase } from './supabaseClient'

async function handleLogin(email: string, password: string) 
{
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
    
  if (error) 
    alert(error.message)
  else 
    console.log('Usuário logado:', data.user)
}