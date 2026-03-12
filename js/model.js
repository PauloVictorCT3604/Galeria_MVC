// MODEL: responsável pelos dados e pela lógica de filtragem
// Não sabe nada sobre HTML, só lida com dados puros

const Model = {

  // Banco de imagens — URLs apontam para a pasta img/ local
  images: [
    { id: 1,  category: "natureza",   title: "Floresta Densa",      url: "img/natureza1.jpg",   tags: ["verde", "árvores", "mata"] },
    { id: 2,  category: "natureza",   title: "Cachoeira",           url: "img/natureza2.jpg",   tags: ["água", "queda", "rio"] },
    { id: 3,  category: "natureza",   title: "Montanhas",           url: "img/natureza3.jpg",   tags: ["pico", "neve", "altitude"] },
    { id: 4,  category: "natureza",   title: "Pôr do Sol",          url: "img/natureza4.jpg",   tags: ["sol", "laranja", "céu"] },
    { id: 5,  category: "natureza",   title: "Lago Cristalino",     url: "img/natureza5.jpg",   tags: ["lago", "azul", "reflexo"] },
    { id: 6,  category: "cidade",     title: "Metrópole Noturna",   url: "img/cidade1.jpg",     tags: ["noite", "luzes", "urbano"] },
    { id: 7,  category: "cidade",     title: "Rua Movimentada",     url: "img/cidade2.jpg",     tags: ["rua", "pessoas", "calçada"] },
    { id: 8,  category: "cidade",     title: "Arranha-céus",        url: "img/cidade3.jpg",     tags: ["prédios", "arquitetura", "moderno"] },
    { id: 9,  category: "cidade",     title: "Ponte Histórica",     url: "img/cidade4.jpg",     tags: ["ponte", "estrutura", "histórico"] },
    { id: 10, category: "cidade",     title: "Mercado Local",       url: "img/cidade5.jpg",     tags: ["feira", "cores", "comércio"] },
    { id: 11, category: "animais",    title: "Leão Selvagem",       url: "img/animais1.jpg",    tags: ["leão", "savana", "felino"] },
    { id: 12, category: "animais",    title: "Pássaro Colorido",    url: "img/animais2.jpg",    tags: ["ave", "penas", "voo"] },
    { id: 13, category: "animais",    title: "Lobo na Neve",        url: "img/animais3.jpg",    tags: ["lobo", "inverno", "neve"] },
    { id: 14, category: "animais",    title: "Elefante Africano",   url: "img/animais4.jpg",    tags: ["elefante", "africa", "grande"] },
    { id: 15, category: "animais",    title: "Raposa Curiosa",      url: "img/animais5.jpg",    tags: ["raposa", "laranja", "floresta"] },
    { id: 16, category: "pessoas",    title: "Retrato Urbano",      url: "img/pessoas1.jpg",    tags: ["retrato", "expressão", "rosto"] },
    { id: 17, category: "pessoas",    title: "Dança Tradicional",   url: "img/pessoas2.jpg",    tags: ["dança", "cultura", "movimento"] },
    { id: 18, category: "pessoas",    title: "Crianças Brincando",  url: "img/pessoas3.jpg",    tags: ["criança", "alegria", "parque"] },
    { id: 19, category: "pessoas",    title: "Idoso Sábio",         url: "img/pessoas4.jpg",    tags: ["idoso", "sabedoria", "retrato"] },
    { id: 20, category: "pessoas",    title: "Atleta em Ação",      url: "img/pessoas5.jpg",    tags: ["esporte", "corrida", "energia"] },
    { id: 21, category: "tecnologia", title: "Circuito Eletrônico", url: "img/tecnologia1.jpg", tags: ["circuito", "eletrônica", "chip"] },
    { id: 22, category: "tecnologia", title: "Robô Avançado",       url: "img/tecnologia2.jpg", tags: ["robô", "ia", "futuro"] },
    { id: 23, category: "tecnologia", title: "Código na Tela",      url: "img/tecnologia3.jpg", tags: ["código", "programação", "tela"] },
    { id: 24, category: "tecnologia", title: "Datacenter",          url: "img/tecnologia4.jpg", tags: ["servidor", "nuvem", "dados"] },
    { id: 25, category: "tecnologia", title: "Wearable Tech",       url: "img/tecnologia5.jpg", tags: ["relógio", "smartwatch", "vestível"] },
  ],

  currentCategory: "todas",
  currentSearch: "",
  currentPage: 1,
  itemsPerPage: 5,

  // Retorna imagens filtradas por categoria e busca
  getFiltered() {
    return this.images.filter(img => {
      const matchCategory = this.currentCategory === "todas" || img.category === this.currentCategory;

      // Busca por título ou nas tags
      const query = this.currentSearch.toLowerCase();
      const matchSearch = query === ""
        || img.title.toLowerCase().includes(query)
        || img.tags.some(tag => tag.includes(query));

      return matchCategory && matchSearch;
    });
  },

  // Retorna a fatia da página atual
  getPage() {
    const filtered = this.getFiltered();
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(start, start + this.itemsPerPage);
  },

  getTotalPages() {
    return Math.ceil(this.getFiltered().length / this.itemsPerPage);
  },

  // Lista de categorias únicas extraídas dos dados
  getCategories() {
    const cats = [...new Set(this.images.map(img => img.category))];
    return ["todas", ...cats];
  },

  // Atualiza categoria e reseta para página 1
  setCategory(category) {
    this.currentCategory = category;
    this.currentPage = 1;
  },

  setSearch(term) {
    this.currentSearch = term;
    this.currentPage = 1;
  },

  setPage(page) {
    this.currentPage = page;
  }
};