# Clínica Veterinária

Sistema web para gerenciamento de clínicas veterinárias, desenvolvido com **Next.js** no frontend e **Spring Boot** no backend.

O sistema pode realizar cadastro e gerenciamento de clínicas, pacientes, tutores e veterinários, além de relacionar ás clínicas cadastradas e os tutores cadastrados.

---

# Sobre o projeto

O projeto foi desenvolvido pra organizar informações de clínicas veterinárias e aplicar conceitos de desenvolvimento web, APis REST, CRUD, relacionamento entre entidades, banco de dados e integração entre frontend e backend.

A aplicação possui duas partes principais:

- **Frontend:** desenvolvido com Next.js, TypeScript e Tailwind CSS.
- **Backend:** desenvolvido com Java e Spring Boot.
- **Frontend:** utilizado para armazenar dados das clínicas, pacientes, tutores e veterinários e seus relacionamentos.

O frontend se comunica com o backend atráves de uma API REST.

---

## Tecnologias utilizadas

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Fetch API

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven

### Banco de dados

- MySQL

---

## Estrutura do projeto

O projeto está dividido em frontend e backend.

```clinica_veterinaria/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/aluno/senai/clinica_veterinaria/
│   │       │       ├── controller/
│   │       │       ├── entity/
│   │       │       ├── repository/
│   │       │       └── service/
│   │       │
│   │       └── resources/
│   │
│   ├── pom.xml
│   └── mvnw.cmd
│
├── frontend/
│   ├── app/
│   │   ├── clinicas/
│   │   │   ├── page.tsx
│   │   │   └── listar/
│   │   │       └── page.tsx
│   │   │
│   │   ├── veterinarios/
│   │   │   ├── page.tsx
│   │   │   └── listar/
│   │   │       └── page.tsx
│   │   │
│   │   ├── tutores/
│   │   │   ├── page.tsx
│   │   │   └── listar/
│   │   │       └── page.tsx
│   │   │
│   │   ├── pacientes/
│   │   │   ├── page.tsx
│   │   │   └── listar/
│   │   │       └── page.tsx
│   │   │
│   │   └── page.tsx
│   │
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

## Configuração do banco de dados

O backend utilza MySQL.

 Antes de iniciar o sistema:

1. Instale e inicie o MySQL.
2. Crie o banco de dados utilizado pelo projeto.
3. Configure as informações de conexão do banco no backend, de acordo
com o arquivo de configuração do projeto.

Exemplo de configuração:

spring.datasource.url=jdbc:mysql://localhost:3306/NOME_DO_BANCO
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA

A configuração deve ser ajustada para o banco existente no ambiente de execução.

## Instalação e execução do backend

Entre na pasta

* cd backend

O projeto possui Maven Wrapper.

No Windows, execute:

mvnw.cmd clean install

Para iniciar o backend:

mvnw.cmd spring-boot:run

O backend será executado em:

http://localhost:8080

## Instalação e execução do frontend

Abra um terminal novo e entre na pasta do frontend:

cd frontend

Instale as dependências:

* npm install

Depois execute:

* npm run dev

O frontend será executado em:

http://localhost:3000

Abra no navegador:

http://localhost:3000

## Portas utilizadas

* Frontend Next.js 3000 http://localhost:3000
* Backend Spring Boot 8080 http://localhost:8080
* MySQL 3306* localhost

## Rotas do frontend

Página Inicial:
/

## Clínicas

* Cadastro 
/clinicas 

Permite cadastrar uma nova clínica.

Listagem e Gerenciamento

/clinicas/listar

* Permite:
Listar clínicas;
Buscar clínicas pelo ID;
Modificar clínica;
Excluir clínica.

Dados da clínica:

* ID,
* Nome,
* CNPJ,
* Telefone,
* E-mail,
* Endereço.

## Veterinários

* Cadastro 
/veterinarios

Permite cadastrar uma novo vetterinário.

Listagem e Gerenciamento

/veterinarios/listar

* Permite:
Listar veterinários;
Buscar veterinários pelo ID;
Modificar veterinários;
Excluir veterinários;
Associar veterinário a uma clínica.

Dados do veterinário:

* ID,
* Nome,
* Telefone,
* E-mail,
* Clínica.

## Pacientes

* Cadastro 
/pacientes

Permite cadastrar uma novo paciente.

Listagem e Gerenciamento

/pacientes/listar

* Permite:
Listar pacientes;
Buscar pacientes pelo ID;
Modificar pacientes;
Excluir pacientes;
Associar paciente a um tutor.

Dados do paciente:

* ID,
* Nome,
* Espécie,
* Raça,
* Sexo,
* Tutor.

## Tutores

* Cadastro 
/tutores

Permite cadastrar uma novo tutor.

Listagem e Gerenciamento

/tutores/listar

* Permite:
Listar tutores;
Buscar tutores pelo ID;
Modificar tutores;
Excluir tutores.

Dados dos tutores:

* ID,
* Nome,
* CPF,
* Telefone,
* E-mail,

## API REST 

O backend disponibiliza uma API REST em:

http://localhost:8080

## Endpoints de Clínicas

Método   Endpoint           Função

POST     /clinicas        Cadastrar clínica
GET      /clinicas        Listar clínicas
GET      /clinicas/{id}   Buscar clínica por ID
PUT      /clinicas/{id}   Modificar clínica
DELETE   /clinicas/{id}   Excluir clínica

Cadastrar clínica

POST /clinicas
Content-Type: application/json

Exemplo:

{
  "nome": "Clínica Veterinária Patinhas Felizes",
  "cnpj": "12345678000195",
  "telefone": "(81) 99999-1234",
  "email": "contato@patinhasfelizes.com.br",
  "endereco": "Rua das Flores, 150, Recife - PE"
}

Listar clínicas

GET /clinicas

Buscar clínica

GET /clinicas/1

Modificar clínica

PUT /clinicas/1
Content-Type: application/json

Excluir clínica

DELETE /clinicas/1

## Endpoints de Veterinários

Método   Endpoint               Função

POST     /veterinarios        Cadastrar veterinário
GET      /veterinarios        Listar veterinários
GET      /veterinarios/{id}   Buscar veterinário por ID
PUT      /veterinarios/{id}   Modificar veterinário
DELETE   /veterinarios/{id}   Excluir veterinário

Cadastrar veterinário

POST /veterinarios
Content-Type: application/json

Exemplo:

{
  "nome": "Dr. João Silva",
  "telefone": "(87) 99999-9999",
  "email": "joao@email.com",
  "clinica": {
    "id": 1
  }
}

Listar veterinários

GET /veterinarios

Buscar veterinário

GET /veterinarios/1

Modificar veterinário

PUT /veterinarios/1
Content-Type: application/json

Exemplo:

{
  "nome": "Dr. João Silva",
  "telefone": "(87) 99999-9999",
  "email": "joao@email.com",
  "clinica": {
    "id": 2
  }
}

Excluir veterinário

DELETE /veterinarios/1

## Endpoints de Tutores

Método   Endpoint          Função

POST     /tutores        Cadastrar tutor
GET      /tutores        Listar tutores
GET      /tutores/{id}   Buscar tutor por ID
PUT      /tutores/{id}   Modificar tutor
DELETE   /tutores/{id}   Excluir tutor

Cadastrar tutor

POST /tutores
Content-Type: application/json

Exemplo:

{
  "nome": "Maria Silva",
  "cpf": "12345678900",
  "telefone": "(87) 99999-9999",
  "email": "maria@email.com"
}

Listar tutores

GET /tutores

Buscar tutor

GET /tutores/1

Modificar tutor

PUT /tutores/1
Content-Type: application/json

Excluir tutor

DELETE /tutores/1

## Endpoints de Pacientes

Método   Endpoint            Função

POST     /pacientes        Cadastrar paciente
GET      /pacientes        Listar pacientes
GET      /pacientes/{id}   Buscar paciente por ID
PUT      /pacientes/{id}   Modificar paciente
DELETE   /pacientes/{id}   Excluir paciente

Cadastrar paciente

POST /pacientes
Content-Type: application/json

Exemplo:

{
  "nome": "Mel",
  "especie": "Cachorro",
  "raca": "Golden Retriever",
  "sexo": "Fêmea"
}

Listar pacientes

GET /pacientes

Buscar paciente

GET /pacientes/1

Modificar paciente

PUT /pacientes/1
Content-Type: application/json

Excluir paciente

DELETE /pacientes/1

## Arquitetura do Backend

O backend utiliza uma arquitetura organizada em camadas:

Controller
    ↓
Service
    ↓
Repository
    ↓
MySQL

Controller

Recebe as requisições HTTP e disponibiliza os endpoints da API.

Exemplos:

ClinicaController
VeterinarioController
TutorController
PacienteController

Service

Contém as regras de negócio da aplicação.

Exemplos:

ClinicaService
VeterinarioService
TutorService
PacienteService

No caso dos veterinários, o serviço verifica se a clínica informada
existe antes de salvar a associação.

Repository

Responsável pelo acesso aos dados através do Spring Data JPA.

Exemplos:

ClinicaRepository
VeterinarioRepository
TutorRepository
PacienteRepository

Entity

Representa as entidades persistidas no banco de dados.

Exemplos:

Clinica
Veterinario
Tutor
Paciente

## Fluxo da aplicação

A comunicação ocorre da seguinte maneira:

Usuário
   ↓
Next.js
   ↓
Fetch API
   ↓
Spring Boot
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MySQL

A resposta percorre o caminho inverso:

MySQL
   ↓
Repository
   ↓
Service
   ↓
Controller
   ↓
JSON
   ↓
Next.js
   ↓
Usuário