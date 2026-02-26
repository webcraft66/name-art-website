// Name Art Studio - JavaScript

// Current settings
let currentSettings = {
    font: 'Dancing Script',
    colorTheme: 'romantic',
    background: 'gradient',
    textSize: 60,
    effects: {
        shadow: false,
        glow: false,
        gradient: true
    }
};

// Color themes
const colorThemes = {
    romantic: ['#ff6b9d', '#ff8fa3', '#ffc2d1', '#ffd4e5', '#ff4785'],
    ocean: ['#4d96ff', '#6bcb77', '#00cec9', '#0984e3', '#00b894'],
    sunset: ['#ff6b6b', '#ffd93d', '#f39c12', '#e74c3c', '#ff9f43'],
    royal: ['#9b59b6', '#e74c3c', '#8e44ad', '#c0392b', '#9b59b6'],
    nature: ['#2ecc71', '#3498db', '#27ae60', '#1abc9c', '#16a085'],
    gold: ['#f39c12', '#e74c3c', '#f1c40f', '#e67e22', '#d35400'],
    pastel: ['#a8e6cf', '#dcedc1', '#ffd3a5', '#c5e3f6', '#d4a5a5'],
    neon: ['#ff00ff', '#00ffff', '#ff0080', '#00ff00', '#ffff00']
};

// Background styles
const bgStyles = {
    gradient: 'linear-gradient(135deg, #fff0f5, #ffe4ec)',
    solid: '#ffffff',
    transparent: 'transparent',
    dots: 'radial-gradient(#ffb6c1 1px, transparent 1px)',
    stars: '#1a1a2e'
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    setupEnterKey();
});

// Create floating particles
function createParticles() {
    const container = document.getElementById('particles');
    const emojis = ['✨', '⭐', '💫', '🌟', '💖', '🎨', '🖌️', '✏️'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        container.appendChild(particle);
    }
}

// Setup enter key for generation
function setupEnterKey() {
    const input = document.getElementById('nameInput');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateNameArt();
        }
    });
}

// Generate name art
function generateNameArt() {
    const nameInput = document.getElementById('nameInput');
    const artPreview = document.getElementById('artPreview');
    const name = nameInput.value.trim();
    
    if (!name) {
        nameInput.focus();
        nameInput.style.borderColor = '#ff6b6b';
        setTimeout(() => {
            nameInput.style.borderColor = '#ffb6c1';
        }, 2000);
        return;
    }
    
    // Apply current settings
    applySettings(name);
    
    // Hide placeholder, show name art
    artPreview.innerHTML = `<div class="name-art-text" id="nameArtText" style="font-family: '${currentSettings.font}', cursive;">
        ${name}
    </div>`;
    
    applyNameArtStyles();
}

// Apply settings to the name art
function applySettings(name) {
    const artPreview = document.getElementById('artPreview');
    const nameArtText = document.getElementById('nameArtText');
    
    if (!nameArtText) return;
    
    // Apply font
    nameArtText.style.fontFamily = `'${currentSettings.font}', cursive`;
    
    // Apply size
    nameArtText.style.fontSize = currentSettings.textSize + 'px';
    
    // Apply background
    if (currentSettings.background === 'gradient') {
        artPreview.className = 'art-preview bg-gradient';
    } else if (currentSettings.background === 'solid') {
        artPreview.className = 'art-preview bg-solid';
    } else if (currentSettings.background === 'transparent') {
        artPreview.className = 'art-preview bg-transparent';
    } else if (currentSettings.background === 'dots') {
        artPreview.className = 'art-preview bg-dots';
    } else if (currentSettings.background === 'stars') {
        artPreview.className = 'art-preview bg-stars';
    }
}

// Apply name art styles
function applyNameArtStyles() {
    const nameArtText = document.getElementById('nameArtText');
    if (!nameArtText) return;
    
    const colors = colorThemes[currentSettings.colorTheme];
    
    // Apply gradient text
    if (currentSettings.effects.gradient) {
        nameArtText.style.background = `linear-gradient(45deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]}, ${colors[4]})`;
        nameArtText.style.backgroundClip = 'text';
        nameArtText.style.webkitBackgroundClip = 'text';
        nameArtText.style.webkitTextFillColor = 'transparent';
        nameArtText.style.color = colors[0];
    } else {
        nameArtText.style.background = 'none';
        nameArtText.style.backgroundClip = 'initial';
        nameArtText.style.webkitBackgroundClip = 'initial';
        nameArtText.style.webkitTextFillColor = 'initial';
        nameArtText.style.color = colors[0];
    }
    
    // Apply shadow
    if (currentSettings.effects.shadow) {
        nameArtText.style.textShadow = '3px 3px 6px rgba(0, 0, 0, 0.3)';
    } else {
        nameArtText.style.textShadow = 'none';
    }
    
    // Apply glow
    if (currentSettings.effects.glow) {
        nameArtText.style.textShadow = `0 0 20px ${colors[0]}, 0 0 40px ${colors[1]}`;
    }
}

