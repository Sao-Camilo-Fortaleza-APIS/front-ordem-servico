import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounceValue from "../hooks/useDebounceValue";
import api from "../services/api";
import { Container, ContainerImage, SignInForm } from "../styles/SignIn.styles";
import { Button } from "../components/Button";
import { Loader } from "lucide-react";

export function SignIn() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    const debouncedUser = useDebounceValue(user, 500);

    const { data: ordersResponse, refetch, isFetching } = useQuery({
        queryKey: ['user', debouncedUser],
        queryFn: async () => {
            const response = await api.get(`/get/order_user/executor/${debouncedUser}`)
            const data = await response.data

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

        /*  refetch().then(() => { */
        navigate(`/ordens?executor=${debouncedUser}`)
        /*    }) */
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
                        <div>

                            <input
                                name="user-tasy"
                                type="text"
                                placeholder="Usuário do Tasy"
                                onChange={e => setUser(e.target.value)}
                                value={user}
                                required
                            />

                            <input
                                name="password-tasy"
                                type="password"
                                placeholder="Senha do Tasy"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>

                        <Button type="submit" disabled={isFetching}>
                            {isFetching && <Loader className="animate-spin" />}
                            {!isFetching && 'Entrar'}
                        </Button>
                    </form>
                </SignInForm>

            </Container>
        </>
    )
}