
function copyContent() {
  const content = document.getElementById('clip-content').value;
  navigator.clipboard.writeText(content);
  document.getElementById('copiedMessage').style.display = 'block';
}