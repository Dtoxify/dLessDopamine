
(async () => {
    const trigger = document.querySelector('.trigger');
    /**
     * update state of trigger button
     */
    const updateDisplayState = (el, bool) => {
        if(!bool){
            el.classList.add('disabled');
        } else {
            el.classList.remove('disabled');
        }
        el.textContent = !bool ? 'turn ON' : 'turn OFF';
    };

    /**
     * Make sure default state of app is set (whether it is activated or not)
     */
    const activeState = await browser.storage.local.get('isActive').then(results => results.isActive);
    if (!activeState) {
        await browser.storage.local.set({
            isActive: false
        });
    }

    /**
     * update the visuals of trigger button
     */
    updateDisplayState(trigger, await browser.storage.local.get('isActive').then(results => results.isActive));
    
    // on / off functionality
    document.querySelector('.trigger').addEventListener("click",  async(e) => {
        // get current state
        const result = await browser.storage.local.get('isActive').then(results => results.isActive);
        // now set the opposite of current state
        await browser.storage.local.set({
            isActive: !result
        }).then(() => {
            // update html
            const target = e.target;
            updateDisplayState(target, !result);
            // reload tab
            browser.tabs.reload();
            // close browser extension window
            window.close();
        });
    });


})();

const maxPing = 5;
const waitBetweenPings = 100; //in milliseconds
const msgForChange = "changed"; // message for when there is a change in the url

/////////////////////////////////////
// Feed = lineForSorting.nextElementSibling;
// news feed = document.getElementsByClassName("feed-shared-news-module")[0]
/////////////////////////////////////

/**
 * The reason why getElementsByClassName("artdeco-dropdown")[1] isn't using a variable name
 * is because the variable will keep the reference of the variable. If you remove() on the variable,
 * you will remove the reference. If you were to click into LinkedIn messaging, and then click back
 * into the LinkedIn feed, the feed will reload back in and the blocker wouldn't work. I believe
 * LinkedIn is a single page application. 
 */

function removeFeed() {
  
  if (document.getElementsByClassName("artdeco-dropdown")[1]) {
    if (document.getElementsByClassName("artdeco-dropdown")[1].nextElementSibling) {
      document.getElementsByClassName("artdeco-dropdown")[1].nextElementSibling.remove();
    }
    document.getElementsByClassName("artdeco-dropdown")[1].remove();
  }
}

/**
 * For some odd reason, the news seem to load much slower than the feed. Therefore, multiple attempts
 * on removing the news is necessary. 
 */

async function attemptToRemoveNews() {

  let ping = 0;
  let removed = false;

  async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (document.getElementsByClassName("feed-shared-news-module")[0]) {
          document.getElementsByClassName("feed-shared-news-module")[0].remove();
          removed = true;
        }
        ping = ping + 1;
        resolve();
      }, ms);
    });
  }

  while (!removed && ping < maxPing) {
    await wait(waitBetweenPings);
  }
}

chrome.runtime.onMessage.addListener((result) => {
  if (result.message = msgForChange) {
      chrome.storage.local.get(['hideFeed', 'hideNews'], (res) => {
        if (res.hideFeed) removeFeed();
        if (res.hideNews) attemptToRemoveNews();
      });
  }
})

chrome.storage.local.get(['hideFeed', 'hideNews'], (res) => {
  if (res.hideFeed) removeFeed();
  if (res.hideNews) attemptToRemoveNews();
});

