const ver = "V1.0";
let isDev = false;

let user = {
    username: "Username",
    nickname: "KhanHack",
    UID: 0
};

let loadedPlugins = [];

const unloader = document.createElement('unloader');
const dropdownMenu = document.createElement('dropDownMenu');
const watermark = document.createElement('watermark');
const statsPanel = document.createElement('statsPanel');
const splashScreen = document.createElement('splashScreen');

window.features = {
    questionSpoof: true,
    videoSpoof: true,
    showAnswers: true,
    autoAnswer: true,
    customBanner: false,
    nextRecomendation: false,
    repeatQuestion: false,
    minuteFarmer: false,
    rgbLogo: false,
    darkMode: true
};
window.featureConfigs = {
    autoAnswerDelay: 3,
    customUsername: "",
    customPfp: ""
};

document.addEventListener('contextmenu', (e) => !window.disableSecurity && e.preventDefault());
document.addEventListener('keydown', (e) => {
    if (!window.disableSecurity && (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)))) {
        e.preventDefault();
    }
});
console.log(Object.defineProperties(new Error, {
    toString: {value() {(new Error).stack.includes('toString@') && location.reload();}},
    message: {get() {location.reload();}},
}));

document.head.appendChild(Object.assign(document.createElement("style"),{innerHTML:"@font-face{font-family:'Arial';}"}));
document.head.appendChild(Object.assign(document.createElement('style'),{innerHTML:"::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #e4f1fd; } ::-webkit-scrollbar-thumb { background: #176bd7; border-radius: 10px; } ::-webkit-scrollbar-thumb:hover { background: #06376b; }"}));

class EventEmitter {
    constructor() { this.events = {} }
    on(t, e) { "string" == typeof t && (t = [t]), t.forEach(t => { this.events[t] || (this.events[t] = []), this.events[t].push(e) }) }
    off(t, e) { "string" == typeof t && (t = [t]), t.forEach(t => { this.events[t] && (this.events[t] = this.events[t].filter(t => t !== e)) }) }
    emit(t, ...e) { this.events[t] && this.events[t].forEach(t => { t(...e) }) }
    once(t, e) { "string" == typeof t && (t = [t]); let s = (...i) => { e(...i), this.off(t, s) }; this.on(t, s) }
};
const plppdo = new EventEmitter();

new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList)
        if (mutation.type === 'childList')
            plppdo.emit('domChanged');
}).observe(document.body, { childList: true, subtree: true });

window.debug = function (text) { };
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = url => { const audio = new Audio(url); audio.play(); };
const findAndClickBySelector = selector => { const element = document.querySelector(selector); if (element) { element.click(); sendToast(`Automatic Action: ${selector}`, 900); } };

function sendToast(text, duration = 3000, gravity = 'bottom') {
    // START: Hardcoded sendToast (replaces toastify.min.js usage)
    let container = document.getElementById('custom-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'custom-toast-container';
        document.body.appendChild(container);
    }
    container.setAttribute('data-gravity', gravity);

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = text;
    container.appendChild(toast);

    // Show the toast
    setTimeout(() => { toast.classList.add('show'); }, 10);

    // Hide and remove the toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { toast.remove(); }, 400); // Wait for transition
    }, duration);
    // END: Hardcoded sendToast
}

async function showSplashScreen() {
    splashScreen.style.cssText =
        "position:fixed;top:0;left:0;width:100%;height:100%;background:linear-gradient(122deg,#e4f1fd 0%,#176bd7 100%);display:flex;" +
        "align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity 0.5s ease;user-select:none;" +
        "color:#1851a8;font-family:Arial,sans-serif;font-size:34px;text-align:center;letter-spacing:.05em;flex-direction:column;";
    splashScreen.innerHTML =
        // LOGO/BRANDING REMOVED
        '<span style="font-weight:800;line-height:32px;letter-spacing:2.5px;font-size:30px;color:#176bd7">Script Injected</span>' +
        '<span style="margin-top:7px;font-size:14px;color:#2e5c94;font-weight:500;">Loading...</span>'; // Translated
    document.body.appendChild(splashScreen);
    setTimeout(() => splashScreen.style.opacity = '1', 10);
}

async function hideSplashScreen() { splashScreen.style.opacity = '0'; setTimeout(() => splashScreen.remove(), 800); }

