# Site-JDG-Back-End

## Modelos e Relações

### Usuário (`User`)

- **id**: String (UUID gerado automaticamente)
- **name**: String
- **email**: String (único)
- **password**: String
- **stack**: Array de Strings (Tecnologias que o usuário conhece)
- **role**: String (default é "user")
- **authenticationCode**: Int (opcional)
- **authenticated**: Boolean (default é `false`)
- **authenticationCodeCreatedAt**: DateTime (opcional)
- **Post**: Relação com a tabela de Postagens (`Post`)

### Postagem (`Post`)

- **id**: String (UUID gerado automaticamente)
- **title**: String
- **subtitle**: String
- **description**: String
- **image**: String (opcional)
- **createdAt**: DateTime (data e hora da criação)
- **author**: Relação com o modelo de Usuário (`User`)
- **authorId**: String (ID do autor)

### Candidato (`Candidate`)

- **id**: String (UUID gerado automaticamente)
- **name**: String
- **email**: String (único)
- **telephone**: String
- **cv**: String (URL do currículo)
- **github**: String (URL do perfil do GitHub)
- **linkedin**: String (URL do perfil do LinkedIn)
- **applications**: Int (default é 1)
- **jobOpportunities**: Relação com o modelo de Oportunidades de Trabalho (`JobOpportunity`)

### Oportunidade de Trabalho (`JobOpportunity`)

- **id**: String (UUID gerado automaticamente)
- **title**: String
- **description**: String
- **category**: String
- **status**: Enum (`OPENED`, `RECRUITING`, `CLOSED`) - status da vaga (default é `OPENED`)
- **stack**: Array de Strings (Tecnologias requeridas para a vaga)
- **candidates**: Relação com o modelo de Candidato (`Candidate`)

### Voluntário (`Voluntary`)

- **id**: String (UUID gerado automaticamente)
- **name**: String
- **email**: String (único)
- **stack**: Array de Strings (Tecnologias que o voluntário conhece)

### Cliente (`Client`)

- **id**: String (UUID gerado automaticamente)
- **name**: String
- **email**: String (único)
- **image**: String (URL da imagem)

## Exemplos dos Schemas

### Usuário (`User`)

{
  "name": "João Silva",
  "email": "joao.silva@email.com",
  "password": "senhaSegura123",
  "stack": ["JavaScript", "React", "Node.js"]
}

### Posts (`Post`)

{
  "title": "Título da Postagem",
  "subtitle": "Subtítulo da Postagem",
  "description": "Descrição completa da postagem.",
  "image": "url/da/imagem.jpg",
  "authorId": "uuid-do-autor"
}

### Candidato (`Candidate`)

{
  "name": "Maria Pereira",
  "email": "maria.pereira@email.com",
  "telephone": "+5511999999999",
  "cv": "url/do/curriculo.pdf",
  "github": "https://github.com/mariapereira",
  "linkedin": "https://linkedin.com/in/mariapereira"
  "jobOpportunities": "ID da vaga de emprego"
}

### Oportunidade de emprego (`JobOpportunity`)

{
  "title": "Desenvolvedor(a) Front-end",
  "description": "Vaga para desenvolvedor(a) front-end com experiência em React.",
  "category": "Front-End",
  "stack": ["React", "JavaScript", "CSS"]
}

### Voluntário (`Voluntary`)

{
  "name": "Carlos Souza",
  "email": "carlos.souza@email.com",
  "stack": ["Node.js", "GraphQL"]
}

### Cliente (`Client`)

{
  "name": "Empresa XYZ",
  "email": "contato@empresaxyz.com",
  "image": "url/logo.jpg"
}
 
## Endpoints

## Users
- `GET /user/all`: Lista todos os usuários existentes.
- `GET /user/:id`: Lista um usuário em específico.
- `POST /user`: Cria um usuário.
- `POST /user/admin`: Cria um usuário podendo até mesmo criar um administrador.
- `POST /user/auth/login`: Faz login sendo possivel receber alguns dados do usuário e um token. 
- `POST /user/auth/send-code`: Envia um código de autenticação para o email do usuário.
- `POST /user/auth/verify-code`: Verifica se o código digitado pelo usuário corresponde ao enviado ao email.
- `POST /user/password-reset-request`: Solicita que seja enviado um código ao email do usuário contendo um novo codigo de autenticação mas para alteração de password.
- `POST /user/password-reset`: Altera a senha atráves do codigo fornecido pelo usuário, verificando se o mesmo é igual ao enviado ao email.
- `PATCH /user/:id`: Atualiza nome e/ou stack do usuário.
- `DELETE /user/:id`: Delete o usuário.

