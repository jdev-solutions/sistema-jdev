document.addEventListener('DOMContentLoaded', () => {
    fetch('/produtos', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Erro:', error));
  });