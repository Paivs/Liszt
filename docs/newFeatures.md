# Tarefas para Novo Colaborador - Projeto Neuman

---

## Tarefa 1: Editar documentos online

### Nível de Complexidade  
Média - envolve frontend e backend, manipulação de formulários, atualização de dados e controle simples.

### Sugestões  
- Primariamente, use um textarea básico para o campo de texto.  
- Crie endpoints para buscar e atualizar o documento via API REST e firebase (utilize as boas práticas) 
- No frontend (Next.js), crie um formulário para editar e salvar o documento.  
- Evite editors WYSIWYG complexos neste primeiro momento, mas analise rich editor texts.

### Dicas  
- Ferramentas: React Hook Form para controle do formulário, Axios/Fetch para comunicação com backend.  
- Buscar exemplos simples de formulários controlados em React. 
- Análise os endpoints que já estão funcionando, basea-se neles

### O que aprenderá  
- Fluxo completo CRUD: leitura, edição e atualização via API.  
- Comunicação frontend-backend com React + Express.  
- Manipulação de formulários React.  
- Operações básicas no banco via Sequelize.  

---

## Tarefa 2: Assinar documentos digitalmente (funcionalidade básica)

### Nível de Complexidade  
Alta (mas pode ser simplificada para versão inicial).

### Sugestões  
- Implemente botão “Assinar” que grava o usuário que assinou e timestamp no banco.  
- Crie modelo para armazenar informações de assinatura (usuário, data, documento).  
- Valide se o usuário já assinou para evitar assinaturas duplicadas.  
- Opção futura: explorar bibliotecas para assinatura eletrônica real.

### Dicas  
- Ferramentas: Sequelize para modelagem e persistência.  
- Pesquisar sobre “Digital Signature in web apps” para próximos passos.

### O que aprenderá  
- Controle de acesso e autenticação (quem assinou).  
- Modelagem e persistência de dados relacionados a assinaturas.  
- Validação de regras de negócio (assinatura única).  
- Planejamento para funcionalidades futuras mais complexas.

---

## Tarefa 3: Página de Análise de Diferenças entre Versões (NEXT.js)

### Nível de Complexidade  
Média a alta (envolve integração, análise de arquivos e UI dinâmica).

### Descrição da Tarefa  
Você receberá dois objetos que representam versões de documentos com URLs para os arquivos armazenados em uma CDN. Seu desafio é criar uma aplicação/sistema em **Next.js** que:

- Identifique se a versão é nova (comparando `version_number` ou `last_modified`).
- Identifique se o conteúdo mudou (por exemplo, tamanho ou hash do arquivo).
- (Extra) Analise e destaque o que mudou entre as versões.

### Exemplo de objeto versão recebida

```json
{
  "id": "08b82679-a24f-4ba8-be7a-b49912115429",
  "document_id": "afa46076-7181-41e0-98ba-d50f2f365fb5",
  "version_number": 1,
  "file_url": "https://example.com/pdf",
  "size": "1084",
  "type": "application/pdf",
  "last_modified": "2025-05-30T22:54:09.188Z",
  "uploaded_by": "169ccf88-3def-4bbe-8e92-91a0f74329e2",
  "createdAt": "2025-05-30T22:54:09.188Z",
  "updatedAt": "2025-05-30T22:54:09.188Z",
  "uploader": {
    "id": "169ccf88-3def-4bbe-8e92-91a0f74329e2",
    "name": "Gustavo Paiva",
    "email": "gustavo.paiva.gp1@gmail.com"
  }
}
```

### Dicas  
- Ferramentas: Biblioteca `diff` para comparar strings.  
- Documentação React para manipulação de listas e renderização condicional.  
- Exemplos de visualização de “diff” na web.

### O que aprenderá  
- Comparação e manipulação de dados textuais.  
- Integração entre backend e frontend para mostrar dados dinâmicos.  
- Uso de bibliotecas externas para resolver problemas comuns.  
- Renderização condicional em React.

---

## Tarefa 4: Filtro na busca por documentos / grupo de documentos / clientes / casos

### Nível de Complexidade  
Média-baixa

### Sugestões  
- Implemente endpoint REST que aceite parâmetros de filtro (ex: título, data, status).  
- No frontend, crie formulário para entrada desses filtros.  
- Implemente paginação simples para resultados.  
- Permita combinar múltiplos filtros simultaneamente.

### Dicas  
- Ferramentas: Sequelize `where` para filtros dinâmicos.  
- React Hook Form para controle do formulário de filtros.  
- Axios/Fetch para chamadas API.  
- Pesquise sobre paginação e filtros dinâmicos em APIs REST.

### O que aprenderá  
- Construção de consultas dinâmicas no banco.  
- Criação de formulários com múltiplos filtros.  
- Manipulação de estado para filtros e resultados.  
- Implementação de paginação e UX de busca.
