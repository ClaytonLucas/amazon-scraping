# 🛍️ Amazon Product Scraper

Aplicação fullstack simples para buscar e exibir listagens de produtos da Amazon com base em uma palavra-chave. O projeto utiliza scraping no backend com Bun, Express, Axios e JSDOM, e um frontend moderno com Vite + Vanilla JS.

---

## 🎯 Objetivo

Scrapear os resultados da primeira página de buscas da Amazon para um termo fornecido pelo usuário e exibir as informações de cada produto.

---

## ✅ Funcionalidades

- 🔍 Campo de busca para inserir uma palavra-chave
- 🧠 Scraping da Amazon (título, avaliação, número de reviews e imagem)
- 📊 Exibição dos dados com layout responsivo
- 💾 Exportação dos resultados para CSV
- 🌗 Suporte a Dark Mode
- 💥 Tratamento de erros no frontend e backend

---

## ⚙️ Tecnologias Utilizadas

### 🔧 Backend
- [Bun](https://bun.sh/) — runtime ultrarrápido
- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/)
- [JSDOM](https://github.com/jsdom/jsdom)

### 🎨 Frontend
- [Vite](https://vitejs.dev/)
- HTML5, CSS3, JavaScript (ESModules)

---

## 🛠️ Como rodar o projeto

### 1. Instale o Bun (se ainda não tiver)

curl -fsSL https://bun.sh/install | bash


### 2. Clone o repositório

- git clone https://github.com/ClaytonLucas/amazon-scraping.git
- cd amazon-scraping

### 3. Rodar o Backend (Bun)

- cd amazon-scraper-backend
- bun install
- bun run dev

O servidor estará disponível em http://localhost:3000.

### 4. Rodar o Frontend (Vite)

- cd amazon-scraper-frontend
- bun install
- bun run dev

O frontend estará disponível em http://localhost:5173.

---

## 📦 Endpoint da API
```bash
GET /api/scrape?keyword=palavra-chave

```

Retorna uma lista de produtos no seguinte formato:

```json
[
  {
    "title": "Nome do Produto",
    "rating": "4.5",
    "reviews": "150",
    "image": "https://link-da-imagem.jpg"
  },
  {
    "title": "Outro Produto",
    "rating": "4.0",
    "reviews": "98",
    "image": "https://link-da-outra-imagem.jpg"
  }
]

```

---
### ⚠️ Observações

A Amazon pode bloquear requisições frequentes ou suspeitas. Evite enviar muitas buscas em sequência.

O scraping depende da estrutura atual do HTML da Amazon. Mudanças podem afetar o funcionamento do projeto.