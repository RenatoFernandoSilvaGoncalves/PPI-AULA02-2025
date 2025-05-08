import express from "express";

const host = "0.0.0.0";
const port = 3000;
var listaUsuarios = [];

const app = express();

//processar o formulário
app.use(express.urlencoded({ extended: true }));

app.get("/", (requisicao, resposta) => {
    resposta.send(`
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                    <title>Página inicial do aplicativo</title>
                </head>
                <body>
                   <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Menu do Sistema</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Cadastros
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li><a class="dropdown-item" href="/cadastroUsuario">Cadastro de Usuários</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </nav>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>
        `);
    resposta.end();
});

app.get("/cadastroUsuario", (requisicao, resposta) => {

    resposta.send(`
        <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                    <title>Página inicial do aplicativo</title>
                </head>
                <body>
                    <div class="container w-75 mb-5 mt-5">
                        <form method="POST" action="/cadastroUsuario" class="row g-3 border p-2" novalidate>
                            <fieldset>
                                <legend class="text-center">Cadastro de Usuários</legend>
                            </fieldset>
                            <div class="col-md-4">
                                <label for="nome" class="form-label">Primeiro nome</label>
                                <input type="text" class="form-control" id="nome" name="nome" required>
                            </div>
                            <div class="col-md-4">
                                <label for="sobronome" class="form-label">Sobrenome</label>
                                <input type="text" class="form-control" id="sobronome" name="sobronome" required>
                            </div>
                            <div class="col-md-4">
                                <label for="nomeUsuario" class="form-label">Nome do usuário:</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                                    <input type="text" class="form-control" id="nomeUsuario" name="nomeUsuario" aria-describedby="inputGroupPrepend" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="cidade" class="form-label">Cidade</label>
                                <input type="text" class="form-control" id="cidade" name="cidade" required>
                            </div>
                            <div class="col-md-3">
                                <label for="uf" class="form-label">UF</label>
                                <select class="form-select" id="uf" name="uf" required>
                                    <option selected disabled value="">Escolha um estado...</option>
                                    <option>SP</option>
                                    <option>RJ</option>
                                    <option>PR</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="cep" class="form-label">CEP</label>
                                <input type="text" class="form-control" id="cep" name="cep" required>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Cadastrar</button>
                                <a class="btn btn-secondary" href="/">Voltar</a>
                            </div>
                        </form>
                    </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>
    `);
    resposta.end();
});

app.post("/cadastroUsuario", (requisicao, resposta) => {
    const nome = requisicao.body.nome;
    const sobronome = requisicao.body.sobronome;
    const nomeUsuario = requisicao.body.nomeUsuario;
    const cidade = requisicao.body.cidade;
    const uf = requisicao.body.uf;
    const cep = requisicao.body.cep;

    if (nome && sobronome && nomeUsuario && cidade && uf && cep) {
        listaUsuarios.push({
            nome: nome,
            sobronome: sobronome,
            nomeUsuario: nomeUsuario,
            cidade: cidade,
            uf: uf,
            cep: cep
        });
        resposta.redirect("/listaUsuarios");
    }
    else {

        let conteudo = `
        <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                    <title>Página inicial do aplicativo</title>
                </head>
                <body>
                    <div class="container w-75 mb-5 mt-5">
                        <form method="POST" action="/cadastroUsuario" class="row g-3 border p-2" novalidate>
                            <fieldset>
                                <legend class="text-center">Cadastro de Usuários</legend>
                            </fieldset>
                            <div class="col-md-4"> `;
        if (!nome) {
            conteudo = conteudo + `
                                <label for="nome" class="form-label">Primeiro nome</label>
                                <input type="text" class="form-control" id="nome" name="nome" required>
                                <span class="text-danger">Por favor informe o nome</span>`;
        }
        else {
            conteudo = conteudo + `
                                <label for="nome" class="form-label">Primeiro nome</label>
                                <input type="text" class="form-control" id="nome" name="nome" value="${nome}" required>
                                `;
        }

        conteudo = conteudo + `</div>
                            <div class="col-md-4"> `;
        if (!sobronome) {
            conteudo = conteudo + `
                                    <label for="sobronome" class="form-label">Sobrenome</label>
                                    <input type="text" class="form-control" id="sobronome" name="sobronome"  required>                                
                                    <span class="text-danger">Por favor informe o sobrenome</span>`;
        }
        else {
            conteudo = conteudo + `
                                    <label for="sobronome" class="form-label">Sobrenome</label>
                                    <input type="text" class="form-control" id="sobronome" name="sobronome" value="${sobronome}" required>
                                    `;
        }

        conteudo = conteudo + `</div>
                            <div class="col-md-4">
                                <label for="nomeUsuario" class="form-label">Nome do usuário:</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                                    <input type="text" class="form-control" id="nomeUsuario" name="nomeUsuario" value="${nomeUsuario}" aria-describedby="inputGroupPrepend" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="cidade" class="form-label">Cidade</label>
                                <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}" required>
                            </div>
                            <div class="col-md-3">
                                <label for="uf" class="form-label">UF</label>
                                <select class="form-select" id="uf" name="uf" required>
                                    <option selected disabled value="">Escolha um estado...</option>
                                    <option value="SP">SP</option>
                                    <option value="RJ">RJ</option>
                                    <option value="PR">PR</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="cep" class="form-label">CEP</label>
                                <input type="text" class="form-control" id="cep" name="cep" value="${cep}" required>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Cadastrar</button>
                                <a class="btn btn-secondary" href="/">Voltar</a>
                            </div>
                        </form>
                    </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>`;
        resposta.send(conteudo);
        resposta.end();
    }
});

app.get("/listaUsuarios", (requisicao, resposta) => {
    let conteudo = `
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                    <title>Página inicial do aplicativo</title>
                </head>
                <body>
                    <div class="container w-75 mb-5 mt-5">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Sobrenome</th>
                                    <th scope="col">Nome do usuário</th>
                                    <th scope="col">Cidade</th>
                                    <th scope="col">UF</th>
                                    <th scope="col">CEP</th>
                                </tr>
                            </thead>
                            <tbody> `;
    for (let i = 0; i < listaUsuarios.length; i++) {
        conteudo = conteudo + `
                                    <tr>
                                        <td>${listaUsuarios[i].nome}</td>
                                        <td>${listaUsuarios[i].sobronome}</td>
                                        <td>${listaUsuarios[i].nomeUsuario}</td>
                                        <td>${listaUsuarios[i].cidade}</td>
                                        <td>${listaUsuarios[i].uf}</td>
                                        <td>${listaUsuarios[i].cep}</td>
                                    </tr>
                                `;
    }

    conteudo = conteudo + ` </tbody>
                        </table>
                        <a class="btn btn-secondary" href="/cadastroUsuario">Continuar cadastrando...</a>
                    </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>`
    resposta.send(conteudo);
    resposta.end();
});

app.listen(port, host, () => {
    console.log(`Servidor em execução em http://${host}:${port}/`);
});
