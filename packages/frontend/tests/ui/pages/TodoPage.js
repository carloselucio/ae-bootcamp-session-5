// Page Object Model for the TODO app's main page.
// Centralizes selectors and interactions so test files stay focused on
// scenario intent and assertions.
class TodoPage {
  constructor(page) {
    this.page = page;
    this.titleInput = page.getByPlaceholder(/what needs to be done/i);
    this.addButton = page.getByRole('button', { name: /^add$/i });
    this.heading = page.getByRole('heading', { name: /todo app/i });
  }

  async goto() {
    await this.page.goto('/');
    await this.heading.waitFor({ state: 'visible' });
  }

  async addTodo(title) {
    await this.titleInput.fill(title);
    await this.addButton.click();
  }

  getTodoItem(title) {
    return this.page.getByRole('listitem').filter({ hasText: title });
  }

  async toggleTodo(title) {
    const item = this.getTodoItem(title);
    await item.getByRole('checkbox').click();
  }

  async deleteTodo(title) {
    const item = this.getTodoItem(title);
    await item.getByRole('button', { name: /delete/i }).click();
  }

  async startEdit(title) {
    const item = this.getTodoItem(title);
    await item.getByRole('button', { name: /edit/i }).click();
  }

  async saveEdit(originalTitle, newTitle) {
    // Do not re-filter by the original title text here: once edit mode is
    // active, the title text node is replaced by a textbox, so a
    // `hasText` filter on the original title would never match again.
    // Instead, locate the list item currently in edit mode by the presence
    // of its textbox descendant.
    const item = this.page
      .getByRole('listitem')
      .filter({ has: this.page.getByRole('textbox') });
    const editInput = item.getByRole('textbox');
    await editInput.fill(newTitle);
    await item.getByRole('button', { name: /save/i }).click();
  }

  getEmptyStateMessage() {
    return this.page.getByText(/no todos yet/i);
  }

  getErrorAlert() {
    return this.page.getByText(/error loading todos/i);
  }

  itemsLeftChip(count) {
    return this.page.getByText(`${count} items left`);
  }

  completedChip(count) {
    return this.page.getByText(`${count} completed`);
  }
}

module.exports = { TodoPage };
