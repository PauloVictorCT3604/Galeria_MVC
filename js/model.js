// MODEL: responsável pelos dados e pela lógica de filtragem
// Não sabe nada sobre HTML, só lida com dados puros

const Model = {

  // Banco de imagens — Picsum com seeds fixos, sempre retorna a mesma foto
  images: [
    { id: 1,  category: "natureza",   title: "Floresta Densa",      url: "https://picsum.photos/seed/forest1/600/400",  tags: ["verde", "árvores", "mata"] },
    { id: 2,  category: "natureza",   title: "Cachoeira",           url: "https://picsum.photos/seed/water2/600/400",   tags: ["água", "queda", "rio"] },
    { id: 3,  category: "natureza",   title: "Montanhas",           url: "https://picsum.photos/seed/mount3/600/400",   tags: ["pico", "neve", "altitude"] },
    { id: 4,  category: "natureza",   title: "Pôr do Sol",          url: "https://picsum.photos/seed/sunset4/600/400",  tags: ["sol", "laranja", "céu"] },
    { id: 5,  category: "natureza",   title: "Lago Cristalino",     url: "https://picsum.photos/seed/lake5/600/400",    tags: ["lago", "azul", "reflexo"] },
    { id: 6,  category: "cidade",     title: "Metrópole Noturna",   url: "https://picsum.photos/seed/city6/600/400",    tags: ["noite", "luzes", "urbano"] },
    { id: 7,  category: "cidade",     title: "Rua Movimentada",     url: "https://picsum.photos/seed/street7/600/400",  tags: ["rua", "pessoas", "calçada"] },
    { id: 8,  category: "cidade",     title: "Arranha-céus",        url: "https://picsum.photos/seed/sky8/600/400",     tags: ["prédios", "arquitetura", "moderno"] },
    { id: 9,  category: "cidade",     title: "Ponte Histórica",     url: "https://picsum.photos/seed/bridge9/600/400",  tags: ["ponte", "estrutura", "histórico"] },
    { id: 10, category: "cidade",     title: "Mercado Local",       url: "https://picsum.photos/seed/market10/600/400", tags: ["feira", "cores", "comércio"] },
    { id: 11, category: "animais",    title: "Leão Selvagem",       url: "https://picsum.photos/seed/lion11/600/400",   tags: ["leão", "savana", "felino"] },
    { id: 12, category: "animais",    title: "Pássaro Colorido",    url: "https://picsum.photos/seed/bird12/600/400",   tags: ["ave", "penas", "voo"] },
    { id: 13, category: "animais",    title: "Lobo na Neve",        url: "https://picsum.photos/seed/wolf13/600/400",   tags: ["lobo", "inverno", "neve"] },
    { id: 14, category: "animais",    title: "Elefante Africano",   url: "https://picsum.photos/seed/eleph14/600/400",  tags: ["elefante", "africa", "grande"] },
    { id: 15, category: "animais",    title: "Raposa Curiosa",      url: "https://picsum.photos/seed/fox15/600/400",    tags: ["raposa", "laranja", "floresta"] },
    { id: 16, category: "pessoas",    title: "Retrato Urbano",      url: "https://picsum.photos/seed/port16/600/400",   tags: ["retrato", "expressão", "rosto"] },
    { id: 17, category: "pessoas",    title: "Dança Tradicional",   url: "https://picsum.photos/seed/dance17/600/400",  tags: ["dança", "cultura", "movimento"] },
    { id: 18, category: "pessoas",    title: "Crianças Brincando",  url: "https://picsum.photos/seed/kids18/600/400",   tags: ["criança", "alegria", "parque"] },
    { id: 19, category: "pessoas",    title: "Idoso Sábio",         url: "https://picsum.photos/seed/elder19/600/400",  tags: ["idoso", "sabedoria", "retrato"] },
    { id: 20, category: "pessoas",    title: "Atleta em Ação",      url: "https://picsum.photos/seed/sport20/600/400",  tags: ["esporte", "corrida", "energia"] },
    { id: 21, category: "tecnologia", title: "Circuito Eletrônico", url: "https://picsum.photos/seed/tech21/600/400",   tags: ["circuito", "eletrônica", "chip"] },
    { id: 22, category: "tecnologia", title: "Robô Avançado",       url: "https://picsum.photos/seed/robot22/600/400",  tags: ["robô", "ia", "futuro"] },
    { id: 23, category: "tecnologia", title: "Código na Tela",      url: "https://picsum.photos/seed/code23/600/400",   tags: ["código", "programação", "tela"] },
    { id: 24, category: "tecnologia", title: "Datacenter",          url: "https://picsum.photos/seed/data24/600/400",   tags: ["servidor", "nuvem", "dados"] },
    { id: 25, category: "tecnologia", title: "Wearable Tech",       url: "https://picsum.photos/seed/wear25/600/400",   tags: ["relógio", "smartwatch", "vestível"] },
  ],

  currentCategory: "todas",
  currentPage: 1,
  itemsPerPage: 4,

  // Retorna todas as imagens ou só as da categoria selecionada
  getFiltered() {
    if (this.currentCategory === "todas") return this.images;
    return this.images.filter(img => img.category === this.currentCategory);
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

  setPage(page) {
    this.currentPage = page;
  }
};