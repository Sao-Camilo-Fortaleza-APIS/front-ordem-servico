import { Container, ContainerImage, SignInForm } from "./SignIn.styles";

export function SignIn() {
    return (
        <Container>
            <ContainerImage>
                <img src="/assets/logo_horizontal.png" alt="" />
            </ContainerImage>

            <SignInForm>
                <span>Acesse suas Ordens</span>

                <form>
                    <input type="text" placeholder="Usuário" />

                    <button type="submit">Entrar</button>
                </form>
            </SignInForm>

        </Container>
    )
}