// Set font
function setFont(fontName) {
    currentSettings.font = fontName;
    
    // Update UI
    document.querySelectorAll('.font-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.font === fontName) {
            btn.classList.add('active');
        }
    });
    
    // Regenerate if there's a name
    regenerateIfExists();
}

// Set color theme
function setColorTheme(theme) {
    currentSettings.colorTheme = theme;
    
    // Update UI
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });
    
    // Regenerate if there's a name
    regenerateIfExists();
}

// Set background
function setBackground(bg) {
    currentSettings.background = bg;
    
    // Update UI
    document.querySelectorAll('.bg-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.bg === bg) {
            btn.classList.add('active');
        }
    });
    
    // Regenerate if there's a name
    regenerateIfExists();
}

// Update text size
function updateTextSize(size) {
    currentSettings.textSize = parseInt(size);
    document.getElementById('sizeValue').textContent = size + 'px';
    
    // Regenerate if there's a name
    regenerateIfExists();
}

// Update effects
function updateEffects() {
    currentSettings.effects.shadow = document.getElementById('shadowEffect').checked;
    currentSettings.effects.glow = document.getElementById('glowEffect').checked;
    currentSettings.effects.gradient = document.getElementById('gradientText').checked;
    
    // Regenerate if there's a name
    regenerateIfExists();
}

// Regenerate if name exists
function regenerateIfExists() {
    const name = document.getElementById('nameInput').value.trim();
    if (name) {
        applySettings(name);
    }
}

// Download artwork
function downloadArt() {
    const name = document.getElementById('nameInput').value.trim();
    if (!name) {
        alert('Please enter a name first! ✨');
        return;
    }
    
    // Create a canvas to draw the name art
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 600;
    canvas.height = 300;
    
    // Draw background
    if (currentSettings.background === 'gradient') {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#fff0f5');
        gradient.addColorStop(1, '#ffe4ec');
        ctx.fillStyle = gradient;
    } else if (currentSettings.background === 'stars') {
        ctx.fillStyle = '#1a1a2e';
    } else {
        ctx.fillStyle = '#ffffff';
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw name
    const colors = colorThemes[currentSettings.colorTheme];
    ctx.font = `${currentSettings.textSize}px "${currentSettings.font}"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Apply gradient
    if (currentSettings.effects.gradient) {
        const textGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        colors.forEach((color, i) => {
            textGradient.addColorStop(i / (colors.length - 1), color);
        });
        ctx.fillStyle = textGradient;
    } else {
        ctx.fillStyle = colors[0];
    }
    
    // Apply shadow/glow
    if (currentSettings.effects.shadow) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
    }
    
    if (currentSettings.effects.glow) {
        ctx.shadowColor = colors[0];
        ctx.shadowBlur = 20;
    }
    
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);
    
    // Download
    const link = document.createElement('a');
    link.download = `${name}-name-art.png`;
    link.href = canvas.toDataURL();
    link.click();
}

// Copy to clipboard
async function copyToClipboard() {
    const name = document.getElementById('nameInput').value.trim();
    if (!name) {
        alert('Please enter a name first! ✨');
        return;
    }
    
    try {
        // Create a canvas for copying
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 400;
        canvas.height = 200;
        
        // Draw background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw name
        const colors = colorThemes[currentSettings.colorTheme];
        ctx.font = `${Math.min(currentSettings.textSize, 48)}px "${currentSettings.font}"`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        if (currentSettings.effects.gradient) {
            const textGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            colors.forEach((color, i) => {
                textGradient.addColorStop(i / (colors.length - 1), color);
            });
            ctx.fillStyle = textGradient;
        } else {
            ctx.fillStyle = colors[0];
        }
        
        ctx.fillText(name, canvas.width / 2, canvas.height / 2);
        
        // Copy to clipboard
        const blob = await new Promise(resolve => canvas.toBlob(resolve));
        await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
        ]);
        
        alert('Copied to clipboard! 📋✨');
    } catch (err) {
        alert('Could not copy. Try downloading instead! 💾');
    }
}

// Share art
function shareArt() {
    const name = document.getElementById('nameInput').value.trim();
    if (!name) {
        alert('Please enter a name first! ✨');
        return;
    }
    
    if (navigator.share) {
        navigator.share({
            title: 'Name Art Studio',
            text: `Check out this beautiful name art for "${name}"! ✨`,
            url: window.location.href
        }).catch(() => {});
    } else {
        // Fallback: copy URL
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard! 🔗✨');
    }
}

// Load from gallery
function loadFromGallery(name) {
    document.getElementById('nameInput').value = name;
    generateNameArt();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
