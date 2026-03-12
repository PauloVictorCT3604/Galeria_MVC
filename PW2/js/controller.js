// CONTROLLER: conecta Model e View sem que eles se conheçam

const Controller = {

  init() {
    View.onFilter     = (category) => this.handleFilter(category);
    View.onPageChange = (page)     => this.handlePageChange(page);

    View.bindEvents();
    this.refresh();
  },

  handleFilter(category) {
    Model.setCategory(category);
    this.refresh();
  },

  handlePageChange(page) {
    const total = Model.getTotalPages();
    if (page < 1 || page > total) return;
    Model.setPage(page);
    this.refresh();
  },

  // Puxa dados do Model e manda a View renderizar tudo
  async refresh() {
    const categories    = Model.getCategories();
    const pageImages    = Model.getPage();
    const totalFiltered = Model.getFiltered().length;
    const totalPages    = Model.getTotalPages();

    View.renderFilters(categories, Model.currentCategory);
    await View.renderGallery(pageImages, totalFiltered);
    View.renderPagination(Model.currentPage, totalPages);
  }
};