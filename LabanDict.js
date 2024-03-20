class encn_Laban {
    constructor() {
        // Your code starting here ...
    }

    findTerm(word) {
        return new Promise((resolve, reject) => {
            // Form the online dictionary query URL
            const baseUrl = 'https://dict.laban.vn/find?type=1&query=';
            const url = baseUrl + encodeURIComponent(word);

            // Perform online query and get the web page content
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    // Use Element/CSS selector to get the definition part
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');
                    const definitionNodes = doc.querySelectorAll('.bg-grey.bold.font-large.m-top20');

                    // Extract definitions from the retrieved content
                    const definitions = [];
                    definitionNodes.forEach(node => {
                        const partOfSpeech = node.innerText.trim();
                        const definition = node.nextElementSibling.innerText.trim();
                        definitions.push({ partOfSpeech, definition });
                    });

                    // Resolve the promise with the extracted definitions
                    resolve(definitions);
                })
                .catch(error => {
                    // Reject the promise if there's an error
                    reject(error);
                });
        });
    }
}
