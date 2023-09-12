import { Header, ImageBanner, Logo } from "./styles";

export function HeaderComponent() {
  return (
    <Header>
      <ImageBanner>
      </ImageBanner>
      <Logo>
        <img src="..\src\Images\logo_horizontal.png" alt="" width={250} />
      </Logo>
    </Header>
  )
}
