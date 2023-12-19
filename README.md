# Lava Jato Frontend

# 💾 Instalação
- Necessario Node e Angular
- Clonar o projeto ```git clone https://github.com/EriikSilva/lava-jato-front.git```
- Rodar o comando pelo cmd na pasta do projeto ```npm install```
- Rodar o front com o comando no terminal ```ng serve``` e acessar ```http://localhost:4200``` :)

# 💬 Sobre
Projeto que tem como finalidade atender a administração de um lava jato
<br>
- Front-end:angular com primeng.

# 💻 Características
- Proteção de rotas (JWT)
- Login 
  - Foi usado jwt(jsonWeToken) com guard, interceptor e authorization para validação de usuario
- Dados validados
  - Todos os dados são validados assim que o botão de submit é clicado 
  - Verifica se campo é null ou vazio
  - Verifica se email existe caso tente cadastrar um email que ja existe
  - Verifica se conta existe caso tente enviar para uma conta que não existe

# 🐱‍👤Features
- Toolbar
  - Menu Sidebar
  - Perfil
  - Logout
- Sidebar
  - Inicio
  - Clientes (CRUD)
  - Atendimento (atendimento, cancelamento e pagamento de serviços realizados)
  - Controle de Serviços e Pagamentos (Aréa destinada ao crud de todos os atendimentos e pagamentos)
  - Financeiro (em desenvolvimento)
- Login
  - Fazer Login com email e senha com validações (se email e senha são validos ou campos são validos)
  - Botão criar conta
- Criar Conta
  - Criar conta com email e senha com validações (se email existe ou campos são validos)
  - Botão voltar
- Dashboard 
  - Cards com funcionalidades (Clientes, atendimento, gestão e etc)
 
(Imagens Provisórias)

<h2>Login</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/2b1fce67-595c-4b52-a9b1-4ec8ede7f4b6"/>

<h2>Início</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/2ebb5ec4-448a-4b4b-a8bf-db5e9dc4b1db"/>

<h2>Clientes</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/6dcf3db5-9d76-4789-829d-8b1a4eb8d80a" />

<h2>Inserir Cliente</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/b2753fb2-4313-4f1b-a538-59cf9048e8aa" />

<h2>Novo Veículo para cliente</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/4107024e-23e4-45ee-930f-4330af30f4b8" />

<h2>Atendimento</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/02f19bb5-a6a0-491d-9fd5-87bcf14bda7f"/>

<h2>Pagamento do Atendimento</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/5c5cd384-02bc-4d8f-b77e-ba14ebb60c14"/>

<h2>Controle de serviços e pagamentos</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/0eb9e879-6bb6-4d24-9753-83180df5eea2"/>

<h2>Financeiro</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/e5af16f9-b9a9-40e2-bf15-8ce1703d1f16"/>


