export const waitForElements = (selector) => {
    return new Promise((resolve) => {
    
        const observer = new MutationObserver(() => {
            if (document.querySelectorAll(selector).length > 0) {
                observer.disconnect();
                resolve(document.querySelectorAll(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
};  

export const mockFetchImplementation = (data) => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ pokemon: data }),
        })
      );
}

export const waitForElement = (selector) => {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
};  