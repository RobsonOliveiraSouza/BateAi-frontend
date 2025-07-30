# BateAi - Front-End (Angular 19)

Este projeto é a interface web do sistema **BateAi**, uma plataforma de controle de ponto eletrônico com autenticação por JWT, papéis de usuário, aprovação de cadastros e dashboards personalizados para cada tipo de perfil. (Referente ao back-end 'BateAi' disponivel no repositorio 'https://github.com/RobsonOliveiraSouza/BateAi')

## 🔧 Tecnologias Utilizadas

- [Angular 19](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)
- HTML, CSS


## 🏗️ Estrutura do Projeto

```
    src/
    ├── app/
    │ ├── acesso-negado/     # Compontes comum ao login
    │ ├── aguarde-aprovacao/
    │ ├── auth/              # Login, logout, serviço JWT
    │ ├── contato/           
    │ ├── dashboard/         # Componente principal
    │ ├── dtos/              # Objetos de transferência de dados
    │ ├── enums/             # Utilitarios
    │ ├── gerenciar-usuarios/
    │ ├── header/            # Navbar (menu)
    │ ├── home/              # Tela inicial (sem login)
    │ ├── ponto/             # Componente de gerenciamento (ponto)
    │ ├── services/          # Serviços de comunicação com API
    │ ├── shared/            # Componentes compartilhados
    │ ├── sobre/
    │ ├── app.config.ts      # Arquivo de Configuração 
    │ └── app.routes.ts      # Arquivo de Rotas
    ├── assets/
    │ ├── img/               # Imagens do sistema
    ├── index.html
    └── style.css            # CSS global
```

## 👥 Perfis de Usuário

O sistema possui três tipos principais de usuários:

- `EMPRESA` – Visualiza e aprova coordenadores.
- `COORDENADOR` – Visualiza, aprova colaboradores e registra ponto.
- `COLABORADOR` – Registra ponto e visualiza o histórico.

## 🔐 Autenticação e Autorização

A autenticação é feita por meio de **JWT (JSON Web Token)**. O token é salvo no `localStorage` após o login e é enviado automaticamente em todas as requisições autenticadas via `AuthInterceptor`.

Exemplo de armazenamento local:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "role": "COORDENADOR",
  "empresaId": 1
}
```

## 👥 Funcionalidades por Role

### EMPRESA
- ✔️ Visualizar lista de coordenadores  
- ✔️ Aprovar ou rejeitar coordenadores com status `PENDENTE_COORDENADOR`

### COORDENADOR
- ✔️ Visualizar colaboradores da empresa  
- ✔️ Aprovar ou rejeitar colaboradores com status `PENDENTE_COLABORADOR`  
- ✔️ Registrar ponto (entrada, saída, pausa...)

### COLABORADOR
- ✔️ Registrar ponto  
- ✔️ Ver histórico dos próprios registros de ponto

---

## 🧠 Principais Componentes e Serviços

### `DashboardComponent`
Componente principal após o login. Se adapta com base na role do usuário autenticado.

- Usa os serviços:
  - `AuthService`
  - `EmpresaService`
  - `UsuarioService`
  - `PontoService`
- Exibe cards e funcionalidades condicionalmente
- Permite ações como:
  - Registro de ponto
  - Aprovação/rejeição de usuários

---

## 🔧 Serviços

### `PontoService`
```ts
registrarPonto(dto: RegistroPontoDTO): Observable<RegistroPontoResponseDTO>
listarMeusPontos(): Observable<RegistroPontoResponseDTO[]>
```
Comunica com:

- `POST /ponto/registrar`
- `GET /ponto/historico`

#### `usuario.service.ts`

Comunica com:

- `GET /usuarios/empresa/{empresaId}`
- `PUT /usuarios/{id}/aprovar`
- `PUT /usuarios/{id}/rejeitar`

**Métodos:**

- `listarTodos(empresaId: number): Observable<UsuarioResponseDTO[]>`
- `aprovarColaborador(id: number): Observable<void>`
- `rejeitarColaborador(id: number): Observable<void>`

#### `empresa.service.ts`

Comunica com:

- `GET /empresas/{id}/coordenadores`
- `PUT /usuarios/{id}/aprovar-coordenador`
- `PUT /usuarios/{id}/rejeitar-coordenador`

**Métodos:**

- `getCoordenadores(empresaId: number): Observable<UsuarioResponseDTO[]>`
- `aprovarCoordenador(id: number): Observable<void>`
- `rejeitarCoordenador(id: number): Observable<void>`

#### `auth.service.ts`

Responsável pela autenticação e controle de sessão.

**Funções:**

- `getUserRole(): string`
- `getEmpresaId(): number`
- `logout(): void`

- Salva o token JWT no `localStorage`
- Utiliza o token para chamadas autenticadas à API

## 🔄 Registro de Ponto

Formulário com:

- Seleção do tipo de ponto (ENTRADA, SAIDA, PAUSA)
- Campo de localização (exemplo: "Empresa XPTO - Escritório Central")

Ao registrar, é enviada uma requisição `POST` para a API:

- `POST /ponto/registrar`

Após o registro, o histórico do colaborador é recarregado automaticamente com `GET /ponto/historico`.

**Exemplo de método:**

```ts
registrarPonto(): void {
  const dto: RegistroPontoDTO = {
    tipoRegistro: this.tipoRegistro as any,
    localizacao: this.localizacao
  };

  this.pontoService.registrarPonto(dto).subscribe({
    next: (res) => {
      this.mensagemRegistro = `Ponto registrado com sucesso: ${res.tipoRegistro} às ${res.dataHora}`;
      this.carregarHistoricoPontos();
    },
    error: () => {
      this.mensagemRegistro = 'Erro ao registrar ponto.';
    }
  });
}
```

## ✅ TODO Futuro

- Tela de login com design moderno
- Refresh token automático
- Responsividade mobile
- Confirmação por e-mail (ativação de conta)
- Segurança extra: rate limiting, CORS refinado
- Suporte a múltiplos vínculos por colaborador
- Gameficação mais elaborada com animações e recursos

## ▶️ Como Executar

```bash
# 1. Instale as dependências
npm install

# 2. Rode o servidor Angular
ng serve
```

- Acesse em: [http://localhost:4200](http://localhost:4200)
- Certifique-se de que o back-end (Spring Boot) está rodando em: [http://localhost:8080](http://localhost:8080)

## 📌 Requisitos

- Node.js 18+
- Angular CLI 16+ (o recomendado é o 19)
- API do sistema BateAi (Spring Boot) rodando localmente

## 📄 Licença

Este projeto é de uso **acadêmico** e está sob a Licença **MIT**.