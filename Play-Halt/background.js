chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.management.getSelf(function(info) {
    if (info.enabled) {
      chrome.management.setEnabled(false);
      chrome.browserAction.setIcon({ path: "images/icon-disabled.png" });
      chrome.browserAction.setTitle({ title: "Extension is disabled" });
    } 
    
    
    else {
      chrome.management.setEnabled(true);
      chrome.browserAction.setIcon({ path: "images/icon.png" });
      chrome.browserAction.setTitle({ title: "Extension is enabled" });
    }
  });









  chrome.tabs.query({}, (tabs) => {
    for (let tab of tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    }
  });

   chrome.windows.onFocusChanged.addListener((windowId) => {
      if (windowId === chrome.windows.WINDOW_ID_NONE) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
         if (tabs.length > 0) {
           chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: handleWindowFocusChange,
            args: [false]
          });
        }
      });

 } 
    else {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: handleWindowFocusChange,
            args: [true]
          });
     }
      });
    }
});





  function handleWindowFocusChange(isFocused) {
    const event = new Event(isFocused ? 'focus' : 'blur');
    window.dispatchEvent(event);
  }
});
