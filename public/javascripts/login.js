document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');

  if (!form) {
      console.error("Erro: Formulário não encontrado.");
      return;
  }

  form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Evita o recarregamento da página

      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');

      if (!emailInput || !passwordInput) {
          console.error("Erro: Campos de email ou senha não encontrados.");
          return;
      }

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
          alert('Preencha todos os campos.');
          return;
      }

      try {
          const response = await fetch('/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
          });

          const data = await response.json();

          if (data.success) {
              localStorage.setItem('token', data.token);
              window.location.href = '/'; // Redireciona para a página principal
          } else {
              alert('Falha no login: ' + (data.message || 'Credenciais inválidas.'));
          }
      } catch (error) {
          console.error('Erro ao fazer login:', error);
          alert('Erro ao conectar com o servidor.');
      }
  });
});