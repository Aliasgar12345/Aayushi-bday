
// CURSOR
const dot = document.getElementById('cursor-dot');
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  dot.style.left = (e.clientX - 5) + 'px';
  dot.style.top = (e.clientY - 5) + 'px';
  glow.style.left = (e.clientX - 20) + 'px';
  glow.style.top = (e.clientY - 20) + 'px';
});

// PARTICLES
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
const colors = ['rgba(244,167,195,', 'rgba(201,184,245,', 'rgba(232,201,122,', 'rgba(255,255,255,'];
for(let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
    a: Math.random() * 0.5 + 0.15
  });
}
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color + p.a + ')';
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if(p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// LOADER
const loaderStatuses = [
  'Scanning drama levels... 📊',
  'Measuring overthinking capacity...',
  'Counting unanswered texts... 📱',
  'Detecting floral lehenga DNA... 🌸',
  'Species confirmed: Homo dramaticus 🧬',
  'Loading chaotic energy... ✨'
];
let si = 0;
const statusEl = document.getElementById('loader-status');
const statusTimer = setInterval(() => {
  si = (si + 1) % loaderStatuses.length;
  statusEl.textContent = loaderStatuses[si];
}, 400);
setTimeout(() => {
  clearInterval(statusTimer);
  document.getElementById('loader').classList.add('hidden');
}, 2500);

// ROAST
const roasts = [
  `"National Geographic is waiting for your overacting documentary." 🎬`,
  `"Even pandas are less lazy about responding to messages." 🐼`,
  `"If overthinking were a degree, you'd be a tenured professor." 🎓`,
  `"You know 500 animal species but zero coping mechanisms." 🦎`,
  `"Queen of identifying specimen, zero skill at identifying hints." 🔬`,
  `"Your mood swings have their own migration pattern." 🦅`,
  `"You're the missing link — between drama and chaos." 🧬`,
  `"Charles Darwin would write a whole chapter about your behaviour." 📖`,
  `"You ghosted your responsibilities harder than any migratory bird." 🐦`,
  `"Science can explain everything. But not your decision-making." 🤔`
];
const roastMessages = [
  `"Tere reactions itne dramatic hote hain ki daily soap wale bhi notes lein." 🎬`,
  `"Reply dene ki speed dekh ke kachua bhi bole, behen thoda fast." 🐢`,
  `"Overthinking mein tu PhD nahi, seedha vice chancellor hai." 🎓`,
  `"500 animals yaad hain, par apna charger kahan rakha woh nahi." 🦎`,
  `"Hints tere paas aake bhi bolte honge, rehne de yaar." 🔬`,
  `"Tere mood swings ka khud ka weather department khul sakta hai." 🌪️`,
  `"Tu chaos aur drama ka combo pack hai, buy one get one free." 🧬`,
  `"Darwin tujhe dekh ke bolta, is specimen pe alag research chahiye." 📖`,
  `"Responsibilities ko tu aise ghost karti hai jaise unhone paise maang liye ho." 👻`,
  `"Science bohot kuch explain kar sakti hai, par tera logic abhi bhi out of syllabus hai." 🤦`
];
let roastCount = 0;
let lastRoast = -1;
function roastMe() {
  let idx;
  do { idx = Math.floor(Math.random() * roastMessages.length); } while(idx === lastRoast);
  lastRoast = idx;
  const el = document.getElementById('roastDisplay');
  el.classList.remove('show');
  void el.offsetWidth;
  el.textContent = roastMessages[idx];
  el.classList.add('show');
  roastCount++;
  document.getElementById('roastCounter').textContent = roastCount + ' roast' + (roastCount !== 1 ? 's' : '') + ' served 🔥';
  spawnEmojis(['🔥','😂','💀','🐸','🌚'], 6);
}

// SURPRISE MESSAGES
const surprises = [
  { title: 'Best Friend Forever 💖', text: 'You are the kind of person who makes every boring day feel like an adventure. Annoying? Yes. Irreplaceable? Absolutely.' },
  { title: `You're My Favourite Human 🌸`, text: `Between all the animals you study, you somehow remain the most fascinating creature I have encountered. Undocumented species. 10/10 would research.` },
  { title: `Secret Appreciation 🐼`, text: `You're annoyingly talented, absurdly funny, and genuinely kind underneath all that dramatic exterior. Don't let it go to your head.` },
  { title: `A Note from the Heart ⭐`, text: `I know I roast you constantly - but that's just my way of saying: you're so wonderful I can't even deal with it normally. You matter, a lot. 💛` }
];
function showSurprise(i) {
  document.getElementById('surpriseTitle').textContent = surprises[i].title;
  document.getElementById('surpriseText').textContent = surprises[i].text;
  document.getElementById('surpriseMsg').classList.add('visible');
  spawnEmojis(['✨','💖','🌸','🦋'], 8);
}
function closeSurprise() {
  document.getElementById('surpriseMsg').classList.remove('visible');
}

// MODAL
function openModal() {
  document.getElementById('secretModal').classList.add('open');
  spawnEmojis(['💌','💖','🌸','✨'], 10);
}
function closeModal() {
  document.getElementById('secretModal').classList.remove('open');
}
document.getElementById('secretModal').addEventListener('click', function(e) {
  if(e.target === this) closeModal();
});

// GIFT SONG
const giftModal = document.getElementById('giftModal');
const giftSong = document.getElementById('gift-song');
const giftPlayBtn = document.getElementById('gift-play-btn');
const giftProgress = document.getElementById('gift-progress');
const giftVolume = document.getElementById('gift-volume');
const giftCurrentTime = document.getElementById('gift-current-time');
const giftDuration = document.getElementById('gift-duration');
let resumeBgMusicAfterGift = false;

function formatGiftTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function updateGiftPlayerUI() {
  const duration = Number.isFinite(giftSong.duration) ? giftSong.duration : 0;
  const currentTime = giftSong.currentTime || 0;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  giftPlayBtn.textContent = giftSong.paused ? 'Play' : 'Pause';
  giftProgress.value = progress;
  giftCurrentTime.textContent = formatGiftTime(currentTime);
  giftDuration.textContent = formatGiftTime(duration);
}

function openGiftModal() {
  const bgMusic = document.getElementById('bg-music');
  resumeBgMusicAfterGift = !!(bgMusic && !bgMusic.paused);

  if (resumeBgMusicAfterGift) {
    bgMusic.pause();
    syncMusicUI(false);
  }

  giftModal.classList.add('open');
  giftSong.currentTime = 0;
  updateGiftPlayerUI();
  giftSong.play().catch(() => {});
  spawnEmojis(['\uD83C\uDF81', '\uD83C\uDFB6', '\u2728', '\uD83D\uDC96'], 10);
}

function closeGiftModal() {
  giftModal.classList.remove('open');
  giftSong.pause();
  giftSong.currentTime = 0;
  updateGiftPlayerUI();

  if (resumeBgMusicAfterGift) {
    const bgMusic = document.getElementById('bg-music');
    bgMusic.play().then(() => {
      syncMusicUI(true);
    }).catch(() => {
      syncMusicUI(false);
    });
  }

  resumeBgMusicAfterGift = false;
}

giftModal.addEventListener('click', function(e) {
  if (e.target === this) closeGiftModal();
});

giftPlayBtn.addEventListener('click', () => {
  if (giftSong.paused) {
    giftSong.play().catch(() => {});
    return;
  }

  giftSong.pause();
});

giftProgress.addEventListener('input', () => {
  if (!Number.isFinite(giftSong.duration) || giftSong.duration <= 0) return;
  giftSong.currentTime = (Number(giftProgress.value) / 100) * giftSong.duration;
  updateGiftPlayerUI();
});

giftVolume.addEventListener('input', () => {
  giftSong.volume = Number(giftVolume.value);
});

giftSong.volume = Number(giftVolume.value);
updateGiftPlayerUI();

giftSong.addEventListener('loadedmetadata', updateGiftPlayerUI);
giftSong.addEventListener('timeupdate', updateGiftPlayerUI);
giftSong.addEventListener('seeked', updateGiftPlayerUI);
giftSong.addEventListener('durationchange', updateGiftPlayerUI);
giftSong.addEventListener('play', updateGiftPlayerUI);
giftSong.addEventListener('pause', updateGiftPlayerUI);
giftSong.addEventListener('ended', updateGiftPlayerUI);

// FLOATING EMOJIS
function spawnEmojis(emojis, count) {
  for(let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'float-emoji';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = (20 + Math.random() * 60) + 'vw';
    el.style.bottom = '10vh';
    el.style.animationDelay = (Math.random() * 0.6) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
}

// MUSIC TOGGLE
let musicPlaying = true;
function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-btn');
  const label = document.getElementById('music-label');
  musicPlaying = !musicPlaying;
  if (musicPlaying) {
    audio.play().catch(() => {
      musicPlaying = false;
      btn.textContent = '🎵';
      btn.style.borderColor = 'rgba(232,201,122,0.4)';
      btn.style.color = 'var(--gold)';
      label.style.display = 'none';
    });
    btn.textContent = '⏸';
    btn.style.borderColor = 'rgba(244,167,195,0.6)';
    btn.style.color = 'var(--pink)';
    label.style.display = 'block';
  } else {
    audio.pause();
    audio.currentTime = 0;
    btn.textContent = '🎵';
    btn.style.borderColor = 'rgba(232,201,122,0.4)';
    btn.style.color = 'var(--gold)';
    label.style.display = 'none';
  }
}

window.addEventListener('load', () => {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-btn');
  const label = document.getElementById('music-label');

  audio.play().then(() => {
    musicPlaying = true;
    btn.textContent = '⏸';
    btn.style.borderColor = 'rgba(244,167,195,0.6)';
    btn.style.color = 'var(--pink)';
    label.style.display = 'block';
  }).catch(() => {
    musicPlaying = false;
    btn.textContent = '🎵';
    btn.style.borderColor = 'rgba(232,201,122,0.4)';
    btn.style.color = 'var(--gold)';
    label.style.display = 'none';
  });
});

musicPlaying = false;

function syncMusicUI(isPlaying) {
  const btn = document.getElementById('music-btn');
  const label = document.getElementById('music-label');
  musicPlaying = isPlaying;

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

function removeAutoStartListeners() {
  ['pointerdown', 'touchstart', 'keydown'].forEach(eventName => {
    document.removeEventListener(eventName, startMusicFromInteraction);
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
  ) return;

  const audio = document.getElementById('bg-music');
  audio.play().then(() => {
    syncMusicUI(true);
    removeAutoStartListeners();
  }).catch(() => {
    syncMusicUI(false);
  });
}

function toggleMusic() {
  const audio = document.getElementById('bg-music');

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

  audio.play().then(() => {
    syncMusicUI(true);
    removeAutoStartListeners();
  }).catch(() => {
    syncMusicUI(false);
    ['pointerdown', 'touchstart', 'keydown'].forEach(eventName => {
      document.addEventListener(eventName, startMusicFromInteraction, { passive: true });
    });
  });
});

// SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
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

// 3D TILT ON GALLERY CARDS
document.querySelectorAll('.gallery-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.05)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
