let lastResults = [];
// Realiza a busca pelo produto e cria os cards com as informações
document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const keyword = document.getElementById('keyword').value.trim();
  const resultsDiv = document.getElementById('results');
  const loader = document.getElementById('loader');
  const exportBtn = document.getElementById('exportButton');

  resultsDiv.innerHTML = '';
  exportBtn.classList.add('hidden');
  lastResults = [];

  if (!keyword) {
    resultsDiv.innerHTML = '<p>Por favor, insira uma palavra-chave.</p>';
    return;
  }

  loader.classList.remove('hidden');

  try {
    const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados');
    }

    const data = await response.json();

    if (data.length === 0) {
      resultsDiv.innerHTML = '<p>Nenhum produto encontrado.</p>';
      return;
    }

    lastResults = data;
    exportBtn.classList.remove('hidden');

    resultsDiv.innerHTML = '';
    data.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product');

      productCard.innerHTML = `
        <img src="${product.image}" alt="Product Image">
        <div class="product-info">
          <h3>${product.title}</h3>
          <p>Rating: ${product.rating} ⭐</p>
          <p>${product.reviews} avaliações</p>
        </div>
      `;

      resultsDiv.appendChild(productCard);
    });

  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = '<p>Ocorreu um erro. Tente novamente.</p>';
  } finally {
    loader.classList.add('hidden');
  }
});
// Pega os elementos pesquisados e faz o download das informações no formato csv
document.getElementById('exportButton').addEventListener('click', () => {
  if (!lastResults.length) return;

  const header = ['Título', 'Imagem', 'Rating', 'Avaliações'];
  const rows = lastResults.map(p => [
    `"${p.title.replace(/"/g, '""')}"`,
    p.image,
    p.rating,
    p.reviews
  ]);

  const csvContent = [header, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'produtos.csv');
  link.click();
});

const toggleTheme = document.getElementById('toggleTheme');

// Carregar tema salvo no localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  // Salvar preferência no localStorage
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
