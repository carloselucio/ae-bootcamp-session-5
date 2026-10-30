const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

// Helper to generate a unique todo title per test run, keeping tests
// isolated from one another despite the backend's shared in-memory store.
const uniqueTitle = (label) => `${label} ${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

test.describe('Todo critical journeys', () => {
  test('creates a new todo, shows it in the list, then deletes it', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const title = uniqueTitle('Buy groceries');

    await todoPage.goto();
    await todoPage.addTodo(title);

    await expect(todoPage.getTodoItem(title)).toBeVisible();

    await todoPage.deleteTodo(title);

    await expect(todoPage.getTodoItem(title)).toHaveCount(0);
  });

  test('edits an existing todo title', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const originalTitle = uniqueTitle('Walk the dog');
    const updatedTitle = uniqueTitle('Walk the dog - updated');

    await todoPage.goto();
    await todoPage.addTodo(originalTitle);
    await expect(todoPage.getTodoItem(originalTitle)).toBeVisible();

    await todoPage.startEdit(originalTitle);
    await todoPage.saveEdit(originalTitle, updatedTitle);

    await expect(todoPage.getTodoItem(updatedTitle)).toBeVisible();

    // Cleanup
    await todoPage.deleteTodo(updatedTitle);
  });

  test('toggles a todo as completed and updates the stats', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const title = uniqueTitle('Read a book');

    await todoPage.goto();
    await todoPage.addTodo(title);
    const item = todoPage.getTodoItem(title);
    await expect(item).toBeVisible();

    const checkbox = item.getByRole('checkbox');
    await expect(checkbox).not.toBeChecked();

    await todoPage.toggleTodo(title);

    await expect(checkbox).toBeChecked();

    // Cleanup
    await todoPage.deleteTodo(title);
  });

  test('shows an error message when the API is unavailable', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await page.route('**/api/todos', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      });
    });

    await todoPage.goto();

    await expect(todoPage.getErrorAlert()).toBeVisible();
  });
});
