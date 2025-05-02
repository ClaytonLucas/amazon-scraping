import express from "express";
import axios from "axios";
import { JSDOM } from "jsdom";
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword as string;

  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  try {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    /// Para evitar o bloqueio pela amazon se fez necessário alternar os userAgents a cada nova busca
    const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
      ];
    const { data: html } = await axios.get(url, {
      /// O header foi criado com muitos detalhes para simular um navegador real e evitar o bloqueio da amazon
      headers: {
        "User-Agent": userAgents[Math.floor(Math.random() * userAgents.length)],
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",  
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Cache-Control": "max-age=0",
      }
    });

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const products: any[] = [];

    const items = document.querySelectorAll("[data-component-type='s-search-result']");
    // Busca as informações dos produtos
    items.forEach((item) => {
      const titleElement = item.querySelector("h2 span");
      const ratingElement = item.querySelector("[aria-label*='out of 5 stars']");
      const reviewsElement = item.querySelector("[aria-label*=' ratings']");
      const imageElement = item.querySelector("img");

      const title = titleElement?.textContent?.trim() || null;
      const rating = ratingElement?.getAttribute("aria-label") || null;
      const reviews = reviewsElement?.getAttribute("aria-label") || null;
      const image = imageElement?.getAttribute("src") || null;

      products.push({
        title,
        rating,
        reviews,
        image,
      });
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados da Amazon" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
