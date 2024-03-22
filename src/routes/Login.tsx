import { useState } from "react";
import api from "../services/api";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoginSchema, useSignIn } from "../hooks/useSignIn";
import { toast } from "react-toastify";



export function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const signInMutation = useSignIn()


  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      signInMutation({ user, password });
    } catch (error) {
      console.error('Erro durante o login:', error);
    }
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input name="user_tasy" value={user} onChange={(e) => setUser(e.currentTarget.value)} type="text" placeholder="Usuário" />
        <input name="password_tasy" value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="text" placeholder="Password" />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
