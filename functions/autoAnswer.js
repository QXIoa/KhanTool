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

if (features.autoAnswer) {
    khanwareDominates = true;
    
    (async () => {
        while (khanwareDominates) {
            if (isProcessing) {
                await delay(500);
                continue;
            }
            
            const currentTime = Date.now();
            if (currentTime - lastActionTime < 600) {
                await delay(200);
                continue;
            }
            
            let actionTaken = false;
            
            const correctChoice = document.querySelector(`[data-testid="choice-icon__library-choice-icon"]`);
            const checkButton = document.querySelector(`[data-testid="exercise-check-answer"]`);
            const nextButton = document.querySelector(`[data-testid="exercise-next-question"]`);
            
            if (correctChoice && !answerSelected && correctChoice.offsetParent !== null) {
                correctChoice.click();
                answerSelected = true;
                actionTaken = true;
                lastActionTime = currentTime;
            }
            else if (checkButton && answerSelected && checkButton.offsetParent !== null) {
                checkButton.click();
                answerSelected = false;
                actionTaken = true;
                lastActionTime = currentTime;
            }
            else if (nextButton && nextButton.offsetParent !== null) {
                const buttonText = nextButton.textContent || nextButton.innerText || "";
                
                if (buttonText.includes("Mostrar resumo") || buttonText.includes("Ver resumo")) {
                    if (!toastCooldown) {
                        toastCooldown = true;
                        isProcessing = true;
                        
                        if (typeof sendToast === 'function') {
                            sendToast("🎉 Exercício concluído!", 2000);
                        }
                        
                        if (typeof playAudio === 'function') {
                            playAudio("https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav");
                        }
                        
                        setTimeout(() => {
                            nextButton.click();
                            setTimeout(() => {
                                isProcessing = false;
                                toastCooldown = false;
                                answerSelected = false;
                            }, 3000);
                        }, 1500);
                    }
                } else {
                    nextButton.click();
                    answerSelected = false;
                    actionTaken = true;
                    lastActionTime = currentTime;
                }
            }
            
            const otherSelectors = [`._1udzurba`, `._awve9b`];
            if (!actionTaken) {
                for (const selector of otherSelectors) {
                    const element = document.querySelector(selector);
                    if (element && element.offsetParent !== null) {
                        element.click();
                        actionTaken = true;
                        lastActionTime = currentTime;
                        break;
                    }
                }
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
            
            await delay(actionTaken ? 800 : 400);
        }
    })();
}
