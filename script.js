const btnSortear     = document.getElementById('btnSortear');
const btnReset       = document.getElementById('btnReset');
const resultado      = document.getElementById('resultado');
const historico      = document.getElementById('historico');
const contador       = document.getElementById('contador');
const inputMin       = document.getElementById('min');
const inputMax       = document.getElementById('max');
const semSorteio     = document.getElementById('semSorteio');
const semHistorico   = document.getElementById('semHistorico');
const infoTotal      = document.getElementById('infoTotal');
const infoSorteados  = document.getElementById('infoSorteados');
const infoDisponiveis = document.getElementById('infoDisponiveis');
const progressFill   = document.getElementById('progressFill');
const progressPct    = document.getElementById('progressPct');

let sorteados = new Set();

function getMin() { return parseInt(inputMin.value); }
function getMax() { return parseInt(inputMax.value); }
function total()  { return getMax() - getMin() + 1; }

function atualizarInfo() {
  const t = total();
  const s = sorteados.size;
  const d = t - s;
  const pct = t > 0 ? Math.round((s / t) * 100) : 0;

  infoTotal.textContent       = t > 0 ? t : '—';
  infoSorteados.textContent   = s;
  infoDisponiveis.textContent = d > 0 ? d : '0';
  progressFill.style.width    = pct + '%';
  progressPct.textContent     = pct + '%';
  btnSortear.disabled         = d <= 0;
}

function sortear() {
  const min = getMin();
  const max = getMax();

  if (isNaN(min) || isNaN(max) || min > max) {
    alert('Intervalo inválido. Verifique os valores.');
    return;
  }

  if (total() - sorteados.size <= 0) return;

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

  atualizarInfo();
}

function reiniciar() {
  sorteados.clear();
  resultado.classList.add('hidden');
  semSorteio.style.display = '';
  historico.innerHTML = '';
  semHistorico.style.display = '';
  contador.textContent = '';
  contador.style.display = 'none';
  atualizarInfo();
}

inputMin.addEventListener('change', reiniciar);
inputMax.addEventListener('change', reiniciar);
btnSortear.addEventListener('click', sortear);
btnReset.addEventListener('click', reiniciar);

atualizarInfo();