function setupMenu() {
    // START: mainMenu.js content (Translated and modified to remove external links and logo)
    if (!window.features) {
        window.features = {
            autoAnswer: true,
            questionSpoof: true,
            videoSpoof: true,
            minuteFarmer: false,
            customBanner: false,
            rgbLogo: false,
            darkMode: true
        };
    }

    const topPanel = document.createElement('div');
    topPanel.style.cssText = "position:fixed;top:22px;left:30px;width:310px;height:60px;background:linear-gradient(94deg,#2196f3 0%,#176bd7 60%,#93cdfa 100%);z-index:10500;box-shadow:0 6px 20px #2196f667;display:flex;align-items:center;border-radius:15px;user-select:none;cursor:pointer;padding:0 24px 0 22px;gap:16px;";
    topPanel.innerHTML =
      `<div style="display:flex;flex-direction:column;gap:6px;">
          <span style="font-weight:700;line-height:1;color:#fff;font-size:18px;">${user.nickname}</span>
          <span style="font-size:12px;color:#c9e6ff;font-weight:500;">UID: ${user.UID} | ${ver}</span>
       </div>
       <div style="flex-grow:1;"></div>
       `;

    const menuPanel = document.createElement('div');
    menuPanel.style.cssText = "position:fixed;top:87px;left:30px;width:310px;background:#e4f1fd;z-index:10500;box-shadow:0 6px 20px #2196f667;display:none;align-items:center;border-radius:15px;user-select:none;padding:12px 0;flex-direction:column;gap:5px;";
    menuPanel.innerHTML = `
       <div style="width:100%;display:flex;flex-direction:column;padding:0 12px;box-sizing:border-box;margin-bottom:10px;">
          <h3 style="color:#176bd7;font-size:14px;font-weight:600;margin:5px 0 8px 0;padding:0 12px;">Features</h3> <div id="featureToggles" style="display:flex;flex-direction:column;gap:6px;">
             ${Object.keys(window.features).map(key => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                   <span style="font-size:14px;color:#1851a8;font-weight:500;">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                   <input type="checkbox" id="toggle-${key}" ${window.features[key] ? 'checked' : ''} style="cursor:pointer;">
                </div>
             `).join('')}
          </div>
       </div>
       <div style="width:100%;display:flex;flex-direction:column;padding:0 12px;box-sizing:border-box;margin-bottom:10px;">
          <h3 style="color:#176bd7;font-size:14px;font-weight:600;margin:5px 0 8px 0;padding:0 12px;">Configurations</h3> <div id="featureConfigs" style="display:flex;flex-direction:column;gap:6px;">
             ${Object.keys(window.featureConfigs).map(key => `
                <div style="display:flex;flex-direction:column;padding:8px 12px;background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                   <label for="config-${key}" style="font-size:14px;color:#1851a8;font-weight:500;margin-bottom:5px;">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                   <input type="text" id="config-${key}" value="${window.featureConfigs[key]}" style="padding:5px;border:1px solid #ccc;border-radius:4px;font-size:12px;color:#333;">
                </div>
             `).join('')}
          </div>
       </div>
    `;

    document.body.appendChild(topPanel);
    document.body.appendChild(menuPanel);

    document.getElementById('featureToggles').querySelectorAll('input[type="checkbox"]').forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const featureKey = e.target.id.replace('toggle-', '');
            window.features[featureKey] = e.target.checked;
            sendToast(`${featureKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} set to ${e.target.checked ? 'ON' : 'OFF'}!`, 1100); // Translated
        });
    });

    document.getElementById('featureConfigs').querySelectorAll('input[type="text"]').forEach(input => {
        input.addEventListener('change', (e) => {
            const configKey = e.target.id.replace('config-', '');
            window.featureConfigs[configKey] = e.target.value;
            sendToast(`${configKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} updated!`, 1100); // Translated
        });
    });

    function updateMenuPosition() {
        menuPanel.style.left = topPanel.style.left;
        const topPanelBottom = parseInt(topPanel.style.top) + topPanel.offsetHeight + 15;
        menuPanel.style.top = `${topPanelBottom}px`;
    }

    let isDragging = false;
    let dragStarted = false;
    let dragOffset = [0, 0];
    let clickTimer = null;

    topPanel.addEventListener('mousedown', function(e) {
        clickTimer = null;
        isDragging = true;
        dragStarted = false;
        dragOffset = [e.clientX - topPanel.offsetLeft, e.clientY - topPanel.offsetTop];
        topPanel.style.boxShadow = "0 6px 20px #2196f690";

        // Detect if this is a click or a drag start
        setTimeout(() => {
            if (isDragging && (Math.abs(e.clientX - (topPanel.offsetLeft + dragOffset[0])) > 5 || Math.abs(e.clientY - (topPanel.offsetTop + dragOffset[1])) > 5)) {
                dragStarted = true;
            }
        }, 100);
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging || !dragStarted) return;
        
        let x = Math.max(0, Math.min(e.clientX - dragOffset[0], window.innerWidth - topPanel.offsetWidth));
        let y = Math.max(0, Math.min(e.clientY - dragOffset[1], window.innerHeight - topPanel.offsetHeight));
        
        topPanel.style.left = x + "px";
        topPanel.style.top = y + "px";
        
        if (menuPanel.style.display === "flex") {
            updateMenuPosition();
        }
    });

    document.addEventListener('mouseup', function() {
        if (!isDragging) return;
        
        const wasDragStarted = dragStarted;
        isDragging = false;
        dragStarted = false;
        topPanel.style.boxShadow = "0 6px 20px #2196f667";
        document.body.style.userSelect = "";
        
        if (!wasDragStarted) {
            clickTimer = setTimeout(function() {
                updateMenuPosition();
                menuPanel.style.display = (menuPanel.style.display === "none" ? "flex" : "none");
            }, 10);
        } else {
            updateMenuPosition();
        }
    });

    window.addEventListener('resize', function () {
        const currentLeft = parseInt(topPanel.style.left) || 30;
        const currentTop = parseInt(topPanel.style.top) || 22;
        
        if (currentLeft + topPanel.offsetWidth > window.innerWidth) {
            topPanel.style.left = (window.innerWidth - topPanel.offsetWidth) + "px";
        }
        if (currentTop + topPanel.offsetHeight > window.innerHeight) {
            topPanel.style.top = (window.innerHeight - topPanel.offsetHeight) + "px";
        }
        updateMenuPosition();
    });
    // END: mainMenu.js content

    // START: statusPanel.js content (Translated)
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
            await fetch('https://www.khanacademy.org/api/v1/user', { method: 'GET', cache: 'no-store' });
            return Math.round(performance.now() - t);
        } catch {
            return 'Offline';
        }
    };

    const getFPS = () => {
        let lastTime = 0;
        let frameCount = 0;
        let fps = 0;

        const updateFPS = (now) => {
            frameCount++;
            if (now - lastTime >= 1000) {
                fps = frameCount;
                frameCount = 0;
                lastTime = now;
            }
            requestAnimationFrame(updateFPS);
        };
        requestAnimationFrame(updateFPS);
        return () => fps;
    };
    const getFpsValue = getFPS();

    const getTime = () => {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    async function update() {
        const fps = getFpsValue();
        statsPanel.innerHTML = `
        <span>${user.username}</span>
        <span style="margin: 0 6px;">|</span><span>${fps}fps</span>
        <span style="margin: 0 6px;">|</span><span>${await getPing()}ms</span>
        <span style="margin: 0 6px;">|</span><span>${getTime()}</span>
        `;
    }

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
    // END: statusPanel.js content

    // widgetBot.js content removed

    if(isDev) { 
        // START: devTab.js content (Translated)
        plppdo.on('domChanged', () => {
            if (document.getElementById('khanwareTab')) return;
            function createTab(name, href = '#') {
                const li = document.createElement('li');
                li.innerHTML = `<a class=\"_8ry3zep\" href=\"${href}\" target=\"_blank\"><span class=\"_xy39ea8\">${name}</span></a>`;
                return li;
            }
            const nav = document.querySelector('nav[data-testid=\"side-nav\"]');
            if (!nav) return;
            const section = document.createElement('section');
            section.id = 'khanwareTab';
            section.className = '_1ozlbq6';
            section.innerHTML = '<h2 class=\"_18undph9\" style=\"color:#176bd7;\">KhanHack Dev</h2>'; // Translated: KhanHack Dev
            const ul = document.createElement('ul');
            const devTab = createTab('Developer', '#'); // Translated: Developer
            devTab.querySelector('a').addEventListener('click', (e) => {
                e.preventDefault();
                window.khanwareWin = window.open("", "_blank");
                if (window.khanwareWin) {
                    window.khanwareWin.document.write(`
                        <html>
                        <head>
                            <title>KhanHack — Developer</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    height: 100vh;
                                    background: linear-gradient(110deg, #e4f1fd 0%, #176bd7 100%);
                                    margin: 0;
                                }
                                #dev-container {
                                    background: #fff;
                                    border-radius: 15px;
                                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                                    padding: 25px;
                                    width: 90%;
                                    max-width: 800px;
                                    display: flex;
                                    flex-direction: column;
                                    max-height: 90vh;
                                }
                                h1 {
                                    color: #176bd7;
                                    border-bottom: 2px solid #ccc;
                                    padding-bottom: 10px;
                                    margin-top: 0;
                                }
                                h2 {
                                    color: #2196f3;
                                    margin-top: 15px;
                                    border-bottom: 1px solid #eee;
                                    padding-bottom: 5px;
                                }
                                .section-content {
                                    margin-bottom: 20px;
                                    padding: 0 10px;
                                    overflow-y: auto;
                                }
                                .toggle {
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    background: #f8f9fa;
                                    padding: 10px;
                                    border-radius: 8px;
                                    margin-bottom: 5px;
                                }
                                .toggle strong {
                                    font-size: 16px;
                                    color: #333;
                                }
                                .toggle small {
                                    color: #777;
                                }
                                textarea {
                                    width: 100%;
                                    height: 150px;
                                    box-sizing: border-box;
                                    border: 1px solid #ccc;
                                    border-radius: 5px;
                                    padding: 10px;
                                    resize: none;
                                    font-family: monospace;
                                    font-size: 12px;
                                }
                                .button-group {
                                    display: flex;
                                    gap: 10px;
                                    margin-top: 10px;
                                }
                                button {
                                    padding: 10px 15px;
                                    border: none;
                                    border-radius: 5px;
                                    cursor: pointer;
                                    font-weight: bold;
                                    transition: background-color 0.2s;
                                }
                                #clearDebug {
                                    background-color: #f44336;
                                    color: white;
                                }
                                #clearDebug:hover {
                                    background-color: #d32f2f;
                                }
                            </style>
                        </head>
                        <body>
                            <div id="dev-container">
                                <h1>Developer Panel</h1>
                                
                                <h2>Toggles</h2>
                                <div id="toggles" class="section-content">
                                    </div>

                                <h2>Debug Log</h2>
                                <div class="section-content" style="flex-grow: 1;">
                                    <textarea id="debugBox" readonly></textarea>
                                </div>
                                <div class="button-group">
                                    <button id="clearDebug">Clear Log</button>
                                </div>
                            </div>

                            <script>
                                document.getElementById('clearDebug').addEventListener('click', () => {
                                    document.getElementById('debugBox').value = '';
                                });
                                // Keep this window open even if the main page navigates
                                window.onbeforeunload = () => {};
                            </script>
                        </body>
                        </html>
                    `);

                    // Inject toggles after window opens
                    window.khanwareWin.document.addEventListener('DOMContentLoaded', () => {
                        window.createToggle('Debug Mode', 'Enable logging to the debug console.', 'debugMode', window.debugMode || false);
                        window.createToggle('Disable Security', 'Disable F12/Ctrl+Shift+I prevention.', 'disableSecurity', window.disableSecurity || false);
                        window.createToggle('Disable Ping', 'Disable the Ping check in the status panel.', 'disablePing', window.disablePing || false);
                    });
                }
            });
            ul.appendChild(devTab);
            section.appendChild(ul);
            nav.appendChild(section);
        });
        window.createToggle = function(name, desc, varName, toggled = false) {
            if (!window.khanwareWin || window.khanwareWin.closed) return;
            const toggleContainer = window.khanwareWin.document.getElementById('toggles');
            if (!toggleContainer) return;
            const toggleId = `toggle-${varName}`;
            const toggleElement = document.createElement('div');
            toggleElement.className = 'toggle';
            toggleElement.innerHTML = `
                <div>
                    <strong>${name}</strong><br>
                    <small>${desc}</small>
                </div>
                <input type=\"checkbox\" id=\"${toggleId}\" ${toggled ? "checked" : ""}>
            `;
            toggleElement.querySelector('input').addEventListener('change', (e) => {
                window[varName] = e.target.checked;
                debug(`${name} set to ${window[varName]}!`); // Translated
            });
            toggleContainer.appendChild(toggleElement);
        };
        window.debug = function(message) {
            if (!window.khanwareWin || window.khanwareWin.closed || !window.debugMode) return;
            const debugBox = window.khanwareWin.document.getElementById('debugBox');
            if (debugBox) {
                debugBox.innerHTML += message + '\n';
                debugBox.scrollTop = debugBox.scrollHeight;
            }
        };
        window.onerror = function(message, source, lineno, colno, error) {
            if (!window.debugMode) return;
            debug(`[ERROR] ${message} in ${source} at line ${lineno}`);
        };
        // END: devTab.js content
    }
}

