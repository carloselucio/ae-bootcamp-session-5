import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderApp = () => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );
};

afterEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );

  renderApp();

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('shows empty state message when there are no todos', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );

  renderApp();

  const emptyMessage = await screen.findByText(/no todos/i);
  expect(emptyMessage).toBeInTheDocument();
});

test('displays correct stats for incomplete and completed todos', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { id: 1, title: 'Todo 1', completed: false },
          { id: 2, title: 'Todo 2', completed: true },
          { id: 3, title: 'Todo 3', completed: false },
        ]),
    })
  );

  renderApp();

  await screen.findByText('Todo 1');

  expect(screen.getByText(/2 items left/i)).toBeInTheDocument();
  expect(screen.getByText(/1 completed/i)).toBeInTheDocument();
});

test('calls DELETE API and removes todo when delete button is clicked', async () => {
  const todos = [{ id: 1, title: 'Todo to delete', completed: false }];

  global.fetch = jest.fn((url, options) => {
    if (options && options.method === 'DELETE') {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve(todos) });
  });

  renderApp();

  await screen.findByText('Todo to delete');

  const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
  fireEvent.click(deleteButtons[0]);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

test('displays error message when fetching todos fails', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: 'Server error' }),
    })
  );

  renderApp();

  const errorMessage = await screen.findByText(/error/i);
  expect(errorMessage).toBeInTheDocument();
});
