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
    img: 'https://images.unsplash.com/vector-1749806307715-632d6a9ce0ce?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/pages/ansiedade/index.html'
  },
  {
    tema: 'depressao',
    titulo: 'Depressão: sinais e como buscar ajuda',
    img: 'https://plus.unsplash.com/premium_vector-1682309171293-42c939a2302f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"',
    link: '/pages/depressao/index.html'
  },
  {
    tema: 'autoestima',
    titulo: 'Autoestima: fortalecendo sua confiança',
    img: 'https://i.pinimg.com/736x/bb/19/20/bb19205aac71fae3f4190b71d71764de.jpg',
    link: '/pages/autoestima/index.html'
  },
  // Novos cards
  {
    tema: 'estresse',
    titulo: 'Como controlar o estresse no dia a dia',
    img: 'https://widoctor.com.br/wp-content/uploads/2021/09/o-que-e-o-transtorno-de-estresse-agudo-1024x538.png',
    link: '/pages/estresse/index.html'
  },
  {
    tema: 'autocuidado',
    titulo: 'Práticas de autocuidado que você pode adotar',
    img: 'https://blog.uninassau.edu.br/wp-content/uploads/2023/11/como-praticar-o-autocuidado.jpg',
    link: '/pages/autocuidado/index.html'
  },
  {
    tema: 'bem-estar',
    titulo: 'Dicas de bem-estar para o corpo e mente',
    img: 'https://media.istockphoto.com/id/1347375453/pt/foto/hands-holding-green-happy-smile-face-paper-cut-good-feedback-rating-and-positive-customer.jpg?s=612x612&w=0&k=20&c=BWR-bpt1Sz6Xs2k1FBhtrl5bSAgHn3Hy8MYM2t1vDVc=',
    link: '/pages/bem-estar/index.html'
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
        link: '/pages/ansiedade/index.html'
      },
      {
        titulo: 'Depressão: sinais e como buscar ajuda',
        descricao: 'Entenda os sintomas da depressão e saiba como pedir apoio de forma segura.',
        tag: 'depressão',
        link: '/pages/depressao/index.html'
      },
      {
        titulo: 'Fortalecendo a autoestima todos os dias',
        descricao: 'Práticas simples e motivadoras para aumentar a confiança e o amor-próprio.',
        tag: 'autoestima',
        link: '/pages/autoestima/index.html'
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


//Teste para logar perfil

// document.addEventListener('DOMContentLoaded', () => {
//   const loginBtn = document.querySelector('.btn-login');
//   const cadastroBtn = document.querySelector('.btn-cadastrar');
//   const navMenu = document.querySelector('header nav');

//   // Pega do localStorage se o usuário está logado
//   let usuarioLogado = localStorage.getItem('usuarioLogado');

//   // Função para atualizar o menu conforme login/logout
//   function atualizarMenuUsuario() {
//     if (usuarioLogado) {
//       // Esconde Login e Cadastro
//       if (loginBtn) loginBtn.style.display = 'none';
//       if (cadastroBtn) cadastroBtn.style.display = 'none';

//       // Cria botão de perfil, se ainda não existir
//       if (!document.querySelector('.btn-perfil')) {
//         const perfilBtn = document.createElement('button');
//         perfilBtn.classList.add('btn-perfil');
//         perfilBtn.textContent = usuarioLogado;
//         perfilBtn.addEventListener('click', () => {
//           window.location.href = '/pages/minha-conta/index.html';
//         });
//         navMenu.appendChild(perfilBtn);
//       }
//     } else {
//       // Mostra Login e Cadastro se não estiver logado
//       if (loginBtn) loginBtn.style.display = 'inline-block';
//       if (cadastroBtn) cadastroBtn.style.display = 'inline-block';

//       const perfilBtn = document.querySelector('.btn-perfil');
//       if (perfilBtn) perfilBtn.remove();
//     }
//   }

//   atualizarMenuUsuario(); // Atualiza menu ao carregar a página

//   // Login real (exemplo: formulário)
//   const formLogin = document.querySelector('form');
//   if (formLogin) {
//     formLogin.addEventListener('submit', (e) => {
//       e.preventDefault(); // evita recarregar a página

//       // Pega valores dos inputs
//       const email = document.querySelector('#email-login').value;
//       const senha = document.querySelector('#senha-login').value;

//       // Aqui você faria validação com seu backend
//       // Para simulação, qualquer login é aceito:
//       if (email && senha) {
//         usuarioLogado = 'Fulano de Tal'; // ou usar o nome do input se quiser
//         localStorage.setItem('usuarioLogado', usuarioLogado);

//         // Redireciona para a página principal ou perfil
//         window.location.href = '/index.html';
//       }
//     });
//   }

//   // Logout (opcional, pode criar botão dentro do menu Perfil)
//   // function logout() {
//   //   localStorage.removeItem('usuarioLogado');
//   //   usuarioLogado = null;
//   //   atualizarMenuUsuario();
//   // }
// });

