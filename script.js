const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const isSmallScreen = window.matchMedia('(max-width: 820px)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lowMotionMode = isTouchDevice || isSmallScreen || prefersReducedMotion;

// CURSOR
const dot = document.getElementById('cursor-dot');
const glow = document.getElementById('cursor-glow');

if (!lowMotionMode && dot && glow) {
  document.addEventListener('mousemove', event => {
    dot.style.left = `${event.clientX - 5}px`;
    dot.style.top = `${event.clientY - 5}px`;
    glow.style.left = `${event.clientX - 20}px`;
    glow.style.top = `${event.clientY - 20}px`;
  });
}

// PARTICLES
const canvas = document.getElementById('particles-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const particlePalette = [
  'rgba(244,167,195,',
  'rgba(201,184,245,',
  'rgba(232,201,122,',
  'rgba(255,255,255,'
];
let particles = [];
let particleFrame = null;
const particlesEnabled = !lowMotionMode && canvas && ctx;

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, lowMotionMode ? 1 : 1.5);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function buildParticles() {
  particles = [];
  if (!particlesEnabled) return;

  const particleCount = window.innerWidth < 1100 ? 32 : 56;
  for (let i = 0; i < particleCount; i += 1) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      color: particlePalette[Math.floor(Math.random() * particlePalette.length)],
      a: Math.random() * 0.3 + 0.1
    });
  }
}

function drawParticles() {
  if (!particlesEnabled || !ctx || !canvas || document.hidden) return;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach(particle => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fillStyle = particle.color + particle.a + ')';
    ctx.fill();

    particle.x += particle.dx;
    particle.y += particle.dy;

    if (particle.x < 0 || particle.x > window.innerWidth) particle.dx *= -1;
    if (particle.y < 0 || particle.y > window.innerHeight) particle.dy *= -1;
  });

  particleFrame = requestAnimationFrame(drawParticles);
}

if (particlesEnabled) {
  resizeCanvas();
  buildParticles();
  drawParticles();
  window.addEventListener('resize', () => {
    resizeCanvas();
    buildParticles();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (particleFrame) {
        cancelAnimationFrame(particleFrame);
        particleFrame = null;
      }
      return;
    }

    if (!particleFrame) drawParticles();
  });
} else if (canvas) {
  canvas.style.display = 'none';
}

// LOADER
const loaderStatuses = [
  'Scanning drama levels... \uD83D\uDCCA',
  'Measuring overthinking capacity...',
  'Counting unanswered texts... \uD83D\uDCF1',
  'Detecting floral lehenga DNA... \uD83C\uDF38',
  'Species confirmed: Homo dramaticus \uD83E\uDDEC',
  'Loading chaotic energy... \u2728'
];

const statusEl = document.getElementById('loader-status');
let statusIndex = 0;

if (statusEl) {
  const statusTimer = setInterval(() => {
    statusIndex = (statusIndex + 1) % loaderStatuses.length;
    statusEl.textContent = loaderStatuses[statusIndex];
  }, 450);

  setTimeout(() => {
    clearInterval(statusTimer);
    document.getElementById('loader')?.classList.add('hidden');
  }, lowMotionMode ? 1200 : 2500);
}

// ROAST
const roastMessages = [
  '"Tere reactions itne dramatic hote hain ki daily soap wale bhi notes lein." \uD83C\uDFAC',
  '"Reply dene ki speed dekh ke kachua bhi bole, behen thoda fast." \uD83D\uDC22',
  '"Overthinking mein tu PhD nahi, seedha vice chancellor hai." \uD83C\uDF93',
  '"500 animals yaad hain, par apna charger kahan rakha woh nahi." \uD83E\uDD8E',
  '"Hints tere paas aake bhi bolte honge, rehne de yaar." \uD83D\uDD2C',
  '"Tere mood swings ka khud ka weather department khul sakta hai." \uD83C\uDF2A\uFE0F',
  '"Tu chaos aur drama ka combo pack hai, buy one get one free." \uD83E\uDDEC',
  '"Darwin tujhe dekh ke bolta, is specimen pe alag research chahiye." \uD83D\uDCD6',
  '"Responsibilities ko tu aise ghost karti hai jaise unhone paise maang liye ho." \uD83D\uDC7B',
  '"Science bohot kuch explain kar sakti hai, par tera logic abhi bhi out of syllabus hai." \uD83E\uDD26'
];

let roastCount = 0;
let lastRoastIndex = -1;

