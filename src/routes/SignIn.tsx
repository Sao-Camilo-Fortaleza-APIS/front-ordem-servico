import { Container, ContainerImage, SignInForm } from "../Styles/SignIn.styles";

export function SignIn() {
    return (
        <>
            <Container>
                <ContainerImage>
                    <img src="/assets/logo_horizontal.png" alt="" />
                </ContainerImage>

                <SignInForm>
                    <span>Acesse sua conta</span>

                    <form>
                        <input name="user-tasy" type="text" placeholder="Usuário do Tasy" required />

                        <button type="submit">Entrar</button>
                    </form>
                </SignInForm>

            </Container>
        </>
    )
}