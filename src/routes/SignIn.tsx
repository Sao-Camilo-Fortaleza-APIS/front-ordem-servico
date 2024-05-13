import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { BaseSyntheticEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from 'zod';
import { Button } from "../components/Button";
import api from "../services/api";
import { Container, ContainerImage, SignInForm } from "../styles/SignIn.styles";
import { configToastError } from "../utils/toast-config";

// Essa constante é um schema de validação para os campos do formulário
const signInForm = z.object({
    user: z.string({ required_error: 'O campo usuário é obrigatório' }).min(2, { message: 'O campo usuário deve ter no mínimo 2 caracteres' }),
    password: z.string({ required_error: 'O campo senha é obrigatório' }).min(3, { message: 'O campo senha deve ter no mínimo 3 caracteres' }),
})
/**
 * Aqui estamos inferindo o tipo do schema de validação, para dizer quais são os tipos dos campos do formulário
 * Inferir é o mesmo que dizer que aquele é o tipo esperado
 */
export type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState } = useForm<SignInForm>({
        resolver: zodResolver(signInForm), // Aqui passamos o schema de validação para o useForm
    });

    async function signIn({ user, password }: SignInForm) {
        const response = await api.post('/login', { user, password }, {
            timeout: 60000, // 1 minuto em ms
        })
        return response.data
    }

    const { mutateAsync: authenticate } = useMutation({
        mutationFn: signIn,
        mutationKey: ['authenticate'],
        onSuccess: ({ token, user }) => {
            try {
                Cookies.set('exec.token', token)
                Cookies.set('user', user)
            } catch (error) {
                toast.error('Erro ao salvar informações de autenticação', configToastError)
            }
            navigate('/ordens/minhas')
        },
        onError: (error: AxiosError) => {
            console.error(error);
            if (error.code === 'ECONNABORTED') {
                toast.error('O servidor demorou muito para responder, tente novamente mais tarde', configToastError)
                return
            } if (error.response?.status === 401) {
                toast.error('Usuário ou senha inválidos', configToastError)
                return
            }
        },
    })

    async function handleSignIn(data: SignInForm, event?: BaseSyntheticEvent | undefined) {
        event?.preventDefault()
        await authenticate({ user: data.user, password: data.password })
    }

    useEffect(() => {
        // verificar se usuário já está logado
        const token = Cookies.get('exec.token')
        if (token) {
            navigate('/ordens/minhas')
        }
    }, [])

    return (
        <Container>
            <ContainerImage>
                <img src="/assets/logo_horizontal.png" alt="" />
            </ContainerImage>

            <SignInForm>
                <span>Acesse sua conta</span>

                <form onSubmit={handleSubmit(handleSignIn)}>
                    <div>
                        {/* <Label htmlFor="user">Usuário do Tasy</Label> */}
                        <input
                            {...register('user')}
                            id="user"
                            type="text"
                            placeholder="Usuário do Tasy"
                            required
                            autoComplete="off"
                            autoFocus
                        />
                        {formState.errors.user && <span>{formState.errors.user.message}</span>}

                        {/* <Label htmlFor="password">Senha</Label> */}
                        <input
                            {...register('password')}
                            id="password"
                            type="password"
                            placeholder="Senha do Tasy"
                        />
                        {formState.errors.password && <span>{formState.errors.password.message}</span>}
                    </div>

                    <Button type="submit" disabled={formState.isSubmitting}>
                        {formState.isSubmitting ? <Loader className="animate-spin" /> : 'Entrar'}
                    </Button>
                </form>
            </SignInForm>

        </Container >
    )
}