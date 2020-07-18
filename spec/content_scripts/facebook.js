(async () => {
    /**
     * Check if it is allowed to run
     */
    const isActive = await browser.storage.local.get('isActive').then(results => results.isActive);
    if (window.hasRun || isActive !== true) {
        return;
    }
    window.hasRun = true;

    /**
     * block facebook related stuff
     */
    const blockFacebookFeed = () => {
        const triggerRemoval = () => {
            const main = document.querySelector('[role="main"]');
            const stories = document.querySelector('[data-pagelet="Stories"]');
            if (main) {
                main.childNodes.forEach(el => {
                    el.remove();
                });
                main.style.display = 'none';
            }
            if (stories) stories.remove();
        };
        triggerRemoval();
        // seems facebook has some delay for loading sometimes, and the html is not manipulated.. 
        // we dont want set interval for ever ... TODO
        //setInterval(() => {
        //    triggerRemoval();
        //}, 4000);
    };

    blockFacebookFeed();
})();