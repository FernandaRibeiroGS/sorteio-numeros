const btnSortear  = document.getElementById('btnSortear');
const btnReset    = document.getElementById('btnReset');
const resultado   = document.getElementById('resultado');
const historico   = document.getElementById('historico');
const contador    = document.getElementById('contador');
const inputMin    = document.getElementById('min');
const inputMax    = document.getElementById('max');
const semSorteio  = document.getElementById('semSorteio');
const semHistorico = document.getElementById('semHistorico');

let sorteados = new Set();

function totalDisponiveis() {
  const min = parseInt(inputMin.value);
  const max = parseInt(inputMax.value);
  return max - min + 1 - sorteados.size;
}

function atualizarBotao() {
  btnSortear.disabled = totalDisponiveis() <= 0;
}

function sortear() {
  const min = parseInt(inputMin.value);
  const max = parseInt(inputMax.value);

  if (isNaN(min) || isNaN(max) || min > max) {
    alert('Intervalo inválido. Verifique os valores.');
    return;
  }

  if (totalDisponiveis() <= 0) return;

  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (sorteados.has(num));

  sorteados.add(num);

  resultado.classList.remove('hidden');
  resultado.style.animation = 'none';
  resultado.offsetHeight;
  resultado.style.animation = '';
  resultado.textContent = num;
  semSorteio.style.display = 'none';

  document.querySelectorAll('.num-badge.ultimo').forEach(el => el.classList.remove('ultimo'));

  const badge = document.createElement('div');
  badge.className = 'num-badge ultimo';
  badge.textContent = num;
  historico.prepend(badge);

  semHistorico.style.display = 'none';

  contador.textContent = sorteados.size;
  contador.style.display = 'inline';

  atualizarBotao();
}

function reiniciar() {
  sorteados.clear();
  resultado.classList.add('hidden');
  semSorteio.style.display = '';
  historico.innerHTML = '';
  semHistorico.style.display = '';
  contador.textContent = '';
  contador.style.display = 'none';
  btnSortear.disabled = false;
}

btnSortear.addEventListener('click', sortear);
btnReset.addEventListener('click', reiniciar);
inputMin.addEventListener('change', reiniciar);
inputMax.addEventListener('change', reiniciar);
