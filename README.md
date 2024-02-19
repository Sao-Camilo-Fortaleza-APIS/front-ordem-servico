# Front-end Aplicação Ordem de Serviço

![image](https://github.com/myguelangello/front-ordem-servico/assets/42946156/93ba09e6-01a4-46d1-9db2-2ab9c8f5b8d5)

## **Observações**:
- A branch **main** é considerada a branch de **Produção** então muito cuidado ao realizar commits.
- É importante verificar antes de executar a aplicação se o arquivo **api.ts** aponta para a URL correta de produção assim como verificar se  a porta e o host estão configurados corretamente no script do package.json.

## Tecnologias Utilizadas

- [ReactJS](https://react.dev/) - Biblioteca Javascript para criação de interfaces do usuário
- [Styled-components](https://styled-components.com/) - Biblioteca de estilização que possibilita escrever códigos CSS dentro do JavaScript (CSS-in-JS).
- [Vitejs](https://vitejs.dev/) - Ferramenta de construção de apps que visa fornecer uma experiência de desenvolvimento mais rápida e enxuta para projetos web modernos

## Como Executar

1. Clone o repositório e acesse a pasta do projeto
   ```shell
   git clone https://github.com/myguelangello/front-ordem-servico.git
   cd front-ordem-servico
    ```
2. Instale os pacotes utilizando o comando `npm install` no terminal do diretório do projeto
3. Como executar em modo de desenvolvimento
   ```bash
   npm run dev
   ```
4. Como executar em modo de produção
   ```bash
   npm run dev
   ```
5. Variáveis de Ambiente: faça uma cópia do arquivo `.env` e altere para `.env.local` e adicione a URL da API.
