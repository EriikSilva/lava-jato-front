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
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/79c94270-fe1b-4dd6-b1e5-50c7164f9723"/>

<h2>Início</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/120b04c1-7fd6-46e1-8f40-dec366e89215"/>

<h2>Clientes</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/4128e8ed-8abd-49a9-8729-5369d81cdf75" />

<h2>Inserir Cliente</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/a1667d03-b658-435f-a32f-4761cbcc3f55" />

<h2>Novo Veículo para cliente</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/c8b6bac3-7eb3-40fb-a6fc-361296b167df" />

<h2>Atendimento</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/f8d14a68-e6a5-488e-bdf5-aed24e880191"/>

<h2>Pagamento do Atendimento</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/05a1ae18-2636-4158-a01f-e7ad38e12e8a"/>

<h2>Controle de serviços e pagamentos</h2>
<img src="https://github.com/EriikSilva/lava-jato-front/assets/61124602/506a5517-e360-4281-8aa0-a8756ea6b871"/>

