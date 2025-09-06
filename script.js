document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const bgVideo = document.getElementById('bg-video');
    const muteBtn = document.getElementById('mute-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const preloader = document.querySelector('.preloader');
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const particlesContainer = document.getElementById('particles');
    const bnodeBtn = document.querySelector('.bnode-btn');
    const profileCards = document.querySelectorAll('.profile-card');
    const spotifyProfileBtn = document.querySelector('.spotify-profile-btn');
    const submitBtn = document.querySelector('.submit-btn');
    const contactForm = document.querySelector('.contact-form');
    const successModal = document.getElementById('success-modal');
    const acceptBtn = document.getElementById('accept-btn');
    
    // Configuración inicial del volumen
    bgVideo.volume = 0.5;
    
    // Evento para el botón de mute/unmute
    muteBtn.addEventListener('click', function() {
        if (bgVideo.muted) {
            bgVideo.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            bgVideo.muted = true;
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
        createRipple(muteBtn, event);
    });
    
    // Evento para el control de volumen
    volumeSlider.addEventListener('input', function() {
        bgVideo.volume = this.value / 100;
        
        // Actualizar el ícono según el volumen
        if (bgVideo.volume === 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (bgVideo.volume < 0.5) {
            muteBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
    
    // Efecto ripple para el botón de volumen
    muteBtn.addEventListener('click', function(e) {
        createRipple(this, e);
    });
    
    // Efecto ripple para el botón de bnode
    bnodeBtn.addEventListener('click', function(e) {
        createRipple(this, e);
    });
    
    // Efecto ripple para las tarjetas de perfil
    profileCards.forEach(card => {
        card.addEventListener('click', function(e) {
            createRipple(this, e);
        });
    });
    
    // Efecto ripple para el botón de perfil de Spotify
    spotifyProfileBtn.addEventListener('click', function(e) {
        createRipple(this, e);
    });
    
    // Efecto ripple para el botón de envío del formulario
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            createRipple(this, e);
        });
    }
    
    // Efecto ripple para todos los botones
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(this, e);
        });
    });
    
    // Función para crear el efecto ripple
    function createRipple(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Cursor personalizado
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Efecto hover en elementos interactivos para el cursor
    const interactiveElements = document.querySelectorAll('a, button, .profile-card, input, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
    
    // Crear partículas
    function createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Tamaño aleatorio
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Posición inicial aleatoria
            particle.style.left = `${Math.random() * 100}%`;
            
            // Duración de animación aleatoria
            const duration = Math.random() * 20 + 10;
            particle.style.animationDuration = `${duration}s`;
            
            // Retraso aleatorio
            const delay = Math.random() * 20;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // Animación de entrada suave para el video
    setTimeout(() => {
        bgVideo.style.opacity = 1;
    }, 100);

    // Interceptar el envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío exitoso (aquí iría tu lógica real de envío)
            // Por ahora, solo mostramos el modal después de un breve retraso
            setTimeout(() => {
                // Limpiar el formulario
                contactForm.reset();
                
                // Mostrar el modal de éxito
                successModal.classList.add('show');
            }, 1000);
        });
    }

    // Cerrar el modal al hacer clic en el botón de aceptar
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            successModal.classList.remove('show');
            createRipple(this, event);
        });
    }

    // Cerrar el modal al hacer clic fuera del contenido
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.remove('show');
            }
        });
    }
    
    // Observador de intersección para animaciones al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.profile-card, .spotify-widget, .contact-container, .info-card');
    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Efecto de blur/opacity del fondo al interactuar con botones
    const buttons = document.querySelectorAll('button, .social-btn, .profile-card, .bnode-btn, .spotify-profile-btn, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            bgVideo.style.filter = 'blur(3px)';
            bgVideo.style.opacity = '0.7';
        });
        
        button.addEventListener('mouseleave', () => {
            bgVideo.style.filter = 'blur(0)';
            bgVideo.style.opacity = '1';
        });
    });
    
    // Animación de glitch para el nombre
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        glitchText.setAttribute('data-text', glitchText.textContent);
    }
    
    // Efecto de parallax suave al hacer scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.video-background');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
// Obtener información de IP pública
function fetchIPInfo() {
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            // Eliminar el campo readme
            delete data.readme;
            
            // Crear HTML para mostrar la información con nombres en español
            const camposEspañol = {
                ip: 'IP',
                hostname: 'Nombre de Host',
                city: 'Ciudad',
                region: 'Región',
                country: 'País',
                loc: 'Ubicación',
                org: 'Organización',
                postal: 'Código Postal',
                timezone: 'Zona Horaria'
            };

            let html = '';
            for (const [key, value] of Object.entries(data)) {
                const formattedKey = camposEspañol[key] || key.charAt(0).toUpperCase() + key.slice(1);
                html += `<p><strong>${formattedKey}:</strong> ${value}</p>`;
            }

            // Detectar VPN de forma simple (si la organización tiene 'host' o 'vpn' en el nombre)
            let usaVPN = 'No';
            if (data.org && /host|vpn/i.test(data.org)) {
                usaVPN = 'Sí';
            }
            html += `<p><strong>Usa VPN:</strong> ${usaVPN}</p>`;
            
            // Insertar la información en el contenedor
            document.getElementById('ipinfo-data').innerHTML = html;
        })
        .catch(error => {
            console.error('Error al obtener la información de IP:', error);
            document.getElementById('ipinfo-data').innerHTML = '<p>Error al cargar la información.</p>';
        });
}

// Llamar a la función para obtener la información de IP
fetchIPInfo();

});
