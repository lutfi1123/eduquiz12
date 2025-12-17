let questions = [
  {
    q: "Ibukota Indonesia?",
    options: ["Jakarta", "Bandung", "Surabaya"],
    correct: 0
  },
  {
    q: "2 + 2 = ?",
    options: ["3", "4", "5"],
    correct: 1
  }
];

let index = 0;
let score = 0;
let time = 30;
let timer;
let player = "";
let ranking = [];

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function startQuiz() {
  player = document.getElementById('playerName').value;
  if (player === "") return alert("Masukkan nama dulu!");

  index = 0;
  score = 0;
  time = 30;
  showPage('quiz');
  showQuestion();

  timer = setInterval(() => {
    time--;
    document.getElementById('timer').innerText = "Waktu: " + time;
    if (time === 0) endQuiz();
  }, 1000);
}

function showQuestion() {
  if (index >= questions.length) return endQuiz();

  document.getElementById('question').innerText = questions[index].q;
  let opt = document.getElementById('options');
  opt.innerHTML = "";

  questions[index].options.forEach((text, i) => {
    let btn = document.createElement('button');
    btn.innerText = String.fromCharCode(65 + i) + ". " + text;
    btn.onclick = () => {
      if (i === questions[index].correct) {
        score += 10;
      }
      index++;
      showQuestion();
    };
    opt.appendChild(btn);
  });
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById('finalScore').innerText = `Nama: ${player} | Skor: ${score}`;

  ranking.push({ name: player, score: score });
  ranking.sort((a, b) => b.score - a.score);

  showPage('score');
}

function addQuestion() {
  let q = document.getElementById('newQ').value;
  let a = document.getElementById('optA').value;
  let b = document.getElementById('optB').value;
  let c = document.getElementById('optC').value;
  let correct = parseInt(document.getElementById('correctOpt').value);

  if (q && a && b && c) {
    questions.push({
      q: q,
      options: [a, b, c],
      correct: correct
    });

    alert('Soal pilihan ganda berhasil ditambahkan');

    document.getElementById('newQ').value = "";
    document.getElementById('optA').value = "";
    document.getElementById('optB').value = "";
    document.getElementById('optC').value = "";
  } else {
    alert('Lengkapi semua kolom soal!');
  }
};{
    alert('Soal berhasil ditambahkan');
}


function showRanking() {
  let list = document.getElementById('ranking');
  list.innerHTML = "";
  ranking.forEach(r => {
    let li = document.createElement('li');
    li.innerText = `${r.name} - ${r.score}`;
    list.appendChild(li);
  });
}

document.getElementById('rank').addEventListener('click', showRanking);