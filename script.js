/* =========================================================
   CONFIGURAÇÃO — edite aqui os dados de contato da loja
   ========================================================= */
const CONFIG = {
  nomeLoja: "Doces Sonhos da Lô",
  // link de clique-para-conversar do WhatsApp Business
  whatsappLink: "https://wa.me/message/G4KFZELIOJJXB1",
  instagram: "https://www.instagram.com/docesonhosdalo?igsh=MWdhOHlsdDNhcGp1cw%3D%3D&utm_source=qr",
  ifood: "https://www.ifood.com.br/delivery/curitiba-pr/doces-sonhos-da-lo-alto-boqueirao/01359ccf-c8c1-4279-bd7b-15a45229e3f0?utm_medium=share",
};


const PRODUTOS = [
  { id: 1, nome: "Brigadeiro", categoria: "Trufas", preco: 0, peso: "30g",
    descricao: "Chocolate intenso, cremoso e irresistível.",
    imagem: "Trufa de brigadeiro.png" },
  { id: 2, nome: "Ninho", categoria: "Trufas", preco: 0, peso: "30g",
    descricao: "Recheio cremoso e irresistível de leite Ninho.",
    imagem: "Trufa de ninho.png" },
  { id: 3, nome: "Mousse de Limão", categoria: "Trufas", preco: 0, peso: "30g",
    descricao: "Recheio cremoso, refrescante, com equilíbrio entre doce e cítrico.",
    imagem: "Trufa de limão.png" },
  { id: 4, nome: "Dois Amores", categoria: "Trufas", preco: 0, peso: "30g",
    descricao: "A combinação perfeita entre Brigadeiro e Ninho em uma única trufa.",
    imagem: "Trufa de 2  amores.png" },
  { id: 5, nome: "Kit 4 Trufinhas", categoria: "Kits", preco: 0, peso: "120g",
    descricao: "Uma de cada sabor: Brigadeiro, Ninho, Mousse de Limão e Dois Amores.",
    imagem: "Kit 4 trufinhas.png" },
];
/* =========================================================
   FEEDBACKS — vitrine (Firebase) + formulário de envio
   ========================================================= */
const db = firebase.firestore();

function criarCardFeedback(fb) {
  const estrelas = "★".repeat(fb.nota) + "☆".repeat(5 - fb.nota);

  const card = document.createElement("article");
  card.className = "card-feedback";
  card.innerHTML = `
    <span class="estrelas">${estrelas}</span>
    <p class="texto-feedback">"${fb.texto}"</p>
    <p class="nome-feedback">— ${fb.nome}</p>
  `;
  return card;
}

function renderizarFeedbacks() {
  const grid = document.getElementById("gridFeedbacks");
  if (!grid) return;

  grid.innerHTML = `<p class="msg-feedbacks">Carregando depoimentos...</p>`;

  db.collection("feedbacks")
    .where("aprovado", "==", true)
    .orderBy("criadoEm", "desc")
    .get()
    .then((snapshot) => {
      grid.innerHTML = "";
      if (snapshot.empty) {
        grid.innerHTML = `<p class="msg-feedbacks">Ainda não temos depoimentos publicados. Seja o primeiro a deixar o seu!</p>`;
        return;
      }
      snapshot.forEach((doc) => grid.appendChild(criarCardFeedback(doc.data())));
    })
    .catch((erro) => {
      console.error("Erro ao carregar feedbacks:", erro);
      grid.innerHTML = `<p class="msg-feedbacks">Não foi possível carregar os depoimentos agora.</p>`;
    });
}

function configurarFormFeedback() {
  const form = document.getElementById("formFeedback");
  if (!form) return;

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = form.nome.value.trim();
    const nota = Number(form.avaliacao.value);
    const texto = form.mensagem.value.trim();
    const estrelas = "★".repeat(nota) + "☆".repeat(5 - nota);

    
    // Salva como pendente de aprovação
    db.collection("feedbacks").add({
      nome: nome,
      nota: nota,
      texto: texto,
      aprovado: false,
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    }).catch((erro) => console.error("Erro ao salvar feedback:", erro));

    form.reset();
  });
}

/* =========================================================
   MONTA O LINK DO WHATSAPP COM O SABOR JÁ ESCRITO
   ========================================================= */
function linkWhatsapp(nomeProduto) {
  const mensagem = `Olá! Tenho interesse na trufa: ${nomeProduto}`;
  return `${CONFIG.whatsappLink}?text=${encodeURIComponent(mensagem)}`;
}

/* =========================================================
   RENDERIZA OS CARDS DE PRODUTO
   ========================================================= */
function criarCard(produto) {
  // preco = 0 significa "ainda não cadastrado" -> mostra "Consulte"
  const preco = produto.preco > 0
    ? produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : "Consulte";

  const card = document.createElement("article");
  card.className = "card-produto";
  card.dataset.categoria = produto.categoria;

  card.innerHTML = `
    <img class="foto-produto" src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
    <div class="card-corpo">
      <div class="card-topo">
        <h3>${produto.nome}</h3>
        <span class="preco-tag">${preco}</span>
      </div>
      <p class="peso">${produto.peso}</p>
      <p class="descricao">${produto.descricao}</p>
      <a class="btn btn-whats" href="${linkWhatsapp(produto.nome)}" target="_blank" rel="noopener">
        Pedir no WhatsApp
      </a>
    </div>
  `;
  return card;
}

function renderizarProdutos(lista) {
  const grid = document.getElementById("gridProdutos");
  grid.innerHTML = "";
  lista.forEach(produto => grid.appendChild(criarCard(produto)));
}

/* =========================================================
   FILTROS DE CATEGORIA
   ========================================================= */
function renderizarFiltros() {
  const categorias = ["Todos", ...new Set(PRODUTOS.map(p => p.categoria))];
  const container = document.getElementById("filtros");

  categorias.forEach((categoria, index) => {
    const chip = document.createElement("button");
    chip.className = "filtro-chip" + (index === 0 ? " ativo" : "");
    chip.textContent = categoria;
    chip.type = "button";
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filtro-chip").forEach(c => c.classList.remove("ativo"));
      chip.classList.add("ativo");

      const filtrados = categoria === "Todos"
        ? PRODUTOS
        : PRODUTOS.filter(p => p.categoria === categoria);

      renderizarProdutos(filtrados);
    });
    container.appendChild(chip);
  });
}

/* =========================================================
   MENU MOBILE
   ========================================================= */
function configurarMenuMobile() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");

  toggle.addEventListener("click", () => {
    const aberto = nav.classList.toggle("aberto");
    toggle.setAttribute("aria-expanded", aberto);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("aberto");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================================================
   RODAPÉ: ano atual + links de contato
   ========================================================= */
function configurarRodape() {
  document.getElementById("anoAtual").textContent = new Date().getFullYear();

  document.getElementById("linkWhatsFooter").href = linkWhatsapp("Pedido geral");
  document.getElementById("linkInstagram").href = CONFIG.instagram;
  document.getElementById("linkIfood").href = CONFIG.ifood;
}

/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  document.title = `${CONFIG.nomeLoja} — Trufas Artesanais`;
  renderizarFiltros();
  renderizarProdutos(PRODUTOS);
  configurarMenuMobile();
  configurarRodape();
  renderizarFeedbacks();
  configurarFormFeedback();
});