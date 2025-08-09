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

if (features.autoAnswer) {
    khanwareDominates = true;
    
    (async () => {
        while (khanwareDominates) {
            if (isProcessing) {
                await delay(500);
                continue;
            }
            
            const currentTime = Date.now();
            if (currentTime - lastActionTime < 800) {
                await delay(200);
                continue;
            }
            
            let actionTaken = false;
            const selectorsToCheck = [...baseSelectors];
            
            for (const selector of selectorsToCheck) {
                const element = document.querySelector(selector);
                if (element && element.offsetParent !== null) {
                    
                    if (selector === `[data-testid="choice-icon__library-choice-icon"]`) {
                        const correctChoice = document.querySelector(`[data-testid="choice-icon__library-choice-icon"][aria-label*="correta"]`) || 
                                            document.querySelector(`[data-testid="choice-icon__library-choice-icon"]:first-of-type`);
                        if (correctChoice) {
                            correctChoice.click();
                            actionTaken = true;
                            lastActionTime = currentTime;
                            break;
                        }
                    }
                    
                    else if (selector === `[data-testid="exercise-check-answer"]`) {
                        element.click();
                        actionTaken = true;
                        lastActionTime = currentTime;
                        break;
                    }
                    
                    else if (selector === `[data-testid="exercise-next-question"]`) {
                        element.click();
                        actionTaken = true;
                        lastActionTime = currentTime;
                        break;
                    }
                    
                    else {
                        element.click();
                        actionTaken = true;
                        lastActionTime = currentTime;
                        break;
                    }
                }
            }
            
            const summaryButton = document.querySelector(`[data-testid="exercise-next-question"]`);
            const summaryText = summaryButton?.textContent || summaryButton?.innerText || "";
            
            if ((summaryText.includes("Mostrar resumo") || summaryText.includes("Ver resumo")) && !toastCooldown) {
                toastCooldown = true;
                isProcessing = true;
                
                if (typeof sendToast === 'function') {
                    sendToast("🎉 Exercício concluído!", 2000);
                }
                
                if (typeof playAudio === 'function') {
                    playAudio("https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav");
                }
                
                setTimeout(() => {
                    summaryButton?.click();
                    setTimeout(() => {
                        isProcessing = false;
                        toastCooldown = false;
                    }, 3000);
                }, 1500);
            }
            
            const completionIndicators = [
                `[data-testid="exercise-complete"]`,
                `.exercise-complete`,
                `[aria-label*="completo"]`,
                `[aria-label*="concluído"]`
            ];
            
            for (const indicator of completionIndicators) {
                if (document.querySelector(indicator)) {
                    if (!toastCooldown) {
                        toastCooldown = true;
                        if (typeof sendToast === 'function') {
                            sendToast("✅ Atividade finalizada!", 2000);
                        }
                        setTimeout(() => { toastCooldown = false; }, 5000);
                    }
                    break;
                }
            }
            
            await delay(actionTaken ? 600 : 300);
        }
    })();
}
