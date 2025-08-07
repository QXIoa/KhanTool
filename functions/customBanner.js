const phrases = [ 
    "Sem nota? Sem chance.",
    "KhanTool no topo.",
    "KhanTool mandou um salve!",
    "Queria tanto ter o KhanTool.",
    "Ganhe tempo, use KhanTool!",
    "KhanTool tá voando!"
];
setInterval(() => { 
    const greeting = document.querySelector('.stp-animated-banner h2');
    if (greeting && features.customBanner) greeting.textContent = phrases[Math.floor(Math.random() * phrases.length)];
}, 3200);
