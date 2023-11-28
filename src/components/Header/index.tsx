import { HeaderContainer, ImageBanner, Logo } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <ImageBanner>
      </ImageBanner>
      <Logo>
        <img src="\assets\logo_horizontal.png" alt="" width={250} />
      </Logo>
    </HeaderContainer>
  )
}
