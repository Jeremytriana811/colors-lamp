// Real HTTP requests to the repository's PHP endpoints and disposable MySQL DB.
// GitHub Actions starts PHP and MySQL before this suite runs.
const baseUrl = process.env.COLORS_TEST_URL || 'http://127.0.0.1:8765';

async function post(endpoint, body) {
  const response = await fetch(`${baseUrl}/api/${endpoint}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty('error');
  return data;
}

test('Login.php returns a user ID and names for a valid test account', async () => {
  const data = await post('Login.php', {
    login: 'ci_student', password: 'ci_password',
  });
  expect(data).toMatchObject({
    id: 1, firstName: 'Test', lastName: 'Student', error: '',
  });
});

test('AddColor.php persists a color retrievable through SearchColors.php', async () => {
  const added = await post('AddColor.php', { color: 'Blue', userId: 1 });
  expect(added.error).toBe('');

  const searched = await post('SearchColors.php', { search: 'Blu', userId: 1 });
  expect(searched.error).toBe('');
  expect(Array.isArray(searched.results)).toBe(true);
  expect(searched.results).toContain('Blue');
});

test('Login.php returns a JSON error for an invalid password', async () => {
  const data = await post('Login.php', {
    login: 'ci_student', password: 'wrong_password',
  });
  expect(data.id).toBe(0);
  expect(data.error).toBe('No Records Found');
});
