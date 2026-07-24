# 🌐 TAP-GO

Aplicação web full stack de visualização de dados, desenvolvida como projeto de primeiro semestre. Implementa a arquitetura em camadas **rotas → controllers → models** sobre Node.js, com CRUD completo e persistência em banco relacional.

<!-- TODO (importante): descreva em 2–3 frases o que o TAP-GO faz de fato — qual o domínio, quais dados ele mostra, o que você construiu além do esqueleto de referência da faculdade. É isso que diferencia o repositório de um template. -->

---

## 🏗️ Arquitetura

```
TAP-GO/
├── app.js                  # Ponto de entrada e parametrização de ambiente
├── public/                 # Front-end (páginas, estilos, scripts do cliente)
└── src/
    ├── routes/             # Definição dos endpoints HTTP
    ├── controllers/        # Regras de negócio e tratamento das requisições
    ├── models/             # Consultas ao banco de dados
    └── database/           # Script de criação das tabelas
```

O fluxo de uma requisição percorre sempre o mesmo caminho: **front-end → routes → controllers → models → banco**.

| CRUD | Ação | Verbo HTTP | Comando SQL |
| --- | --- | --- | --- |
| C | Create | POST | INSERT |
| R | Read | GET | SELECT |
| U | Update | PUT | UPDATE |
| D | Delete | DELETE | DELETE |

---

## 🛠️ Tecnologias

| Tecnologia | Papel |
| --- | --- |
| Node.js | Runtime do servidor |
| Express | Framework HTTP e roteamento |
| JavaScript | Linguagem (back-end e front-end) |
| MySQL / SQL Server | Banco de dados relacional |
| dotenv | Configuração por variáveis de ambiente |

---

## ▶️ Como rodar

### 1. Clonar e instalar

```bash
git clone https://github.com/gustavomot4/TAP-GO.git
cd TAP-GO
npm install
```

### 2. Criar as tabelas

Execute o script `src/database/script-tabelas.sql` no seu banco de dados.

### 3. Configurar o ambiente

Preencha o arquivo `.env` com as credenciais do seu banco:

| Variável | Descrição |
| --- | --- |
| `AMBIENTE_PROCESSO` | `desenvolvimento` (local) ou `producao` (remoto) |
| `DB_HOST` | Endereço do banco |
| `DB_DATABASE` | Nome do banco |
| `DB_USER` | Usuário do banco |
| `DB_PASSWORD` | Senha do banco |
| `DB_PORT` | Porta do banco |
| `APP_PORT` | Porta em que a aplicação sobe |
| `APP_HOST` | Host da aplicação |

Em `app.js`, deixe habilitada a linha correspondente ao ambiente que você está usando.

### 4. Iniciar

```bash
npm start
```

Acesse o endereço informado no terminal. Para encerrar: `Ctrl + C`.

---

## 🖼️ Telas

<!-- TODO: tire prints das telas de visualização de dados, salve em docs/ e descomente abaixo -->
<!-- ![Dashboard](docs/screenshot-dashboard.png) -->

---

## 📄 Licença

Ver [LICENSE](LICENSE).

---

> Este projeto partiu da implementação de referência de primeiro semestre da faculdade e foi estendido a partir dela.
