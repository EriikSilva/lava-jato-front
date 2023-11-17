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
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/2cd7aa1e-9d3c-453e-998f-a829bda50a4c"/>


<h2>Início</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/8cd8b8d5-8d5c-4699-9c2a-47f4cbaf5e73"/>

<h2>Clientes</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/d246c367-1f89-4b84-8aa5-f159fd85aea0" />

<h2>Atendimento</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/64b97419-e00d-48b4-aac6-4574533d7607"/>

<h2>Controle de serviços e pagamentos</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/6d384308-80a2-48a6-a97d-1730428bd590"/>

