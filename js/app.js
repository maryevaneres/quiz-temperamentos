// Quiz app (vanilla JS) - comentários para facilitar manutenção

// Dados do quiz: perguntas, opções (A-D)
const QUESTIONS = [
  {
    q: "Quando surge um problema no relacionamento, você tende a:",
    a: {A: "Falar bastante, expressar o que sente e tentar aliviar o clima.", B: "Buscar uma solução rápida e objetiva.", C: "Pensar muito antes de falar e analisar todos os detalhes.", D: "Evitar conflito e esperar as coisas acalmarem."}
  },
  {
    q: "Em um grupo de casais, você normalmente:",
    a: {A: "Conversa com facilidade e anima o ambiente.", B: "Assume a liderança e ajuda a organizar as coisas.", C: "Observa mais, analisa e fala quando acha necessário.", D: "Prefere ficar tranquilo, ouvindo e acompanhando o grupo."}
  },
  {
    q: "Quando precisa tomar uma decisão importante:",
    a: {A: "Decide com base no entusiasmo do momento.", B: "Decide rápido e parte para a ação.", C: "Analisa possibilidades, riscos e detalhes.", D: "Demora um pouco porque prefere evitar pressão."}
  },
  {
    q: "Quando alguém te critica, você costuma:",
    a: {A: "Ficar chateado, mas logo tenta mudar o clima.", B: "Se defender e explicar seu ponto com firmeza.", C: "Guardar aquilo e pensar bastante depois.", D: "Ficar quieto para evitar discussão."}
  },
  {
    q: "No relacionamento, você demonstra amor principalmente:",
    a: {A: "Com palavras, carinho, presença e alegria.", B: "Com atitudes práticas, proteção e iniciativa.", C: "Com cuidado nos detalhes, dedicação e lealdade.", D: "Com paciência, constância e tranquilidade."}
  },
  {
    q: "Diante de uma mudança inesperada:",
    a: {A: "Tenta se adaptar e ver o lado positivo.", B: "Assume o controle e procura resolver.", C: "Fica desconfortável e quer entender tudo antes.", D: "Aceita aos poucos, desde que não haja muita pressão."}
  },
  {
    q: "Em uma discussão, seu maior desafio é:",
    a: {A: "Falar demais ou deixar a emoção tomar conta.", B: "Querer ter razão ou resolver tudo do seu jeito.", C: "Guardar mágoas ou analisar demais a situação.", D: "Fugir da conversa ou deixar para depois."}
  },
  {
    q: "Quando está feliz, você geralmente:",
    a: {A: "Demonstra bastante e contagia quem está perto.", B: "Fica motivado para fazer planos e agir.", C: "Valoriza o momento, mas de forma mais reservada.", D: "Curte em paz, sem precisar de muita exposição."}
  },
  {
    q: "O que mais te incomoda em uma relação?",
    a: {A: "Falta de atenção, frieza ou distância emocional.", B: "Falta de atitude, indecisão ou enrolação.", C: "Falta de cuidado, profundidade ou compromisso.", D: "Brigas constantes, pressão ou clima pesado."}
  },
  {
    q: "Qual frase mais combina com você?",
    a: {A: "“Gosto de viver com leveza, alegria e conexão.”", B: "“Gosto de resolver, liderar e fazer acontecer.”", C: "“Gosto de profundidade, cuidado e significado.”", D: "“Gosto de paz, estabilidade e equilíbrio.”"}
  }
];

// Map de letras para temperamentos (chave)
const MAP = { A: "Sanguíneo", B: "Colérico", C: "Melancólico", D: "Fleumático" };

// Descrições e textos para resultados
const RESULTS = {
  "Sanguíneo": {
    desc: "Você tende a ser comunicativo, alegre, espontâneo e cheio de energia. Gosta de conexão, presença e ambientes leves.",
    strong: ["Facilidade para se expressar", "Bom humor", "Criatividade", "Capacidade de aproximar pessoas"],
    attention: ["Cuidado para não agir só pela emoção", "Falar sem pensar", "Fugir da constância"],
    reflection: "A alegria aproxima, mas a maturidade sustenta."
  },
  "Colérico": {
    desc: "Você tende a ser objetivo, intenso, decidido e orientado para ação. Gosta de resolver problemas e seguir em frente.",
    strong: ["Liderança", "Coragem", "Iniciativa", "Capacidade de tomar decisões"],
    attention: ["Cuidado para não controlar tudo", "Atropelar sentimentos", "Transformar conversas em disputas"],
    reflection: "A força que lidera também precisa aprender a ouvir."
  },
  "Melancólico": {
    desc: "Você tende a ser profundo, sensível, cuidadoso e analítico. Valoriza significado, lealdade e detalhes.",
    strong: ["Dedicação", "Percepção", "Responsabilidade", "Capacidade de amar com profundidade"],
    attention: ["Cuidado para não guardar mágoas", "Cobrar perfeição", "Pensar demais antes de conversar"],
    reflection: "A profundidade é preciosa quando caminha junto com graça."
  },
  "Fleumático": {
    desc: "Você tende a ser calmo, paciente, conciliador e estável. Gosta de paz, segurança e equilíbrio.",
    strong: ["Paciência", "Escuta", "Constância", "Capacidade de acalmar ambientes"],
    attention: ["Cuidado para não evitar conversas importantes", "Adiar decisões", "Se acomodar"],
    reflection: "A paz é uma virtude, mas o amor também pede movimento."
  }
};

