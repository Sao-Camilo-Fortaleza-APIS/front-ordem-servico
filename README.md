# Front-end Aplicação Ordem de Serviço

![image](https://github.com/myguelangello/front-ordem-servico/assets/42946156/93ba09e6-01a4-46d1-9db2-2ab9c8f5b8d5)

## **Observações**:
- A branch **main** é considerada a branch de **Produção** então muito cuidado ao realizar commits.
- É importante verificar antes de executar a aplicação se o arquivo **``api.ts``** aponta para a URL correta de produção assim como verificar se **PORT** e o **HOST** estão configurados corretamente no script no arquivo ``package.json``.

## Tecnologias Utilizadas

- [ReactJS](https://react.dev/) - Biblioteca Javascript para criação de interfaces do usuário
- [React Hook Form](https://react-hook-form.com/) - Biblioteca para gerenciamento de formulários
- [Styled-components](https://styled-components.com/) - Biblioteca de estilização que possibilita escrever códigos CSS dentro do JavaScript (CSS-in-JS).
- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/overview) - Biblioteca para gerenciamento de estado global
- [Tiptap Editor](https://tiptap.dev/) - Kit de ferramentas para construir editores de texto.
- [React Router Dom](https://reactrouter.com/en/main) - Biblioteca para uso de rotas no React
- [Radix UI](https://www.radix-ui.com/themes/docs/overview/getting-started) - Biblioteca de componentes prontos para uso sem estilização e com acessibilidade.
- [Axios](https://axios-http.com/ptbr/docs/intro) - Cliente HTTP para fazer requisições do front-end para o back-end
- [Vitejs](https://vitejs.dev/) - Ferramenta de construção de apps que visa fornecer uma experiência de desenvolvimento mais rápida e enxuta para projetos web modernos
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction) - Biblioteca para exibição de mensagens de alerta
- [Dayjs](https://day.js.org/) - Biblioteca para manipulação de datas
- [Lucide Icons](https://lucide.dev/guide/) - Biblioteca de ícones


## Como Executar

#### 1. Você precisa ter o [Node.js](https://nodejs.org/en/) e o [Git](https://git-scm.com/) instalados na sua máquina.
Para saber se o node e o git estão instalados, basta executar os comandos abaixo no terminal:
Se aparecer a versão do node e do git, significa que estão instalados corretamente.

   ```bash
   node -v
   git --version
   ```

#### 2. Clone o repositório e acesse a pasta do projeto
   ```bash
   git clone https://github.com/myguelangello/front-ordem-servico.git
   cd front-ordem-servico
   ```
#### 3. No terminal do diretório do projeto, instale os pacotes utilizando o comando `npm install` 

#### 4. Variáveis de Ambiente: faça uma cópia do arquivo `.env` e altere para `.env.local` e adicione a URL da API.

#### 5. Como executar em modo de desenvolvimento: `npm run dev`
