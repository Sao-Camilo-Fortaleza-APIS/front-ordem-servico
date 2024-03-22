import { QueryClient, UseMutateFunction, useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export type LoginSchema = {
  user: string;
  password: string;
}

export interface User {
  accessToken: string;
  user: string;
}

async function signIn(user: string, password: string) {
  const response = await api.post('/login', { user, password })

  if (response.status !== 201) {
    return null
  }

  return response.data
}

type IUseSignIn = UseMutateFunction<User, unknown, {
  user: string;
  password: string;
}, unknown>

export function useSignIn(): IUseSignIn {
  const queryClient = new QueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()


  const { mutate: signInMutation } = useMutation<User, unknown, { user: string, password: string }, unknown>({
    mutationFn: async ({
      user,
      password
    }) => signIn(user, password),
    onSuccess: (data: User) => {
      // inserir o usuário no sessionStorage para manter o usuário logado




      queryClient.setQueryData(['user'], data)

      navigate(`/ordens?executor=${data.user}`)
    },
    onError: (err: any) => {
      toast.error("Aconteceu um erro", err.message)
      console.error(err);
    }
  })

  return signInMutation
}