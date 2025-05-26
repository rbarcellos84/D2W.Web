No backend, o projeto foi desenvolvido com as tecnologias .NET 8 Core RESTful API, utilizando o Swagger como ferramenta de documentação e o banco de dados SQL Server. Para a comunicação entre a aplicação e o banco, foi utilizado o Entity Framework.

Para o front-end, foi utilizado Angular 19 com Node.js 22.16.0.

	Tecnologias utilizadas no backend:
		EntityFrameworkCore
		EntityFrameworkCore.Design
		EntityFrameworkCore.SqlServer
		EntityFrameworkCore.Tools
		Extensions.Configuration.Abstractions
		Extensions.Configuration.FileExtensions
		AutoMapper.Extensions.Microsoft.DependencyInjection
		Swashbuckle.AspNetCore.SwaggerGen
		Swashbuckle.AspNetCore.SwaggerUI

Estrutura do projeto:
	Foi adicionado um projeto extra para a injeção de dependência. A organização segue a estrutura de camadas:
		Application: Contém os casos de uso, onde a lógica de negócios específica é aplicada.
		Domain: Define entidades e regras de negócio, independente de infraestrutura externa.
		Infra.Data: Responsável pelo acesso ao banco de dados, garantindo a persistência dos dados.
		Infra.IoC: Gerencia a injeção de dependência, organizando conexões entre serviços.
		WebApi: Camada de interface, recebe requisições e repassa para Application.
		Domain.Tests: Implementação de testes das entidades.
		Infra.Data.Tests: Implementação de testes da camada de persistência e comunicação com o banco.

	Testes da aplicação:
		Para a realização dos testes da aplicação, foram utilizados os seguintes recursos:
		xunit.runner.visualstudio: Runner para testes no Visual Studio usando o framework xUnit.
		xunit: Framework de testes unitários leve e extensível.
		Microsoft.NETCore.Platforms: Define as plataformas suportadas no .NET Core, garantindo compatibilidade.
		coverlet.collector: Ferramenta para cobertura de testes, útil para verificar quais partes do código foram testadas.
		FluentAssertions: Biblioteca que facilita a escrita de asserções mais legíveis e expressivas em testes.
		Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation: Permite a compilação em tempo de execução de views Razor, útil para testar mudanças sem recompilar o projeto.

Configurações:
	No projeto WebApi, há um arquivo appsettings.json, onde configuramos a string de conexão com o banco de dados. Após realizar a migration, deve-se pegar a string de conexão gerada e substituir no endereço DefaultConnection.

	Para o CORS, devemos configurar o endereço do site, normalmente definido pelo Angular como http://localhost:4200.

	Na aplicação Angular, existe um componente chamado config, onde definimos o endereço da API. Podemos procurar pelo nome apiBaseUrl, que está localizado dentro da pasta app.

	No vídeo, podemos visualizar as configurações do projeto e suas execuções.


# D2W

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.13.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
