// Кэш для кнопки (ищем только при необходимости)
let cachedButton = null;

/**
 * Ищет кнопку "Сгенерировать" в DOM
 */
function findGenerateButton() {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(button => button.textContent.trim() === 'Сгенерировать');
}

/**
 * Получает кнопку (из кэша или ищет заново)
 */
function getGenerateButton() {
    // Проверяем, есть ли кнопка в кэше и все еще в DOM
    if (cachedButton && document.contains(cachedButton)) {
        return cachedButton;
    }

    // Ищем кнопку заново и сохраняем в кэш
    cachedButton = findGenerateButton();
    return cachedButton;
}

/**
 * Нажимает кнопку "Сгенерировать"
 */
function clickGenerateButton() {
    const button = getGenerateButton();

    if (button) {
        button.click();
        return true;
    }

    return false;
}

// Слушаем сообщения от background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'trigger-generate') {
        const success = clickGenerateButton();
        sendResponse({ success });
    }
    return true;
});
