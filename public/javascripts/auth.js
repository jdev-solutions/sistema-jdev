if (!localStorage.getItem('token')) {
    window.location.href = '/login'; // Redireciona para login se não estiver autenticado
  }