function roastMe() {
  const roastDisplay = document.getElementById('roastDisplay');
  const roastCounter = document.getElementById('roastCounter');
  if (!roastDisplay || !roastCounter) return;

  let nextIndex = 0;
  do {
    nextIndex = Math.floor(Math.random() * roastMessages.length);
  } while (nextIndex === lastRoastIndex && roastMessages.length > 1);

  lastRoastIndex = nextIndex;
  roastDisplay.classList.remove('show');
  void roastDisplay.offsetWidth;
  roastDisplay.textContent = roastMessages[nextIndex];
  roastDisplay.classList.add('show');

  roastCount += 1;
  roastCounter.textContent = `${roastCount} roast${roastCount !== 1 ? 's' : ''} served \uD83D\uDD25`;
  spawnEmojis(['\uD83D\uDD25', '\uD83D\uDE02', '\uD83D\uDC80', '\uD83D\uDC38', '\uD83C\uDF1A'], 6);
}

// SURPRISES
const surprises = [
  {
    title: 'Best Friend Forever \uD83D\uDC96',
    text: 'You are the kind of person who makes every boring day feel like an adventure. Annoying? Yes. Irreplaceable? Absolutely.'
  },
  {
    title: "You're My Favourite Human \uD83C\uDF38",
    text: "Between all the animals you study, you somehow remain the most fascinating creature I have encountered. Undocumented species. 10/10 would research."
  },
  {
    title: 'Secret Appreciation \uD83D\uDC3C',
    text: "You're annoyingly talented, absurdly funny, and genuinely kind underneath all that dramatic exterior. Don't let it go to your head."
  },
  {
    title: 'A Note from the Heart \u2B50',
    text: "I know I roast you constantly - but that's just my way of saying: you're so wonderful I can't even deal with it normally. You matter, a lot. \uD83D\uDC9B"
  }
];

function showSurprise(index) {
  const title = document.getElementById('surpriseTitle');
  const text = document.getElementById('surpriseText');
  const box = document.getElementById('surpriseMsg');
  if (!title || !text || !box || !surprises[index]) return;

  title.textContent = surprises[index].title;
  text.textContent = surprises[index].text;
  box.classList.add('visible');
  spawnEmojis(['\u2728', '\uD83D\uDC96', '\uD83C\uDF38', '\uD83E\uDD8B'], 8);
}

function closeSurprise() {
  document.getElementById('surpriseMsg')?.classList.remove('visible');
}

// SECRET MODAL
function openModal() {
  document.getElementById('secretModal')?.classList.add('open');
  spawnEmojis(['\uD83D\uDC8C', '\uD83D\uDC96', '\uD83C\uDF38', '\u2728'], 10);
}

function closeModal() {
  document.getElementById('secretModal')?.classList.remove('open');
}

document.getElementById('secretModal')?.addEventListener('click', function(event) {
  if (event.target === this) closeModal();
});

// GIFT PLAYER
const giftModal = document.getElementById('giftModal');
const giftSong = document.getElementById('gift-song');
const giftPlayBtn = document.getElementById('gift-play-btn');
const giftProgress = document.getElementById('gift-progress');
const giftVolume = document.getElementById('gift-volume');
const giftCurrentTime = document.getElementById('gift-current-time');
const giftDuration = document.getElementById('gift-duration');
let resumeBgMusicAfterGift = false;
let musicPlaying = false;

function formatGiftTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function updateGiftPlayerUI() {
  if (!giftSong || !giftPlayBtn || !giftProgress || !giftCurrentTime || !giftDuration) return;

  const duration = Number.isFinite(giftSong.duration) ? giftSong.duration : 0;
  const currentTime = giftSong.currentTime || 0;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  giftPlayBtn.textContent = giftSong.paused ? 'Play' : 'Pause';
  giftProgress.value = progress;
  giftCurrentTime.textContent = formatGiftTime(currentTime);
  giftDuration.textContent = formatGiftTime(duration);
}

function syncMusicUI(isPlaying) {
  const btn = document.getElementById('music-btn');
  const label = document.getElementById('music-label');
  musicPlaying = isPlaying;
  if (!btn || !label) return;

  if (isPlaying) {
    btn.textContent = '\u23F8';
    btn.style.borderColor = 'rgba(244,167,195,0.6)';
    btn.style.color = 'var(--pink)';
    label.style.display = 'block';
  } else {
    btn.textContent = '\uD83C\uDFB5';
    btn.style.borderColor = 'rgba(232,201,122,0.4)';
    btn.style.color = 'var(--gold)';
    label.style.display = 'none';
  }
}

function openGiftModal() {
  const bgMusic = document.getElementById('bg-music');
  resumeBgMusicAfterGift = Boolean(bgMusic && !bgMusic.paused);

  if (resumeBgMusicAfterGift && bgMusic) {
    bgMusic.pause();
    syncMusicUI(false);
  }

  giftModal?.classList.add('open');

  if (giftSong) {
    giftSong.currentTime = 0;
    updateGiftPlayerUI();
    giftSong.play().catch(() => {});
  }

  spawnEmojis(['\uD83C\uDF81', '\uD83C\uDFB6', '\u2728', '\uD83D\uDC96'], 8);
}

