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
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/1f2220bf-323a-469e-ad33-004ec809bebc" />

<h2>Inserir Cliente</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/9dcaa847-0508-481a-aa9a-d01568751cc2" />

<h2>Novo Veículo para cliente</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/f69cb088-dfe0-4914-ba9f-c472f4156860" />

<h2>Atendimento</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/bc9a3c58-274a-4635-b228-29c4ca880df7"/>

<h2>Pagamento do Atendimento</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/0a22e78e-310d-4208-ac11-af98cf1f6f06"/>

<h2>Controle de serviços e pagamentos</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/0eb9e879-6bb6-4d24-9753-83180df5eea2"/>

<h2>Financeiro</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/71fba415-4ee5-41f0-9688-c85a898505da"/>

<h2>Sidebar</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/ba9c6924-d28d-4692-9f3d-9d0c8c770a5d"/>

<h2>Inicio Responsivo</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/26df622e-b624-4ec6-8fd3-f11ad14b0942"/>

<h2>Clientes Responsivo</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/7b385c2a-4622-48cd-a87d-db078c5b9cba"/>

