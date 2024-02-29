import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Container, ContainerImage, SignInForm } from "../styles/SignIn.styles";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounceValue from "../hooks/useDebounceValue";

export function SignIn() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const [user, setUser] = useState("")

    const debouncedUser = useDebounceValue(user, 500);

    const { data: ordersResponse, refetch, isFetching } = useQuery({
        queryKey: ["get-orders", debouncedUser],
        queryFn: async () => {
            const response = await fetch(`http://localhost:4322/executors?executor=${debouncedUser}`)
            const data = await response.json()

            return data
        },
        placeholderData: keepPreviousData,
        enabled: false, // se false desabilita a pesquisa automática
    })

    async function handleSignIn(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setSearchParams(params => {
            params.set('executor', debouncedUser)

            return params
        })

        refetch().then(() => {
            navigate(`/ordens?executor=${debouncedUser}`)
        })
    }

    return (
        <>
            <Container>
                <ContainerImage>
                    <img src="/assets/logo_horizontal.png" alt="" />
                </ContainerImage>

                <SignInForm>
                    <span>Acesse sua conta</span>

                    <form onSubmit={handleSignIn}>
                        <input
                            name="user-tasy"
                            type="text"
                            placeholder="Usuário do Tasy"
                            onChange={e => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <button type="submit" disabled={isFetching}>
                            {isFetching && 'Carregando...'}
                            {!isFetching && 'Entrar'}
                        </button>
                    </form>
                </SignInForm>

            </Container>
        </>
    )
}