// Elementos DOM
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const progressEl = document.getElementById("progress");
const questionText = document.getElementById("question-text");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");

const resultName = document.getElementById("result-name");
const resultDesc = document.getElementById("result-desc");
const resultStrong = document.getElementById("result-strong");
const resultAttention = document.getElementById("result-attention");
const resultReflection = document.getElementById("result-reflection");
const retryBtn = document.getElementById("retry-btn");
const printBtn = document.getElementById("print-btn");

// Estado do quiz
let current = 0;
let answers = []; // armazena 'A'|'B'|'C'|'D'

// Inicializar
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", handleNext);
retryBtn.addEventListener("click", resetQuiz);
printBtn.addEventListener("click", handlePrint);

function startQuiz(){
  startScreen.classList.add("hidden");
  startScreen.setAttribute("aria-hidden", "true");
  quizScreen.classList.remove("hidden");
  quizScreen.setAttribute("aria-hidden", "false");
  current = 0;
  answers = [];
  renderQuestion();
}

function renderQuestion(){
  const q = QUESTIONS[current];
  progressEl.textContent = `Pergunta ${current + 1} de ${QUESTIONS.length}`;
  questionText.textContent = q.q;

  // Limpa alternativas
  answersEl.innerHTML = "";

  // Criar botões para cada alternativa A..D
  for (const key of ["A","B","C","D"]) {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.type = "button";
    btn.dataset.letter = key;
    btn.innerHTML = `<strong>${key}.</strong> ${q.a[key]}`;
    btn.addEventListener("click", () => selectAnswer(btn));
    answersEl.appendChild(btn);
  }

  nextBtn.disabled = true;
}

function selectAnswer(btn){
  // Marca visualmente seleção (um por vez)
  Array.from(answersEl.children).forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");

  // Habilita próximo
  nextBtn.disabled = false;
}

function handleNext(){
  // Encontrar seleção
  const selected = answersEl.querySelector(".answer-btn.selected");
  if(!selected) return;
  const letter = selected.dataset.letter;
  answers.push(letter);

  // avançar ou mostrar resultado
  current++;
  if(current < QUESTIONS.length){
    renderQuestion();
    // scroll to top of card for melhor UX em celulares
    window.scrollTo({top:0,behavior:"smooth"});
  } else {
    showResults();
  }
}

function showResults(){
  // computa pontuação
  const counts = { "Sanguíneo":0, "Colérico":0, "Melancólico":0, "Fleumático":0 };

  for(const letter of answers){
    const key = MAP[letter];
    if(key) counts[key]++;
  }

  // determina máximo e possíveis empates
  const max = Math.max(...Object.values(counts));
  const winners = Object.keys(counts).filter(k => counts[k] === max);

  quizScreen.classList.add("hidden");
  quizScreen.setAttribute("aria-hidden", "true");

  resultScreen.classList.remove("hidden");
  resultScreen.setAttribute("aria-hidden", "false");

  if(winners.length === 1){
    const t = winners[0];
    resultName.textContent = t;
    resultDesc.textContent = RESULTS[t].desc;
    // preencher listas
    resultStrong.innerHTML = RESULTS[t].strong.map(s => `<li>${s}</li>`).join("");
    resultAttention.innerHTML = RESULTS[t].attention.map(s => `<li>${s}</li>`).join("");
    resultReflection.textContent = RESULTS[t].reflection;
  } else {
    // Empate - lista temperamentos empatados
    resultName.textContent = "Você tem traços fortes de mais de um temperamento";
    resultDesc.textContent = `Temperamentos empatados: ${winners.join(", ")}.`;
    resultStrong.innerHTML = winners.map(t => `<li><strong>${t}:</strong> ${RESULTS[t].desc}</li>`).join("");
    resultAttention.innerHTML = winners.map(t => `<li><strong>${t} - pontos de atenção:</strong> ${RESULTS[t].attention.join("; ")}</li>`).join("");
    resultReflection.textContent = "Cada temperamento traz beleza e desafios — conversar com seu cônjuge pode ajudar a integrar essas diferenças.";
  }

  // rolar para topo do resultado em mobile
  window.scrollTo({top:0,behavior:"smooth"});
}

// Reiniciar quiz
function resetQuiz(){
  resultScreen.classList.add("hidden");
  resultScreen.setAttribute("aria-hidden", "true");
  startScreen.classList.remove("hidden");
  startScreen.setAttribute("aria-hidden", "false");
}

// Botão de print / compartilhar
async function handlePrint(){
  // Tenta usar Web Share API com texto do resultado (melhor em mobile)
  const text = `${document.getElementById("result-title").textContent} ${resultName.textContent}\n\n${resultDesc.textContent}\n\n${resultReflection.textContent}\n\nCompartilhe com seu cônjuge.`;
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Meu temperamento — Casal na Medida Certa',
        text
      });
      return;
    } catch(e){
      // se usuário cancelou, segue para print
    }
  }
  // fallback: abrir diálogo de impressão
  window.print();
}

// Comentários:
// - Para alterar perguntas, edite o array QUESTIONS acima.
// - Para trocar textos de resultado, edite o objeto RESULTS.
// - Para adicionar captura de imagem do resultado (exportar como imagem), pode-se integrar html2canvas antes do evento (opcional).
