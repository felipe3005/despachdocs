function openWhatsAppModal(e) {
  if (e) e.preventDefault();
  document.getElementById('wppModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('wppMessage').focus();
}

function closeWhatsAppModal() {
  document.getElementById('wppModal').classList.remove('active');
  document.body.style.overflow = '';
}

function sendWhatsApp() {
  var msg = document.getElementById('wppMessage').value.trim();
  if (!msg) msg = 'Olá, gostaria de solicitar um orçamento.';
  var texto = '*[Contato via site DespachDocs]*\n\n' + msg;
  var url = 'https://api.whatsapp.com/send?phone=5519997908100&text=' + encodeURIComponent(texto);
  window.open(url, '_blank');
  closeWhatsAppModal();
}

document.getElementById('wppModal').addEventListener('click', function (e) {
  if (e.target === this) closeWhatsAppModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeWhatsAppModal();
});
