// Слушаем клики на иконку расширения (включая шорткат)
chrome.action.onClicked.addListener((tab) => {
    // Отправляем сообщение в content script
    chrome.tabs.sendMessage(tab.id, { action: 'trigger-generate' }).catch(() => {
        // Игнорируем ошибки (например, если страница не поддерживается)
    });
});
