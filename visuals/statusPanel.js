Object.assign(statsPanel.style, {
    position: 'fixed',
    top: '92%',
    left: '18px',
    width: 'auto',
    minWidth: '280px',
    height: '32px',
    background: 'rgba(21, 107, 215, 0.10)',
    color: '#1851a8',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'grab',
    borderRadius: '10px',
    userSelect: 'none',
    zIndex: '1000',
    transition: 'transform 0.23s',
    boxShadow: '0 2px 22px 0 rgba(28,81,164,0.18), 0 0 15px rgba(23, 107, 215, 0.3), inset 0 0 15px rgba(23, 107, 215, 0.1)',
    backdropFilter: 'blur(1.5px)',
    WebkitBackdropFilter: 'blur(1.5px)',
    padding: '0 15px',
    border: '1px solid rgba(23, 107, 215, 0.25)'
});

const getPing = async () => {
    if(window.disablePing) return '-';
    try {
        const t = performance.now();
        await fetch('https://pt.khanacademy.org/', { method: 'HEAD' });
        return Math.round(performance.now() - t);
    } catch { return '--'; }
};

let lastFrameTime = performance.now(), frameCount = 0, fps = 0;
(function calcFPS() {
    if (++frameCount && performance.now() - lastFrameTime >= 1000) {
        fps = Math.round(frameCount * 1000 / (performance.now() - lastFrameTime));
        frameCount = 0;
        lastFrameTime = performance.now();
    }
    requestAnimationFrame(calcFPS);
})();

const getTime = () => new Date().toLocaleTimeString();

const update = async () => statsPanel.innerHTML =
    `<span style="font-weight:bold;color:#176bd7;margin-right:6px;">KhanTool</span>
    <span style="margin: 0 6px;">|</span><span>${fps}fps</span>
    <span style="margin: 0 6px;">|</span><span>${await getPing()}ms</span>
    <span style="margin: 0 6px;">|</span><span>${getTime()}</span>
    `;

update();
document.body.appendChild(statsPanel);
setInterval(update, 1000);

let dragActive = false, dragOffsetX=0, dragOffsetY=0;

statsPanel.onmousedown = function(e) {
    dragActive = true;
    dragOffsetX = e.clientX - statsPanel.offsetLeft;
    dragOffsetY = e.clientY - statsPanel.offsetTop;
    statsPanel.style.cursor = "grabbing";
    statsPanel.style.transition = "none";
    document.body.style.userSelect = "none";
};
document.onmouseup = function() {
    if(dragActive) {
        dragActive = false;
        statsPanel.style.cursor = "grab";
        statsPanel.style.transition = "transform 0.23s";
        document.body.style.userSelect = "";
    }
};
document.onmousemove = function(e) {
    if(dragActive) {
        let minX = 0, minY = 0, maxX = window.innerWidth - statsPanel.offsetWidth, maxY = window.innerHeight - statsPanel.offsetHeight;
        let x = Math.max(minX, Math.min(e.clientX - dragOffsetX, maxX));
        let y = Math.max(minY, Math.min(e.clientY - dragOffsetY, maxY));
        statsPanel.style.left = x + "px";
        statsPanel.style.top = y + "px";
    }
};

if(device && device.mobile) plppdo.on('domChanged', () =>
    window.location.href.includes("khanacademy.org/profile")
        ? statsPanel.style.display = 'flex'
        : statsPanel.style.display = 'none'
);