function closeGiftModal() {
  giftModal?.classList.remove('open');

  if (giftSong) {
    giftSong.pause();
    giftSong.currentTime = 0;
    updateGiftPlayerUI();
  }

  if (resumeBgMusicAfterGift) {
    const bgMusic = document.getElementById('bg-music');
    bgMusic?.play().then(() => {
      syncMusicUI(true);
    }).catch(() => {
      syncMusicUI(false);
    });
  }

  resumeBgMusicAfterGift = false;
}

giftModal?.addEventListener('click', function(event) {
  if (event.target === this) closeGiftModal();
});

giftPlayBtn?.addEventListener('click', () => {
  if (!giftSong) return;
  if (giftSong.paused) {
    giftSong.play().catch(() => {});
    return;
  }
  giftSong.pause();
});

giftProgress?.addEventListener('input', () => {
  if (!giftSong || !Number.isFinite(giftSong.duration) || giftSong.duration <= 0) return;
  giftSong.currentTime = (Number(giftProgress.value) / 100) * giftSong.duration;
  updateGiftPlayerUI();
});

giftVolume?.addEventListener('input', () => {
  if (!giftSong) return;
  giftSong.volume = Number(giftVolume.value);
});

if (giftSong) {
  if (giftVolume) giftSong.volume = Number(giftVolume.value);
  updateGiftPlayerUI();
  giftSong.addEventListener('loadedmetadata', updateGiftPlayerUI);
  giftSong.addEventListener('timeupdate', updateGiftPlayerUI);
  giftSong.addEventListener('seeked', updateGiftPlayerUI);
  giftSong.addEventListener('durationchange', updateGiftPlayerUI);
  giftSong.addEventListener('play', updateGiftPlayerUI);
  giftSong.addEventListener('pause', updateGiftPlayerUI);
  giftSong.addEventListener('ended', updateGiftPlayerUI);
}

// FLOATING EMOJIS
function spawnEmojis(emojis, count) {
  const burstCount = lowMotionMode ? Math.min(count, 4) : count;

  for (let i = 0; i < burstCount; i += 1) {
    const el = document.createElement('div');
    el.className = 'float-emoji';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = `${20 + Math.random() * 60}vw`;
    el.style.bottom = '10vh';
    el.style.animationDelay = `${Math.random() * 0.6}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), lowMotionMode ? 1800 : 3000);
  }
}

// MUSIC
const autoStartDocumentEvents = ['pointerdown', 'touchstart', 'keydown'];
const autoStartWindowEvents = ['scroll', 'wheel', 'touchmove'];

function removeAutoStartListeners() {
  autoStartDocumentEvents.forEach(eventName => {
    document.removeEventListener(eventName, startMusicFromInteraction);
  });
  autoStartWindowEvents.forEach(eventName => {
    window.removeEventListener(eventName, startMusicFromInteraction);
  });
}

function startMusicFromInteraction(event) {
  if (
    event.target &&
    event.target.closest &&
    (
      event.target.closest('#music-btn') ||
      event.target.closest('.btn-gift') ||
      event.target.closest('#giftModal')
    )
  ) {
    return;
  }

  const audio = document.getElementById('bg-music');
  audio?.play().then(() => {
    syncMusicUI(true);
    removeAutoStartListeners();
  }).catch(() => {
    syncMusicUI(false);
  });
}

function toggleMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;

  if (musicPlaying) {
    audio.pause();
    audio.currentTime = 0;
    syncMusicUI(false);
    return;
  }

  audio.play().then(() => {
    syncMusicUI(true);
    removeAutoStartListeners();
  }).catch(() => {
    syncMusicUI(false);
  });
}

window.addEventListener('load', () => {
  const audio = document.getElementById('bg-music');
  if (!audio) return;

  audio.play().then(() => {
    syncMusicUI(true);
    removeAutoStartListeners();
  }).catch(() => {
    syncMusicUI(false);
    autoStartDocumentEvents.forEach(eventName => {
      document.addEventListener(eventName, startMusicFromInteraction, { passive: true });
    });
    autoStartWindowEvents.forEach(eventName => {
      window.addEventListener(eventName, startMusicFromInteraction, { passive: true });
    });
  });
});

// SCROLL REVEAL
if (lowMotionMode) {
  document.querySelectorAll('.glass-card, .tl-card, .sec-label').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.transition = 'none';
  });
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.glass-card, .tl-card, .sec-label').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(.22,.68,0,1.2)';
    observer.observe(el);
  });
}

// GALLERY TILT
if (!isTouchDevice) {
  document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -16;
      card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
