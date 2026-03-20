function submitContactForm(e) {
  e.preventDefault();

  var btn = document.getElementById('formSubmitBtn');
  var feedback = document.getElementById('formFeedback');
  var nome = document.getElementById('formNome').value;
  var telefone = document.getElementById('formTelefone').value;
  var email = document.getElementById('formEmail').value;
  var servico = document.getElementById('formServico').value;
  var mensagem = document.getElementById('formMensagem').value;

  btn.disabled = true;
  btn.textContent = 'Enviando...';
  feedback.className = 'form-feedback';
  feedback.textContent = '';

  fetch('/api/contact-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: nome,
      telefone: telefone,
      email: email,
      servico: servico,
      mensagem: mensagem
    })
  })
    .then(function (res) {
      if (!res.ok) throw new Error('Erro');
      return res.json();
    })
    .then(function () {
      feedback.className = 'form-feedback success';
      feedback.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
      document.getElementById('contactForm').reset();
    })
    .catch(function () {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.';
    })
    .finally(function () {
      btn.disabled = false;
      btn.textContent = 'Enviar Mensagem';
    });
}
