// Minimal smoke test confirming the TODO app itself loads and renders.
// Deeper critical-journey coverage (create/edit/toggle/delete/error) lives
// in ./todo-journeys.spec.js.
const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

test.describe('App smoke test', () => {
  test('loads the TODO app and shows the heading', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();

    await expect(todoPage.heading).toBeVisible();
  });
});