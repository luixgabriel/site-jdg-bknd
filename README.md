# Site-JDG-Back-End

ROUTES 

## Endpoints

#### Candidates

- `GET /candidate`: Lista todos os candidatos cadastrados no banco de dados.
- `GET /candidate/:id`: Lista um candidato específico pelo id dele no banco de dados.
- `POST /candidate`: Realiza um cadastro de um candidato no banco de dados.
- `PATCH /candidate/:id`: Realiza a atualização no cadastro de um candidato específico pelo id no banco de dados.
- `DELETE /candidate/:id`: Deleta um candidato específico pelo id no banco de dados.

### **Observações**
- O Candidato na hora da criação precisa referenciar o JobOpportunity que ele deseja com o id do Job no campo jobOpportunities.
- O middleware `withAuth` é usado para garantir que o usuário esteja autenticado em algumas rotas.
- O CV de um candidato, ao ser enviado, deve estar no formato PDF e com a chave `CV` em um formulário multipart/form-data.

#### JobOpportunity

- `GET /job-opportunities`: Lista todas as oportunidades de emprego cadastradas no banco de dados.
- `GET /job-opportunities/:id`: Lista uma oportunidade de emprego específica pelo id dela no banco de dados.
- `POST /job-opportunities`: Realiza um cadastro de uma nova oportunidade de emprego no banco de dados.
- `PATCH /job-opportunities/:id`: Realiza a atualização no cadastro de uma oportunidade de emprego específica pelo id no banco de dados.
- `DELETE /job-opportunities/:id`: Deleta uma oportunidade de emprego específica pelo id no banco de dados.

### **Observações**
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

### **Observações**
- Ao atualizar um voluntário com a rota `PATCH`, ao menos um campo deve ser fornecido para atualização.
