document.addEventListener('DOMContentLoaded', () => {
  // Menu Hamburguer
  const toggle = document.querySelector('.menu-hamburguer');
  const nav = document.querySelector('header nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      const expanded = nav.classList.contains('active');
      toggle.setAttribute('aria-expanded', expanded);
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Renderização de Cards Dinâmicos
  const cardsContainer = document.querySelector('.cards-dinamicos');
  const temasBtns = document.querySelectorAll('.temas-barra .tema');

  const artigos = [
    {
      tema: 'ansiedade',
      titulo: 'Entenda a Ansiedade na Juventude',
      img: 'https://casaclinicapsi.com.br/wp-content/uploads/2022/03/ansiedade-1080x675.jpg',
      link: '/pages/artigo-ansiedade/'
    },
    {
      tema: 'depressao',
      titulo: 'Depressão: sinais e como buscar ajuda',
      img: 'https://saude.abril.com.br/wp-content/uploads/2017/02/depressao01.jpg?quality=85&strip=info&w=1280&h=720&crop=1',
      link: '/pages/artigo-depressao/'
    },
    {
      tema: 'autoestima',
      titulo: 'Autoestima: fortalecendo sua confiança',
      img: 'https://jpimg.com.br/uploads/2025/02/5-passos-para-fortalecer-a-sua-autoestima.jpg',
      link: '/pages/artigo-autoestima/'
    }
  ];

  function renderCards(filtro = 'todos') {
    if (!cardsContainer) return; // evita erro se não houver container

    cardsContainer.innerHTML = '';
    const artigosFiltrados = filtro === 'todos' ? artigos : artigos.filter(a => a.tema === filtro);

    artigosFiltrados.forEach(a => {
      const card = document.createElement('div');
      card.classList.add('card-dinamico');
      card.innerHTML = `
        <img src="${a.img}" alt="${a.titulo}">
        <div class="conteudo-card">
          <h3>${a.titulo}</h3>
          <a href="${a.link}" class="btn-leia-mais">Leia Mais</a>
        </div>
      `;
      cardsContainer.appendChild(card);
    });
  }

  // Inicializa com todos os cards
  renderCards();

  // Eventos de clique nos tópicos
  temasBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      temasBtns.forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');

      // usa dataset.tema se definido, senão pega texto em lowercase
      const tema = btn.dataset.tema || btn.textContent.toLowerCase();
      renderCards(tema);
    });
  });

  // Busca de artigos na página de busca
  const resultadosDiv = document.getElementById('resultados');
  if (resultadosDiv) {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q')?.toLowerCase();

    const artigosBusca = [
      {
        titulo: 'Como lidar com a ansiedade no dia a dia',
        descricao: 'Descubra técnicas simples para reduzir a ansiedade e manter a mente mais tranquila.',
        tag: 'ansiedade',
        link: '/pages/artigo1.html'
      },
      {
        titulo: 'Depressão: sinais e como buscar ajuda',
        descricao: 'Entenda os sintomas da depressão e saiba como pedir apoio de forma segura.',
        tag: 'depressão',
        link: '/pages/artigo2.html'
      },
      {
        titulo: 'Fortalecendo a autoestima todos os dias',
        descricao: 'Práticas simples e motivadoras para aumentar a confiança e o amor-próprio.',
        tag: 'autoestima',
        link: '/pages/artigo3.html'
      }
    ];

    const resultados = artigosBusca.filter(artigo =>
      artigo.titulo.toLowerCase().includes(query) ||
      artigo.tag.toLowerCase().includes(query)
    );

    if (resultados.length > 0) {
      resultados.forEach(artigo => {
        const div = document.createElement('div');
        div.classList.add('artigo-busca');
        div.innerHTML = `
          <h3><a href="${artigo.link}">${artigo.titulo}</a></h3>
          <p>${artigo.descricao}</p>
          <span class="tag">${artigo.tag}</span>
        `;
        resultadosDiv.appendChild(div);
      });
    } else {
      resultadosDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    }
  }
});


addEventListener("submit"), (event) => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let data = {
    email,
    password
  };

  sessionStorage.setItem("session", JSON.stringify(data))

  console.log(JSON.parse(sessionStorage.getItem(session)));
  
} 