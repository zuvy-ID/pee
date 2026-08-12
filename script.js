// ============================================
// DATA CERITA
// ============================================
const stories = {
    card1: {
        title: '🎄 Merry Christmas, I Miss You',
        emoji: '💫',
        text: 'Lagu ini pertama kali aku dengar pas malam Natal yang sepi. Waktu itu aku lagi sendiri di kosan, jauh dari keluarga dan orang-orang yang aku sayang. Liriknya "Merry Christmas, I miss you" benar-benar ngena banget di hati. Ada seseorang yang pengen banget aku hubungi, tapi nggak bisa. Lagu ini jadi pengingat kalau kerinduan itu kadang lebih terasa di momen spesial.'
    },
    card2: {
        title: '🏠 Rumah ke Rumah',
        emoji: '🌙',
        text: 'Lagu ini selalu mengingatkanku pada perjalanan pulang bareng teman-teman naik motor selepas maghrib. Angin malam yang sepoi-sepoi dan candaan di tengah jalan bikin momen itu terasa hangat. "Rumah ke rumah" jadi simbol perjalanan kita mencari makna pulang, meskipun kadang tujuan kita belum jelas.'
    },
    card3: {
        title: '🌧️ Pupus',
        emoji: '💔',
        text: 'Soundtrack wajib setiap kali hujan deras dan aku sendirian di kamar. Lagu klasik dari Dewa 19 ini selalu bawa perasaan nostalgia yang dalam. Ada kenangan tentang cinta pertama yang pupus, tentang janji-janji yang nggak kesampaian. Tapi anehnya, lagu ini malah jadi pelipur saat aku sedih.'
    }
};

// ============================================
// STATE
// ============================================
let currentIndex = 0;
const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');
const body = document.body;
const musicIndicator = document.getElementById('musicIndicator');

// ============================================
// NAVIGASI
// ============================================
function goToCard(index) {
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    cards[index].classList.add('active');
    dots[index].classList.add('active');

    const color = cards[index].dataset.color;
    body.style.background = color;

    updateMusicIndicator();
    currentIndex = index;
}

function nextCard() {
    const next = (currentIndex + 1) % cards.length;
    goToCard(next);
}

function prevCard() {
    const prev = (currentIndex - 1 + cards.length) % cards.length;
    goToCard(prev);
}

// ============================================
// KEYBOARD
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextCard();
    if (e.key === 'ArrowLeft') prevCard();
    if (e.key === 'Escape') closeStory();
});

// ============================================
// SWIPE MOBILE
// ============================================
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.slider-container').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slider-container').addEventListener('touchmove', (e) => {
    const diffX = Math.abs(e.changedTouches[0].screenX - touchStartX);
    const diffY = Math.abs(e.changedTouches[0].screenY - touchStartY);
    if (diffX > diffY) {
        e.preventDefault();
    }
}, { passive: false });

document.querySelector('.slider-container').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextCard();
        } else {
            prevCard();
        }
    }
});

// ============================================
// MODAL
// ============================================
function showStory(cardId) {
    const story = stories[cardId];
    if (story) {
        document.querySelector('.modal-emoji').textContent = story.emoji || '💫';
        document.getElementById('storyTitle').textContent = story.title;
        document.getElementById('storyText').textContent = story.text;
        document.getElementById('storyModal').classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeStory() {
    document.getElementById('storyModal').classList.remove('show');
    document.body.style.overflow = '';
}

document.getElementById('storyModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('storyModal')) {
        closeStory();
    }
});

// ============================================
// MUSIC INDICATOR
// ============================================
function updateMusicIndicator() {
    const activeCard = document.querySelector('.card.active');
    const audio = activeCard ? activeCard.querySelector('audio') : null;

    if (audio && !audio.paused) {
        musicIndicator.classList.add('active');
    } else {
        musicIndicator.classList.remove('active');
    }
}

document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('play', () => {
        document.querySelectorAll('audio').forEach(a => {
            if (a !== audio) a.pause();
        });
        musicIndicator.classList.add('active');
    });

    audio.addEventListener('pause', () => {
        const anyPlaying = Array.from(document.querySelectorAll('audio')).some(a => !a.paused);
        if (!anyPlaying) {
            musicIndicator.classList.remove('active');
        }
    });

    audio.addEventListener('ended', () => {
        musicIndicator.classList.remove('active');
    });
});

setInterval(updateMusicIndicator, 2000);

// ============================================
// PARTICLES
// ============================================
function createParticles() {
    const container = document.getElementById('particles-container');
    const symbols = ['✦', '❄', '·', '⋆', '❋', '✧'];
    const colors = ['rgba(255,255,255,0.3)', 'rgba(162,155,254,0.2)', 'rgba(253,121,168,0.2)'];

    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.fontSize = (Math.random() * 10 + 6) + 'px';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 15) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        container.appendChild(particle);
    }
}
createParticles();

// ============================================
// AUTO-SLIDE
// ============================================
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        const anyPlaying = Array.from(document.querySelectorAll('audio')).some(a => !a.paused);
        if (!anyPlaying) {
            nextCard();
        }
    }, 8000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

startAutoSlide();

document.querySelector('.slider-container').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.slider-container').addEventListener('mouseleave', startAutoSlide);

// ============================================
// PARALLAX GLOW ORBS
// ============================================
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.querySelectorAll('.glow-orb').forEach((orb, i) => {
        const speed = 20 + i * 10;
        const moveX = (x - 0.5) * speed;
        const moveY = (y - 0.5) * speed;
        orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// ============================================
// INISIALISASI
// ============================================
goToCard(0);

console.log('✨ Waktu & Rasa 🎄');
console.log('Made with ❤️');