#### Observações**

- Todas as rotas que necessitam de ID, a rota /all e /admin necessitam de autorização atráves do token fornecido pelo login.
- As rotas /all e /admin so podem ser utilizadas por usuários admins.
- As rotas com /:id so vão funcionar nas duas seguintes ocasiões, o id se referenciar ao usuário logado, que é verificado automáticamente pelo token fornecido ou se o usuário for administrador, ou seja, podendo fazer alterções em qualquer outros usuários.
- Modelo de senha aceito contém 1 letra maiúscula, 1 letra minuscula, 1 caracter especial, 1 numero.

#### Posts

- `GET /post`: Lista todas as postagens cadastradas no banco de dados.
- `GET /post/:id`: Lista uma postagem específica pelo seu id.
- `POST /post`: Realiza um cadastro de uma nova postagem no banco de dados. Nota: Uma imagem pode ser enviada como parte da postagem.
- `PATCH /post/:id`: Realiza a atualização no cadastro de uma postagem específica pelo seu id. Nota: Uma imagem pode ser atualizada durante esse processo.
- `DELETE /post/:id`: Deleta uma postagem específica pelo seu id.

#### Observações**
- Na hora da criação do post precisa referenciar o user que criou ele com o id do user no campo authorId.
- O middleware `withAuth` é usado para garantir que o usuário esteja autenticado em algumas rotas.
- Para as rotas que aceitam upload de imagem, o arquivo deve ser enviado com a chave `IMAGE`.
- Ao atualizar uma postagem com a rota `PATCH`, ao menos um campo ou imagem deve ser fornecido para atualização.

#### Candidates

- `GET /candidate`: Lista todos os candidatos cadastrados no banco de dados.
- `GET /candidate/:id`: Lista um candidato específico pelo id dele no banco de dados.
- `POST /candidate`: Realiza um cadastro de um candidato no banco de dados.
- `PATCH /candidate/:id`: Realiza a atualização no cadastro de um candidato específico pelo id no banco de dados.
- `DELETE /candidate/:id`: Deleta um candidato específico pelo id no banco de dados.

#### **Observações**
- O Candidato na hora da criação precisa referenciar o JobOpportunity que ele deseja com o id do Job no campo jobOpportunities.
- O middleware `withAuth` é usado para garantir que o usuário esteja autenticado em algumas rotas.
- O CV de um candidato, ao ser enviado, deve estar no formato PDF e com a chave `CV` em um formulário multipart/form-data.

#### JobOpportunity

- `GET /job-opportunities`: Lista todas as oportunidades de emprego cadastradas no banco de dados.
- `GET /job-opportunities/:id`: Lista uma oportunidade de emprego específica pelo id dela no banco de dados.
- `POST /job-opportunities`: Realiza um cadastro de uma nova oportunidade de emprego no banco de dados.
- `PATCH /job-opportunities/:id`: Realiza a atualização no cadastro de uma oportunidade de emprego específica pelo id no banco de dados.
- `DELETE /job-opportunities/:id`: Deleta uma oportunidade de emprego específica pelo id no banco de dados.

#### **Observações**
- O middleware `withAuth` é usado para garantir que o usuário esteja autenticado em algumas rotas.

  
#### Clients

- `GET /client`: Lista todos os clientes cadastrados no banco de dados.
- `GET /client/:id`: Lista um cliente específico pelo id dele no banco de dados.
- `POST /client`: Realiza um cadastro de um cliente no banco de dados. Nota: Uma imagem pode ser enviada como parte do cadastro.
- `PATCH /client/:id`: Realiza a atualização no cadastro de um cliente específico pelo id no banco de dados. Nota: Uma imagem pode ser atualizada durante esse processo.
- `DELETE /client/:id`: Deleta um cliente específico pelo id no banco de dados.

### **Observações**
- O middleware `withAuth` é usado para garantir que o usuário esteja autenticado em algumas rotas.
- Para as rotas que aceitam upload de imagem, o arquivo deve ser enviado com a chave `IMAGE`.


#### Voluntarys

- `GET /voluntary`: Lista todos os voluntários cadastrados no banco de dados.
- `GET /voluntary/:id`: Lista um voluntário específico pelo id dele no banco de dados.
- `POST /voluntary`: Realiza um cadastro de um novo voluntário no banco de dados.
- `PATCH /voluntary/:id`: Realiza a atualização no cadastro de um voluntário específico pelo id no banco de dados.
- `DELETE /voluntary/:id`: Deleta um voluntário específico pelo id no banco de dados.

#### **Observações**
- Ao atualizar um voluntário com a rota `PATCH`, ao menos um campo deve ser fornecido para atualização.
