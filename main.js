document.addEventListener('DOMContentLoaded', () => {
    // Audio Controls
    const bgMusic = document.getElementById('bgMusic');
    const birdSound = document.getElementById('birdSound');
    const toggleMusic = document.getElementById('toggleMusic');
    const playBirdSound = document.getElementById('playBirdSound');
    const musicVolume = document.getElementById('musicVolume');
    const birdVolume = document.getElementById('birdVolume');
    const audioControls = document.querySelector('.audio-controls');
    const hoverArea = document.querySelector('.hover-area');

    // Ensure audio elements are properly loaded
    bgMusic.load();
    birdSound.load();

    // Initialize volumes
    bgMusic.volume = musicVolume.value;
    birdSound.volume = birdVolume.value;

    // Disable autoplay initially to comply with browser policies
    bgMusic.autoplay = false;
    birdSound.autoplay = false;

    // Show controls briefly on load
    setTimeout(() => {
        audioControls.classList.add('show');
        setTimeout(() => {
            audioControls.classList.remove('show');
        }, 3000);
    }, 1000);

    // Background music controls
    toggleMusic.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            toggleMusic.innerHTML = '<i class="fas fa-pause"></i><span>Pause</span>';
        } else {
            bgMusic.pause();
            toggleMusic.innerHTML = '<i class="fas fa-music"></i><span>Music</span>';
        }
    });

    // Bird sound control (with loop)
    playBirdSound.addEventListener('click', () => {
        if (birdSound.paused) {
            birdSound.play();
            playBirdSound.innerHTML = '<i class="fas fa-pause"></i><span>Pause</span>';
        } else {
            birdSound.pause();
            playBirdSound.innerHTML = '<i class="fas fa-dove"></i><span>Bird</span>';
        }
    });

    // Volume controls
    musicVolume.addEventListener('input', (e) => {
        bgMusic.volume = e.target.value;
    });

    birdVolume.addEventListener('input', (e) => {
        birdSound.volume = e.target.value;
    });

    // Handle initial autoplay for both sounds with proper error handling
    const initializeAudio = () => {
        Promise.all([
            bgMusic.play().catch(error => {
                console.log('Background music autoplay failed:', error);
                toggleMusic.innerHTML = '<i class="fas fa-music"></i><span>Music</span>';
            }),
            birdSound.play().catch(error => {
                console.log('Bird sound autoplay failed:', error);
                playBirdSound.innerHTML = '<i class="fas fa-dove"></i><span>Bird</span>';
            })
        ]).then(() => {
            toggleMusic.innerHTML = '<i class="fas fa-pause"></i><span>Pause</span>';
            playBirdSound.innerHTML = '<i class="fas fa-pause"></i><span>Pause</span>';
        });
    };

    // Add click listener to start audio (browser policy requires user interaction)
    document.addEventListener('click', initializeAudio, { once: true });
    
    // Add touch events for mobile devices
    hoverArea.addEventListener('touchstart', () => {
        audioControls.classList.add('show');
    });
    
    // Hide controls after touch elsewhere on the page
    document.addEventListener('touchstart', (e) => {
        if (!audioControls.contains(e.target) && !hoverArea.contains(e.target)) {
            audioControls.classList.remove('show');
        }
    });
    
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Show controls for longer on mobile devices
    if (isMobile) {
        // Show controls for longer on initial load for mobile
        setTimeout(() => {
            audioControls.classList.add('show');
            setTimeout(() => {
                audioControls.classList.remove('show');
            }, 5000); // 5 seconds for mobile
        }, 1500);
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        // Brief timeout to allow layout to settle
        setTimeout(() => {
            // Adjust any elements that need repositioning after orientation change
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 300);
    });
    
    // Set initial viewport height variable for mobile browsers
    const setVhVariable = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Set on load
    setVhVariable();
    
    // Update on resize
    window.addEventListener('resize', setVhVariable);

    // Page transition handling
    const pages = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);

            // Remove active class from all pages
            pages.forEach(page => {
                page.classList.remove('active');
            });

            // Add active class to target page
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Special handling for work section
                if (targetId === 'work') {
                    setTimeout(() => {
                        targetSection.classList.add('active');
                    }, 100);
                }

                // Update navigation state
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Handle back/forward browser buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash || '#home';
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            pages.forEach(page => page.classList.remove('active'));
            targetSection.classList.add('active');
        }
    });

    // Initial page load
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            pages.forEach(page => page.classList.remove('active'));
            targetSection.classList.add('active');
        }
    }

    // Update body overflow for scrolling
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';

    // Add close button functionality
    const closeWork = document.getElementById('closeWork');
    const workSection = document.getElementById('work');
    const homeSection = document.getElementById('home');

    closeWork.addEventListener('click', () => {
        workSection.classList.remove('active');
        homeSection.classList.add('active');
        // Update URL to reflect state
        history.pushState(null, '', '#home');
    });

    // Welcome Alert functionality
    const welcomeAlert = document.getElementById('welcome-alert');
    const closeWelcome = document.getElementById('close-welcome');

    // Show welcome alert after a short delay
    setTimeout(() => {
        welcomeAlert.classList.add('show');
    }, 1000);

    // Close welcome alert
    closeWelcome.addEventListener('click', () => {
        welcomeAlert.classList.remove('show');
    });
});