function setupMain() {
    // START: questionSpoof.js content (Translated and external link removed)
    const originalFetch_qs = window.fetch;

    window.fetch = async function (input, init) {
        let body;
        if (input instanceof Request) body = await input.clone().text();
        else if (init && init.body) body = init.body;

        const originalResponse = await originalFetch_qs.apply(this, arguments);
        const clonedResponse = originalResponse.clone();

        try {
            const responseBody = await clonedResponse.text();
            let responseObj = JSON.parse(responseBody);

            if (window.features.questionSpoof && responseObj?.data?.assessmentItem?.item?.itemData) {
                let itemData = JSON.parse(responseObj.data.assessmentItem.item.itemData);

                if (itemData.question.content[0] === itemData.question.content[0].toUpperCase()) {
                    itemData.answerArea = { 
                        "calculator": false, 
                        "chi2Table": false, 
                        "periodicTable": false, 
                        "tTable": false, 
                        "zTable": false 
                    };

                    itemData.question.content = "🫐 KhanHack: Exploit Active [[☃ radio 1]]"; // Translated and Discord link removed
                    
                    itemData.question.widgets = { 
                        "radio 1": { 
                            type: "radio", 
                            options: { 
                                choices: [ 
                                    { content: "Correct Answer.", correct: true }, // Translated
                                    { content: "Incorrect Answer.", correct: false } // Translated
                                ] 
                            } 
                        } 
                    };

                    responseObj.data.assessmentItem.item.itemData = JSON.stringify(itemData);
                    sendToast("🔓 Question exploited by KhanHack.", 1000); // Translated

                    return new Response(JSON.stringify(responseObj), { 
                        status: originalResponse.status, 
                        statusText: originalResponse.statusText, 
                        headers: originalResponse.headers 
                    });
                }
            }
        } catch (e) { }

        return originalResponse;
    };
    // END: questionSpoof.js content
    
    // START: videoSpoof.js content (Translated)
    const originalFetch_vs = window.fetch;
    window.fetch = async function (input, init) {
        let body;
        if (input instanceof Request) body = await input.clone().text();
        else if (init && init.body) body = init.body;
        if (features.videoSpoof && body && body.includes('"operationName":"updateUserVideoProgress"')) {
            try {
                let bodyObj = JSON.parse(body);
                if (bodyObj.variables && bodyObj.variables.input) {
                    const durationSeconds = bodyObj.variables.input.durationSeconds;
                    bodyObj.variables.input.secondsWatched = durationSeconds;
                    bodyObj.variables.input.lastSecondWatched = durationSeconds;
                    body = JSON.stringify(bodyObj);
                    if (input instanceof Request) { input = new Request(input, { body: body }); } 
                    else init.body = body; 
                    sendToast("Video automatically completed.", 1100); // Translated
                }
            } catch (e) { debug(`Error @ videoSpoof.js\n${e}`); } // Translated
        }
        return originalFetch_vs.apply(this, arguments);
    };
    // END: videoSpoof.js content
    
    // START: minuteFarm.js content (Translated)
    const originalFetch_minuteFarm = window.fetch;
    window.fetch = async function (input, init = {}) {
        let body;
        if (input instanceof Request) body = await input.clone().text();
        else if (init.body) body = init.body;
        if (features.minuteFarmer && body && input.url.includes("mark_conversions")) {
            try {
                if (body.includes("termination_event")) { sendToast("Time limit ignored!", 1100); return; } // Translated
            } catch (e) { debug(`Error @ minuteFarm.js\n${e}`); } // Translated
        }
        return originalFetch_minuteFarm.apply(this, arguments);
    };
    // END: minuteFarm.js content
    
    // START: spoofUser.js content (Translated)
    plppdo.on('domChanged', () => {
        try {
            const pfpElement = document.querySelector('.avatar-pic');
            const nicknameElement = document.querySelector('.user-deets.editable h2');
            const desiredUsername = featureConfigs.customUsername || user.nickname;
            if (nicknameElement && nicknameElement.textContent !== desiredUsername) nicknameElement.textContent = desiredUsername;
            if (featureConfigs.customPfp && pfpElement) {
                if (pfpElement.src !== featureConfigs.customPfp) {
                    pfpElement.src = featureConfigs.customPfp; 
                    pfpElement.alt = "Custom Profile";
                    pfpElement.style.borderRadius = "50%";
                }
            }
        } catch(e){ debug(`Error @ spoofUser.js\n${e}`);} // Translated
    });
    // END: spoofUser.js content
    
    // START: answerRevealer.js content
    const originalParse = JSON.parse;
    JSON.parse = function (e, t) {
        let body = originalParse(e, t);
        try {
            if (body?.data) {
                Object.keys(body.data).forEach(key => {
                    const data = body.data[key];
                    if (features.showAnswers && key === "assessmentItem" && data?.item) {
                        const itemData = JSON.parse(data.item.itemData);
                        if (itemData.question && itemData.question.widgets && itemData.question.content[0] === itemData.question.content[0].toUpperCase()) {
                            Object.keys(itemData.question.widgets).forEach(widgetKey => {
                                const widget = itemData.question.widgets[widgetKey];
                                if (widget.options && widget.options.choices) {
                                    widget.options.choices.forEach(choice => {
                                        if (choice.correct) {
                                            choice.content = "[Correct Answer] " + choice.content; // Translated
                                            sendToast("Answers revealed!", 1200); // Translated
                                        }
                                    });
                                }
                            });
                            data.item.itemData = JSON.stringify(itemData);
                        }
                    }
                }
                );
            }
        } catch (e) { debug(`Error @ answerRevealer.js\n${e}`); } // Translated
        return body;
    };
    // END: answerRevealer.js content
    
    // START: rgbLogo.js content (Translated - Debug)
    function applyRGBLogo() {
        if (!features.rgbLogo) return;
        
        const possibleSelectors = [
            'svg._1rt6g9t path:nth-last-of-type(2)',
            '[data-testid="khan-logo"] svg path',
            '.logo svg path',
            'svg[class*="logo"] path',
            'header svg path',
            '[aria-label*="Khan"] svg path',
            'svg path[fill="#00af93"]',
            'svg path[fill*="#"]'
        ];
        
        let khanLogo = null;
        
        for (const selector of possibleSelectors) {
            khanLogo = document.querySelector(selector);
            if (khanLogo) break;
        }
        
        if (khanLogo) {
            if (!document.querySelector('style.RGBLogo')) {
                const styleElement = document.createElement('style');
                styleElement.className = "RGBLogo";
                styleElement.textContent = `
                @keyframes colorShift { 
                    0% { fill: #2196f3 !important; } 
                    25% { fill: #e91e63 !important; } 
                    50% { fill: #ffd600 !important; }
                    75% { fill: #7ad878 !important; }
                    100% { fill: #2196f3 !important; }
                }
                .rgb-logo-active {
                    animation: colorShift 3.8s linear infinite !important;
                    fill: #2196f3 !important;
                }`;
                document.head.appendChild(styleElement);
            }
            
            if (khanLogo.getAttribute('data-darkreader-inline-fill')) {
                khanLogo.removeAttribute('data-darkreader-inline-fill');
            }
            
            khanLogo.classList.add('rgb-logo-active');
            khanLogo.style.animation = 'colorShift 3.8s linear infinite';
            khanLogo.style.fill = '#2196f3';
        }
    }

    function removeRGBLogo() {
        const logos = document.querySelectorAll('.rgb-logo-active');
        logos.forEach(logo => {
            logo.classList.remove('rgb-logo-active');
            logo.style.animation = '';
            logo.style.fill = '';
        });
    }

    if (typeof plppdo !== 'undefined') {
        plppdo.on('domChanged', () => {
            try {
                if (features.rgbLogo) {
                    applyRGBLogo();
                } else {
                    removeRGBLogo();
                }
            } catch (e) {
                debug(`Error @ rgbLogo.js\n${e}`); // Translated
            }
        });
    } else {
        setInterval(() => {
            try {
                if (features.rgbLogo) {
                    applyRGBLogo();
                } else {
                    removeRGBLogo();
                }
            } catch (e) {
                debug(`Error @ rgbLogo.js\n${e}`); // Translated
            }
        }, 1000);
    }
    // END: rgbLogo.js content
    
    // START: customBanner.js content (Translated)
    const phrases = [ 
        "No grade? No chance.", // Translated
        "KhanHack on top.", // Translated
        "KhanHack sent a greeting!", // Translated
        "I wish I had KhanHack.", // Translated
        "Save time, use KhanHack!", // Translated
        "KhanHack is flying high!" // Translated
    ];

    setInterval(() => { 
        if (features.customBanner) {
            const possibleSelectors = [
                '.stp-animated-banner h2',
                '[data-testid="banner"] h2',
                '.banner h2',
                '.announcement-banner h2',
                'h2[class*="banner"]',
                '.hero-banner h2',
                'div[class*="banner"] h2'
            ];
            
            for (const selector of possibleSelectors) {
                const greeting = document.querySelector(selector);
                if (greeting) {
                    greeting.textContent = phrases[Math.floor(Math.random() * phrases.length)];
                    break;
                }
            }
        }
    }, 2000);
    // END: customBanner.js content
    
    // START: autoAnswer.js content (Translated)
    const baseSelectors = [
        `[data-testid="choice-icon__library-choice-icon"]`,
        `[data-testid="exercise-check-answer"]`,
        `[data-testid="exercise-next-question"]`,
        `._1udzurba`,
        `._awve9b`
    ];
    
    let lastActionTime = 0;
    let isProcessing = false;
    let toastCooldown = false;
    let answerSelected = false;
    let scriptInitialized = false;
    let consecutiveFailures = 0;
    
    function resetState() {
        answerSelected = false;
        isProcessing = false;
        consecutiveFailures = 0;
        lastActionTime = 0;
    }
    
    function waitForPageReady() {
        return new Promise((resolve) => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve, { once: true });
            }
        });
    }
    
    if (features.autoAnswer) {
        let khanwareDominates = true;
        
        (async () => {
            await waitForPageReady();
            
            setTimeout(() => {
                scriptInitialized = true;
                if (typeof sendToast === 'function') {
                    sendToast("🤖 AutoAnswer activated!", 1000); // Translated
                }
            }, 1000);
            
            while (khanwareDominates) {
                if (!scriptInitialized) {
                    await delay(100);
                    continue;
                }
                
                if (!features.autoAnswer) {
                    khanwareDominates = false;
                    break;
                }
                
                if (isProcessing) {
                    await delay(500);
                    continue;
                }
                
                const currentTime = Date.now();
                if (currentTime - lastActionTime < featureConfigs.autoAnswerDelay * 1000) {
                    await delay(100);
                    continue;
                }
                
                isProcessing = true;
                let actionTaken = false;
                
                try {
                    // 1. Click an answer choice (if available)
                    if (!answerSelected) {
                        const choice = document.querySelector(baseSelectors[0]);
                        if (choice) {
                            choice.click();
                            answerSelected = true;
                            consecutiveFailures = 0;
                            actionTaken = true;
                            sendToast(`Automatic Action: Selected answer.`, 900); // Translated
                        } else {
                            consecutiveFailures++;
                        }
                    }
                    
                    // 2. Click "Check Answer"
                    if (answerSelected) {
                        const checkButton = document.querySelector(baseSelectors[1]);
                        if (checkButton) {
                            checkButton.click();
                            answerSelected = false; // Reset after checking
                            consecutiveFailures = 0;
                            actionTaken = true;
                            sendToast(`Automatic Action: Check Answer.`, 900); // Translated
                        }
                    }
                    
                    // 3. Click "Next Question"
                    if (!actionTaken) {
                        const nextButton = document.querySelector(baseSelectors[2]);
                        if (nextButton) {
                            nextButton.click();
                            consecutiveFailures = 0;
                            actionTaken = true;
                            sendToast(`Automatic Action: Next Question.`, 900); // Translated
                        }
                    }

                    // 4. Fallback button clicks (e.g., continue/done buttons)
                    if (!actionTaken) {
                        for (let i = 3; i < baseSelectors.length; i++) {
                            const fallbackButton = document.querySelector(baseSelectors[i]);
                            if (fallbackButton) {
                                fallbackButton.click();
                                consecutiveFailures = 0;
                                actionTaken = true;
                                sendToast(`Automatic Action: Fallback Button (${i}).`, 900); // Translated
                                break;
                            }
                        }
                    }
                    
                } catch (e) {
                    debug(`Error @ autoAnswer.js\n${e}`); // Translated
                }
                
                isProcessing = false;
                if (actionTaken) {
                    lastActionTime = Date.now();
                } else {
                    // Check for completion indicators if no action was taken
                    const completionIndicators = [
                        `[aria-label*="complete"]`, // Translated
                        `[aria-label*="completed"]` // Translated
                    ];
                    
                    for (const indicator of completionIndicators) {
                        if (document.querySelector(indicator)) {
                            if (!toastCooldown) {
                                toastCooldown = true;
                                if (typeof sendToast === 'function') {
                                    sendToast("✅ Activity finished!", 2000); // Translated
                                }
                                setTimeout(() => { 
                                    toastCooldown = false;
                                    resetState();
                                }, 5000);
                            }
                            break;
                        }
                    }
                    
                    if (consecutiveFailures > 10) {
                        resetState();
                        await delay(2000);
                        if (typeof sendToast === 'function') {
                            sendToast("🔄 AutoAnswer restarted!", 1000); // Translated
                        }
                    }
                }
                
                await delay(actionTaken ? 800 : 400);
            }
        })();
    }
    
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && features.autoAnswer) {
            resetState();
            setTimeout(() => {
                scriptInitialized = true;
            }, 500);
        }
    });
    
    window.addEventListener('beforeunload', () => {
        resetState();
    });
    // END: autoAnswer.js content
}

