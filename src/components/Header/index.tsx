import { HeaderContainer, ImageBanner, Logo } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <ImageBanner>
      </ImageBanner>
      <Logo>
        <img src="..\src\Images\logo_horizontal.png" alt="" width={250} />
      </Logo>
    </HeaderContainer>
  )
}
