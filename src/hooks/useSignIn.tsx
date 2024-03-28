import { useMutation } from "@tanstack/react-query";
import api from "../services/api";

import { SignInForm } from "../routes/SignIn";
import { queryClient } from "../services/react-query";

async function signIn({ user, password }: SignInForm) {
  const response = await api.post('/login', { user, password })
  return response.data
}

export function useSignIn() {
  const { mutateAsync: signInMutation } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      })
      queryClient.setQueryData(['user', data.user], data)
    }
  })

  return signInMutation
}