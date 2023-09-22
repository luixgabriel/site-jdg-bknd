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
- O middleware `withAuth` é usado para garantir que o usuário esteja autenticado em algumas rotas.
- O CV de um candidato, ao ser enviado, deve estar no formato PDF e com a chave `CV` em um formulário multipart/form-data.

#### Clients

- `GET /client`: Lista todos os clientes cadastrados no banco de dados.
- `GET /client/:id`: Lista um cliente específico pelo id dele no banco de dados.
- `POST /client`: Realiza um cadastro de um cliente no banco de dados. Nota: Uma imagem pode ser enviada como parte do cadastro.
- `PATCH /client/:id`: Realiza a atualização no cadastro de um cliente específico pelo id no banco de dados. Nota: Uma imagem pode ser atualizada durante esse processo.
- `DELETE /client/:id`: Deleta um cliente específico pelo id no banco de dados.

### **Observações**
- O middleware `withAuth` é usado para garantir que o usuário esteja autenticado em algumas rotas.
- Para as rotas que aceitam upload de imagem, o arquivo deve ser enviado com a chave `IMAGE`.

#### Match

- `GET /match/matches`: Lista todas as partidas cadastradas no banco de dados.
- `GET /match/searchmatch/:id`: Lista uma partida específica pelo id dela no banco de dados.
- `POST /match`: Realiza um cadastro de uma partida no banco de dados.
- `PUT /match/current/:id`: Lista a partida em andamento específica pelo id e atualiza os eventos dela.
- `DELETE /match/deleteMatch/:id`: Deleta uma partida específica pelo id no banco de dados.
