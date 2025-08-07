plppdo.on('domChanged', () => {
    try {
        const khanLogo = document.querySelector('svg._1rt6g9t path:nth-last-of-type(2)');
        if(features.rgbLogo && khanLogo) {
            if(!document.querySelector('style.RGBLogo')) {
                const styleElement = document.createElement('style');
                styleElement.className = "RGBLogo";
                styleElement.textContent = `
                @keyframes colorShift { 
                    0% { fill: #2196f3; } 
                    25% { fill: #e91e63; } 
                    50% { fill: #ffd600; }
                    75% { fill: #7ad878; }
                    100% { fill: #2196f3; }
                }`;
                document.head.appendChild(styleElement);
            }
            if(khanLogo.getAttribute('data-darkreader-inline-fill')!=null) khanLogo.removeAttribute('data-darkreader-inline-fill');
            khanLogo.style.animation = 'colorShift 3.8s linear infinite';
        } else if(khanLogo) {
            khanLogo.style.animation = '';
        }
    } catch (e) { debug(`Erro @ rgbLogo.js\n${e}`); }
});
