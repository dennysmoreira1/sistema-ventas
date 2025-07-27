import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sistema de ventas', () => {
  render(<App />);
  // Verificar que la aplicación se renderiza correctamente
  expect(document.querySelector('#root')).toBeInTheDocument();
});
