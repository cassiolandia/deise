document.addEventListener('DOMContentLoaded', function() {

    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800, // Duração da animação em ms
        easing: 'ease-in-out', // Curva de aceleração
        once: true, // Animar apenas uma vez
        offset: 100 // Gatilho da animação um pouco antes do elemento aparecer
    });

    // Header Fixo com Efeito de Scroll
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) { // Adiciona a classe quando scrollar mais de 50px
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Menu Mobile Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('nav ul li a');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            // Altera ícone do botão hamburguer para 'X' e vice-versa
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden'; // Impede scroll do body quando menu aberto
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = ''; // Restaura scroll do body
            }
        });

        // Fecha o menu mobile ao clicar em um link
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                 mobileMenu.classList.remove('active');
                 const icon = mobileMenuButton.querySelector('i');
                 icon.classList.remove('fa-times');
                 icon.classList.add('fa-bars');
                 document.body.style.overflow = '';
            });
        });
    }


    // Atualizar Ano no Rodapé
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scroll para links internos (alternativa ao CSS scroll-behavior)
    // Normalmente, `scroll-behavior: smooth;` no CSS é suficiente.
    // Use isso se precisar de mais controle ou compatibilidade.
    /*
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Considera a altura do header fixo
                const headerOffset = document.getElementById('main-header')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Fecha menu mobile se estiver aberto (caso clique venha do menu mobile)
                 if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    const icon = mobileMenuButton.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    */

    // Envio do formulário de contato para o WhatsApp
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio convencional

            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;

            // Formata a mensagem com formatação rica do WhatsApp
            const textoMensagem = `Olá Dra. Deise! Vim pelo site e gostaria de agendar uma consulta.\n\n` +
                                  `*Nome:* ${name}\n` +
                                  `*Mensagem:* ${message}`;

            const textoCodificado = encodeURIComponent(textoMensagem);
            const numeroWhatsApp = "5511969444416"; 
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;

            // Abre a janela do WhatsApp
            window.open(urlWhatsApp, '_blank');
        });
    }
});