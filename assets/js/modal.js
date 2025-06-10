
document.querySelectorAll('[data-dialog]').forEach(btn => {
  btn.addEventListener('click', () => {
    const dialog = document.getElementById(btn.dataset.dialog);
    if (dialog) dialog.showModal();
  });
});


document.querySelectorAll('.closeBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const dialog = btn.closest('dialog');
    if (dialog) dialog.close();
  });
});
