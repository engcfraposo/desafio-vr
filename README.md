# Wallet Test - Carteira Virtual

Este é um teste prático para a posição de Frontend Mobile, onde foi desenvolvido uma carteira virtual que permite cadastrar novos cartões e listar os cartões já cadastrados através de uma API REST.

## Instruções

### Layout

O layout da aplicação deve ser construído com base no design proposto no Figma, disponível no seguinte link: [Layout do Figma](https://www.figma.com/file/LQJIMG9Kg8kqL0821rBkiQ/Wallet-Test?node-id=2-1039).


### Ferramentas e Bibliotecas

1. **Backend**

| Ferramenta/Biblioteca   | Descrição                                                                                                            |
|-----------------------|----------------------------------------------------------------------------------------------------------------------|
| Prisma                | Prisma é um ORM (Object-Relational Mapping) para Node.js e TypeScript que facilita a interação com o banco de dados e permite definir o modelo de dados de forma declarativa.  |
| Teste Unitário Jest   | Jest é uma estrutura de teste de JavaScript com suporte a testes unitários. Será utilizado para escrever e executar testes unitários para as funções e componentes do backend.   |
| Teste de Integração Jest | Além dos testes unitários, utilizaremos o Jest para escrever e executar testes de integração que verifiquem a interação correta entre os componentes do backend. |
| Class-validator       | Class-validator é uma biblioteca que nos permite validar classes e objetos em TypeScript, facilitando a validação de dados recebidos pelo backend. |
| Swagger               | O Swagger é uma ferramenta para projetar, construir, documentar e usar APIs RESTful. Será utilizado para documentar a API do backend e tornar mais fácil a compreensão e interação com os endpoints. |
| SQLite                | O SQLite é um banco de dados relacional incorporado que é amplamente utilizado em aplicações web e móveis. Será utilizado como o banco de dados para armazenar os cartões cadastrados na carteira virtual. |

2. **Mobile**

| Ferramenta/Biblioteca        | Descrição                                                                                                                                                                  |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Expo                        | O Expo é uma plataforma que permite o desenvolvimento de aplicativos React Native de forma rápida e fácil, fornecendo diversas ferramentas e recursos.                   |
| Zod                         | Zod é uma biblioteca de validação de esquemas TypeScript. Será utilizada para validar os dados inseridos pelo usuário na carteira virtual.                            |
| React Native Deck Swiper   | Esta biblioteca permite a criação de um deck de cartões com funcionalidade de deslizar para a esquerda ou direita. Será usada para exibir os cartões.                   |
| Styled-components          | Styled-components é uma biblioteca para estilização de componentes React, permitindo escrever estilos em forma de componentes JavaScript.                               |
| React Navigation           | O React Navigation é uma biblioteca que fornece uma navegação e gerenciamento de rotas no React Native. Será utilizada para criar a navegação entre telas na aplicação. |
| Redux Toolkit              | Redux Toolkit é uma biblioteca oficial do Redux que fornece uma configuração simplificada para o gerenciamento de estado na aplicação.                                  |
| Redux Persistor            | Redux Persistor é uma biblioteca que permite persistir o estado do Redux na memória do dispositivo, mesmo após o aplicativo ser fechado e reaberto.                   |
| useRef                      | O Hook useRef é utilizado para criar uma referência mutável que pode ser utilizada para armazenar valores que persistem entre renderizações do componente.            |
| useState                   | O Hook useState é utilizado para adicionar o estado ao componente e gerenciar o estado dos cartões na carteira virtual.                                               |
| useEffect                  | O Hook useEffect é utilizado para executar efeitos colaterais em componentes funcionais, como chamadas à API, quando o componente é montado, desmontado ou atualizado.   |
| Expo Icons                 | Expo Icons é uma biblioteca de ícones que permite o uso de ícones vetoriais em projetos Expo. Será utilizado para adicionar ícones à interface do aplicativo.           |
| Expo Google Fonts          | Expo Google Fonts é uma biblioteca que facilita o uso de fontes personalizadas do Google Fonts em projetos Expo. Será utilizada para definir as fontes da aplicação.   |

### Critérios de Avaliação

A avaliação do seu projeto levará em consideração os seguintes critérios:

1. **Ferramentas adotadas**: Avaliaremos as escolhas de tecnologias, bibliotecas e ferramentas utilizadas para o desenvolvimento da aplicação.

2. **Consumo de API**: Será avaliada a habilidade de consumir a API fornecida corretamente e exibir os dados na interface de forma adequada.

3. **Implementação do Design e Animações**: Verificaremos se o design proposto foi implementado fielmente e se existem animações adequadas para aprimorar a experiência do usuário.

4. **Gerenciamento de estado**: Será avaliada a utilização de boas práticas de gerenciamento de estado, como Redux, Context, entre outras.

5. **Performance**: Verificaremos se a aplicação está performática, sem gargalos que possam impactar negativamente a experiência do usuário.

6. **Testes**: Será avaliado se a aplicação possui testes adequados que garantem o bom funcionamento das funcionalidades.

7. **Semântica e organização do projeto**: Verificaremos se o código está bem organizado, legível e segue boas práticas de semântica.

8. **Reaproveitamento de código**: Será avaliado o quanto você conseguiu reutilizar código e componentes para evitar duplicações e facilitar a manutenção do projeto.

## Backend - Testes Unitários e de Integração

O backend do projeto utiliza testes unitários e de integração para garantir a qualidade e o correto funcionamento das funcionalidades desenvolvidas. Abaixo estão detalhadas as informações sobre os testes e como executá-los:

### Testes Unitários

Os testes unitários são responsáveis por verificar o correto funcionamento das partes individuais do código, ou seja, testam as unidades isoladamente para garantir que cada uma delas está funcionando conforme o esperado.

Para executar os testes unitários do backend, utilize o seguinte comando:

```bash
npm run test
```

O Jest é a biblioteca utilizada para executar os testes unitários. Eles estão localizados no diretório "test" e têm a extensão ".spec.ts". Os arquivos de teste são configurados para rodar todos os testes que estão na pasta "test".

### Testes de Integração

Os testes de integração são responsáveis por verificar o correto funcionamento das interações entre diferentes partes do sistema, garantindo que elas se integrem de forma adequada e produzam o resultado esperado.

Para executar os testes de integração do backend, utilize o seguinte comando:

```bash
npm run test:int-cov
```

Os testes de integração utilizam o Jest e estão localizados no diretório "test". Eles têm a extensão ".int-spec.ts". Além disso, antes de executar os testes de integração, o banco de dados é recriado utilizando o Prisma, para garantir que os testes sejam executados em um ambiente limpo e consistente.

### Cobertura de Testes

Ao executar os testes com o comando `npm run test:cov`, você também pode gerar um relatório de cobertura de testes. Isso irá mostrar a porcentagem de código testada pelos testes unitários e de integração.

## Mobile - Testes Unitários

O projeto utiliza testes unitários para garantir a qualidade e o correto funcionamento das funcionalidades desenvolvidas. Abaixo estão detalhadas as informações sobre os testes e como executá-los:

### Testes Unitários
Os testes unitários são responsáveis por verificar o correto funcionamento das partes individuais do código, ou seja, testam as unidades isoladamente para garantir que cada uma delas está funcionando conforme o esperado.

Para executar os testes unitários do mobile:
```bash
npm run test
```

O Jest é a biblioteca utilizada para executar os testes unitários. Eles estão localizados no diretório "test" e têm a extensão ".spec.ts". Os arquivos de teste são configurados para rodar todos os testes que estão na pasta "test".

### Cobertura de Testes

Ao executar os testes com o comando `npm run test:cov`, você também pode gerar um relatório de cobertura de testes. Isso irá mostrar a porcentagem de código testada pelos testes unitários e de integração.

## Inicialização da API

Para obter os dados da API, utilize a api criada com NestJS ou JSON Server. O arquivo base para a inicialização do servidor está presente no final deste documento. Ao cadastrar um novo cartão, os dados devem ser enviados para o endpoint /cards, e o novo cartão retornado na listagem de dados para ser exibido ao usuário.

1. **JSON Server**

Para iniciar a API, instale o json-server.

```
cd mobile
npm install -g json-server
```
Abaixo está o conteúdo do arquivo db.json, que servirá como base de dados para a API.

```js
{
  "cards": []
}
```

Para rodar o servidor, você pode utilizar o seguinte comando:

```bash
json-server --watch db.json --port 3000
```

crie um arquivo env com os seguintes parametros

```bash
EXPO_PUBLIC_API_URL="http://<SEU_IP>:3000"
```

1. **Backend**


Para executar o servidor do backend, siga os passos abaixo:

1. Navegue até o diretório "backend" usando o seguinte comando:

```bash
cd backend
```

2. Instale as dependências do projeto utilizando o npm:

```bash
npm install
```

3. Instale globalmente a ferramenta Prisma, que será utilizada para interagir com o banco de dados:

```bash
npm install -g prisma
```

4. Realize a migração do banco de dados executando o seguinte comando para criar a estrutura necessária:

```bash
npx prisma migrate reset --force
```

Este comando irá recriar o banco de dados, garantindo que esteja vazio e em um estado consistente para iniciar o servidor.

5. Finalmente, inicie o servidor em modo de desenvolvimento usando o seguinte comando:

```bash
npm run start:dev
```

Com esses passos concluídos, o servidor backend estará em execução e pronto para atender às solicitações da aplicação frontend mobile.


## Inicialização do App

Após clonar ou baixar o repositório do projeto, navegue para o diretório do aplicativo no terminal e instale as dependências utilizando o proprio expo:

```
cd mobile
npx expo install
```

Em seguida, você pode iniciar o aplicativo usando o comando:

```
npx expo start
```

Isso abrirá o Metro Bundler no navegador. No lado direito da página, você encontrará opções para rodar o aplicativo em um emulador/simulador ou em um dispositivo físico através do aplicativo Expo Go. Basta seguir as instruções fornecidas pelo Expo para visualizar o aplicativo no seu dispositivo.

## Considerações Finais

Após concluir o teste prático para a posição de Frontend Mobile e desenvolver a carteira virtual utilizando as tecnologias e ferramentas mencionadas, tenho algumas considerações sobre o processo e o projeto:

Experiência com as Tecnologias: O teste me proporcionou a oportunidade de trabalhar com o Expo, React Native e diversas bibliotecas essenciais para o desenvolvimento mobile, como Redux, Styled-components e React Navigation. Aprendi a utilizar o Expo para facilitar a configuração do ambiente de desenvolvimento e agilizar a criação das telas da aplicação.

Integração com o Backend: A integração com o backend foi uma etapa crucial do projeto. A utilização do Prisma como ORM facilitou o acesso aos dados e a persistência dos cartões cadastrados na carteira virtual. Além disso, o consumo da API REST foi feito de forma eficiente, garantindo a exibição correta dos cartões na listagem.

Gerenciamento de Estado: Utilizei o Redux Toolkit e o Redux Persistor para gerenciar o estado global da aplicação. Essas bibliotecas tornaram o gerenciamento de estado mais organizado e permitiram que os dados dos cartões persistissem mesmo após o aplicativo ser fechado e reaberto.

Estilização e Animações: O uso do Styled-components possibilitou uma estilização mais modular e reutilizável dos componentes, deixando o código mais limpo e legível. Além disso, a biblioteca React Native Deck Swiper proporcionou uma experiência de usuário agradável ao interagir com os cartões.

Desafios e Aprendizado: Durante o desenvolvimento, enfrentei alguns desafios, como a organização das telas e a configuração do ambiente de desenvolvimento. No entanto, esses desafios foram oportunidades de aprendizado e crescimento, e me permitiram adquirir novos conhecimentos na área de desenvolvimento mobile.

Reaproveitamento de Código: Procurei aplicar o conceito de reaproveitamento de código sempre que possível, criando componentes reutilizáveis e organizando a estrutura do projeto de forma escalável.

Testes: Embora o teste não mencionasse explicitamente qual testes, acredito na importância dos testes para garantir a qualidade e a robustez da aplicação. Dessa forma, criei testes unitários (mobile, backend) e de integração(backend) para das funcionalidades essenciais da carteira virtual.

No geral, o teste prático foi uma experiência enriquecedora, me permitindo aprofundar meus conhecimentos em desenvolvimento mobile e aprender novas tecnologias. Sinto-me confiante em relação ao resultado final da carteira virtual desenvolvida e estou ansioso para continuar aprimorando minhas habilidades na área.

Agradeço a oportunidade de participar deste teste e fico à disposição para qualquer esclarecimento adicional.
