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
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      link: '/pages/artigo-ansiedade.html'
    },
    {
      tema: 'depressao',
      titulo: 'Depressão: sinais e como buscar ajuda',
      img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
      link: '/pages/artigo-depressão.html'
    },
    {
      tema: 'autoestima',
      titulo: 'Autoestima: fortalecendo sua confiança',
      img: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?auto=format&fit=crop&w=600&q=80',
      link: '/pages/artigo-autoestima.html'
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