(async function(){
    await showSplashScreen();

    // START: DarkReader.min.js content (User needs to paste this here if Dark Mode is desired)
    // paste darkreader.min.js here if using dark mode
    if(window.DarkReader){ DarkReader.setFetchMethod(window.fetch); DarkReader.enable(); }
    // END: DarkReader.min.js content
    
    // START: Hardcoded Toast CSS (replaces toastify.min.css)
    document.head.appendChild(Object.assign(document.createElement('style'),{innerHTML:`
        /* Custom Toast CSS - Replaces toastify.min.css */
        #custom-toast-container {
            position: fixed;
            z-index: 11000;
            width: 300px;
            padding: 10px;
            box-sizing: border-box;
            pointer-events: none;
        }
        .custom-toast {
            background-color: #333;
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            margin-bottom: 10px;
            opacity: 0;
            transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
            transform: translateY(10px);
            pointer-events: all;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .custom-toast.show {
            opacity: 1;
            transform: translateY(0);
        }
        #custom-toast-container[data-gravity="bottom"] {
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
        }
        #custom-toast-container[data-gravity="top"] {
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
        }
    `}));
    // END: Hardcoded Toast CSS
    
    // fetch is already wrapped for questionSpoof/videoSpoof/minuteFarm, no need to wrap again here.

    fetch("https://khanacademy.org/api/internal/graphql/getFullUserProfile", {
        referrer: "https://khanacademy.org/profile/me",
        body: '{"operationName":"getFullUserProfile","query":"query getFullUserProfile($kaid: String, $username: String) {\\n  user(kaid: $kaid, username: $username) {\\n    id\\n    nickname\\n    username\\n  }\\n}"}',
        method: "POST",
        mode: "cors",
        credentials: "include"
    }).then(async response => { 
        let data = await response.json();
        if(data && data.data && data.data.user){
            user = { nickname: data.data.user.nickname, username: data.data.user.username, UID: data.data.user.id.slice(-5) };
        }
    });

    sendToast("Injected successfully!");
    await delay(500)
    loadedPlugins.forEach(plugin => sendToast(`${plugin} Loaded!`, 2000, 'top'));
    hideSplashScreen();

    setupMenu();
    setupMain();
    console.clear();
})();
