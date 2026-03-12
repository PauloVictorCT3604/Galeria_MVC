// VIEW: responsável por tudo que é visual
// Renderiza o HTML, anima as transições e expõe callbacks para o Controller

const View = {

  elements: {
    gallery:         document.getElementById("gallery"),
    filters:         document.getElementById("filters"),
    pagination:      document.getElementById("pagination"),
    resultsCount:    document.getElementById("results-count"),
    currentCatLabel: document.getElementById("current-category"),
  },

  onFilter:     null,
  onPageChange: null,

  bindEvents() {
    // Delegação de evento — um único listener para todos os botões de filtro
    this.elements.filters.addEventListener("click", e => {
      const btn = e.target.closest(".filter-btn");
      if (btn && this.onFilter) this.onFilter(btn.dataset.category);
    });

    // Delegação de evento na paginação
    this.elements.pagination.addEventListener("click", e => {
      const btn = e.target.closest(".page-btn");
      if (btn && this.onPageChange) this.onPageChange(Number(btn.dataset.page));
    });
  },

  // Renderiza os botões de categoria no nav#filters
  renderFilters(categories, activeCategory) {
    const labels = {
      todas:      "✦ TODAS",
      natureza:   "🌿 NATUREZA",
      cidade:     "🏙️ CIDADE",
      animais:    "🦁 ANIMAIS",
      pessoas:    "👤 PESSOAS",
      tecnologia: "⚡ TECNOLOGIA",
    };

    this.elements.filters.innerHTML = categories.map(cat => `
      <button class="filter-btn ${cat === activeCategory ? "active" : ""}" data-category="${cat}">
        ${labels[cat] || cat.toUpperCase()}
      </button>
    `).join("");

    // Atualiza o label decorativo no header
    this.elements.currentCatLabel.textContent = labels[activeCategory] || activeCategory;
  },

  // Renderiza os cards com fade out → conteúdo → fade in
  async renderGallery(images, totalFiltered) {
    const gallery = this.elements.gallery;

    gallery.classList.add("fade-out");
    await this._wait(220);

    if (images.length === 0) {
      gallery.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">◈</span>
          <p>Nenhuma imagem encontrada.</p>
        </div>
      `;
    } else {
      gallery.innerHTML = images.map((img, i) => `
        <article class="card" style="animation-delay: ${i * 60}ms">
          <div class="card-img-wrap">
            <img src="${img.url}" alt="${img.title}" loading="lazy" />
            <div class="card-overlay">
              <span class="card-category">${img.category}</span>
            </div>
          </div>
          <div class="card-info">
            <h3>${img.title}</h3>
            <div class="card-tags">
              ${img.tags.map(t => `<span class="tag">${t}</span>`).join("")}
            </div>
          </div>
        </article>
      `).join("");
    }

    this.elements.resultsCount.textContent =
      `${totalFiltered} imagem${totalFiltered !== 1 ? "ns" : ""} encontrada${totalFiltered !== 1 ? "s" : ""}`;

    gallery.classList.remove("fade-out");
    gallery.classList.add("fade-in");
    await this._wait(300);
    gallery.classList.remove("fade-in");
  },

  renderPagination(currentPage, totalPages) {
    if (totalPages <= 1) {
      this.elements.pagination.innerHTML = "";
      return;
    }

    let html = `<button class="page-btn nav-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""}>←</button>`;

    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
    }

    html += `<button class="page-btn nav-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""}>→</button>`;

    this.elements.pagination.innerHTML = html;
  },

  _wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};