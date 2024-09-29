
# URL do Projeto Funcional

[https://crud-blog-toti.vercel.app/](https://crud-blog-toti.vercel.app/)

---

### Comandos para Executar o Projeto

Para instalar as dependências necessárias para o seu projeto, execute os seguintes comandos:

```shell
npm i
```

Para iniciar o projeto em modo de desenvolvimento:

```shell
npm run dev
```
### Responsáveis pelas diferentes partes do projeto.

- Front End: 
  - George: HTML e CSS, rascunho inicial de home, página de reset password via token, request email verification e página de verificação de conta.
  - Solangelis: HTML e CSS geral da major parte do site.

- Backend: 
  - Aleksander: Roteamento e requisição dos posts, edição e eliminação dos mesmos, requisição do front end para os dados do backend dos posts.
  - Alejandro: Roteamento e requisição da autenticação de usuários (cadastro, login, reset de senha, verificação da conta), requisição do front end para os dados do backend dos usuários, paginação e ajuste do roteamento dos posts para filtrar por termo de pesquisa e paginação.

---

# Apresentação do Projeto de Blog CRUD

## Visão Geral

Este projeto é um blog CRUD desenvolvido para permitir aos usuários criar, editar e excluir postagens de maneira intuitiva e interativa.

## Funcionalidades Principais

- Cadastro e Login: Usuários podem se registrar e autenticar.
- Criação de Postagens: Permite que os usuários escrevam e publiquem conteúdo.
- Edição e Exclusão: Funcionalidade para modificar ou remover postagens existentes.

## Tecnologias Utilizadas

- **Frontend**: Next.js e React.
- **Backend**: Node.js com MongoDB e Mongoose.
- **Autenticação**: NextAuth para segurança.

### Dependências

- **FontAwesome**: Inclui ícones de marcas e genéricos para a interface.
- **bcryptjs**: Criptografa e compara senhas de usuários.
- **emoji-picker-react**: Facilita a seleção de emojis.
- **mongodb**: Conecta o Node.js ao banco de dados MongoDB.
- **mongoose**: ORM que facilita a modelagem e validação de dados no MongoDB.
- **next**: Framework fullstack que otimiza renderização, SEO e rotas.
- **next-auth**: Adiciona autenticação segura com múltiplos provedores (Google, GitHub, etc.).
- **next-themes**: Gerencia temas (modo claro e escuro) no Next.js.
- **nodemailer**: Envia e-mails personalizados, como confirmações de cadastro.
- **quill**: Editor de texto rico para formatação avançada.
- **react**: Biblioteca principal para criação de interfaces de usuário.
- **swr**: Faz requisições de dados de forma eficiente e rápida.

# Apresentação do Projeto de Blog CRUD

## Visão Geral
Este projeto é um blog CRUD desenvolvido para permitir aos usuários criar, editar e excluir postagens de maneira intuitiva e interativa.

## Funcionalidades Principais
- **Cadastro e Login:** Usuários podem se registrar e autenticar.
- **Criação de Postagens:** Permite que os usuários escrevam e publiquem conteúdo.
- **Edição e Exclusão:** Funcionalidade para modificar ou remover postagens existentes.

## Tecnologias Utilizadas
- **Frontend:** Next.js e React.
- **Backend:** Node.js com MongoDB e Mongoose.
- **Autenticação:** NextAuth para segurança.

## Dependências
- **FontAwesome:** Inclui ícones de marcas e genéricos para a interface.
- **bcryptjs:** Criptografa e compara senhas de usuários.
- **emoji-picker-react:** Facilita a seleção de emojis.
- **mongodb:** Conecta o Node.js ao banco de dados MongoDB.
- **mongoose:** ORM que facilita a modelagem e validação de dados no MongoDB.
- **next:** Framework fullstack que otimiza renderização, SEO e rotas.
- **next-auth:** Adiciona autenticação segura com múltiplos provedores (Google, GitHub, etc.).
- **next-themes:** Gerencia temas (modo claro e escuro) no Next.js.
- **nodemailer:** Envia e-mails personalizados, como confirmações de cadastro.
- **quill:** Editor de texto rico para formatação avançada.
- **react:** Biblioteca principal para criação de interfaces de usuário.
- **swr:** Faz requisições de dados de forma eficiente e rápida.

## Requisições de Blogs e paginação
- **Extração de Parâmetros:** Obtém informações da URL, como autor, busca e paginação.
- **Limite de Postagens:** Controla quantas postagens são exibidas por página (padrão: 5, máximo: 10).
- **Recuperação de Postagens:** Retorna todas as postagens ou filtra por autor/termo de busca, com mensagens informativas se não houver resultados, como:
  - "Nenhuma postagem encontrada para o termo pesquisado."
  - "Nenhuma postagem encontrada do autor selecionado."
- **Total de Postagens:** Calcula o número total de postagens para facilitar a paginação.

## Criação de Post
- **Recebe dados da nova postagem e conecta ao banco de dados.**
- **Verifica se já existe uma postagem com o mesmo título/conteúdo.**
- **Mensagens de retorno:**
  - **Sucesso:** Confirmação de que a postagem foi criada com sucesso.
  - **Erro:** Indica que uma postagem com este título ou conteúdo já existe.

## Cadastro de Usuário
- **Validações:**
  - Nome e e-mail são obrigatórios.
  - Senha deve ter pelo menos 8 caracteres, incluir letras maiúsculas, minúsculas, números e caracteres especiais.
- **Registro:**
  - Se não houver erros, registra o usuário e envia e-mail informando que o cadastro foi realizado e solicitando verificação da conta.
- **Mensagens de retorno:**
  - **Sucesso:** Confirmação de que o cadastro foi realizado.
  - **Erro:** Indica que o e-mail ou nome de usuário já está em uso ou que os campos não foram preenchidos corretamente (se os campos nome, e-mail ou senha estão vazios ou se a senha não tem 8 caracteres, incluindo letras maiúsculas e minúsculas, um número e um caractere especiais).

## Autenticação de Usuário
- **Busca de Usuário:** Verifica se o usuário existe pelo e-mail.
- **Verificação de Senha:** Compara a senha fornecida com a armazenada.
- **Mensagens de retorno:**
  - **Sucesso:** Redirecionará para a página inicial.
  - **Erro:** Indica que as credenciais estão incorretas.

## Integração com Google
- Permite login com contas Google, atualizando informações se o e-mail já estiver registrado ou criando um novo usuário.
- **Mensagem de retorno:**
  - **Sucesso:** Confirmação de que o login com Google foi realizado com sucesso.
  - **Erro:** Indica que não foi possível autenticar com Google.

## Redefinição de Senha com sessão iniciada
- **Validação da Senha:**
  - Verifica se a nova senha tem pelo menos 8 caracteres, inclui letras maiúsculas, minúsculas, um número e um caractere especial.
  - Se não atender a esses critérios, uma mensagem de erro é exibida.
- **Verificação de Condições para Redefinição:**
  - Confirma se a nova senha e a confirmação da nova senha são iguais.
  - Verifica se a senha atual não é igual à nova senha.
  - Se todas essas condições forem verdadeiras, a senha pode ser alterada.
- **Mensagens de Erro:**
  - Se a nova senha e a confirmação não coincidirem, uma mensagem de erro informa que as senhas não são iguais.
  - Se a nova senha for igual à senha antiga, uma mensagem avisa que a nova senha não pode ser a mesma que a antiga.

## Solicitação de Verificação de Conta
- **Envio de Solicitação:**
  - A função tenta enviar um e-mail de verificação para o usuário atual.
- **Verificação da Resposta:**
  - Se a solicitação for bem-sucedida, uma mensagem de sucesso é exibida para o usuário, confirmando que o e-mail de verificação foi enviado.
  - Se houver um erro na solicitação, uma mensagem de falha é mostrada, informando que a verificação não pôde ser solicitada.

## Redefinição de Senha Via Email
- **Geração de Token:** Cria um token único para redefinição, que expira após uma hora.
- **Envio de E-mail:** Envia link para redefinir a senha.
- **Mensagens de retorno:**
  - **Sucesso:** Confirmação de que as instruções foram enviadas para o e-mail.
  - **Erro:** Indica que o e-mail não foi encontrado ou a conta não foi verificada.

## Criação de Postagem
- **Verificações de Validação:**
  - **Título Obrigatório:** Se o título não for fornecido, é emitida uma mensagem de erro informando que o título é obrigatório.
  - **URL da Imagem:** Se a URL da imagem não for válida ou não for fornecida, uma URL padrão é usada, e uma mensagem de aviso é exibida.
  - **Conteúdo Obrigatório:** Se o conteúdo não for fornecido, também é emitida uma mensagem de erro.
  - Se algum desses campos estiver inválido, a postagem não será criada e os erros são exibidos ao usuário.
- **Envio de Solicitação:**
  - Se todas as validações forem bem-sucedidas, os dados da postagem são enviados ao banco de dados para serem salvos.
- **Resposta do Servidor:**
  - **Sucesso:** Se a postagem for criada com sucesso, uma mensagem de confirmação é exibida e o usuário é redirecionado à página inicial.
  - **Erro de Duplicação:** Se já existir uma postagem com o mesmo título ou conteúdo, uma mensagem de erro é retornada, alertando sobre a duplicação.
  - **Erro Geral:** Se ocorrer algum outro erro, uma mensagem de falha é exibida informando que a criação da postagem falhou.

## Edição de Postagem
- **Recebimento dos Novos Dados:** Os novos dados da postagem, como o título, a imagem e o conteúdo, são capturados do formulário preenchido pelo usuário.
- **Envio da Solicitação de Atualização:** Os novos dados da postagem são enviados ao banco de dados para atualização, com base no ID da postagem.
- **Resposta do Servidor:**
  - **Sucesso:** Se a atualização for bem-sucedida, uma mensagem de confirmação é exibida, e o usuário é redirecionado para a página da postagem editada.
  - **Erro:** Se houver um problema na atualização, uma mensagem de erro é exibida, informando que a edição falhou.
  - **Erro no Servidor:** Se ocorrer um erro do lado do servidor durante a solicitação, uma mensagem é exibida, indicando que o problema está relacionado ao servidor.

## Exclusão de Postagem
- **Confirmação do Usuário:** Antes de excluir uma postagem, o usuário é questionado com uma mensagem de confirmação. Se o usuário optar por continuar, o processo de exclusão é iniciado.
- **Envio da Requisição DELETE:** A solicitação para deletar a postagem é enviada ao banco de dados, usando o ID da postagem. Essa ação verifica se o usuário tem permissão (autor ou administrador) para realizar a exclusão.
- **Resposta do Servidor:**
  - **Sucesso:** Se a postagem for excluída com sucesso, uma mensagem de confirmação é exibida, e o usuário é redirecionado para a página principal.
  - **Erro:** Se houver um problema, como falta de permissão ou outro erro durante o processo, uma mensagem é exibida informando o usuário sobre o erro.



