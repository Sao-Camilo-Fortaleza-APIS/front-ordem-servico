import { useMutation } from "@tanstack/react-query";
import api from "../services/api";

import { SignInForm } from "../routes/SignIn";

async function signIn({ user, password }: SignInForm) {
  const response = await api.post('/login', { user, password })
  return response.data
}

export function useSignIn() {
  const { mutateAsync: signInMutation } = useMutation({
    mutationFn: signIn,
  })

  return signInMutation
}