/* Redirect user after login based on role */
export function routeByRole(token) {
  const { role } = JSON.parse(atob(token.split('.')[1]));
  if (role === 'admin') window.location.href = 'admin-dashboard.html';
  else window.location.href = 'client-dashboard.html';
}
