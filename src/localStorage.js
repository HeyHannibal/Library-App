const storeJSON = (function () {
    const save = function () {
        localStorage.setItem("library.lib", JSON.stringify(library.lib));
    };
    const load = function () {
        if (localStorage.getItem("hasRunBefore") === null) {
            localStorage.setItem("hasRunBefore", "true");
            addBook("Heart Of Darkness", "Joseph Conrad", "128", false);
            addBook("Devil In the Wddddddddhite City", "Erik Larson", "447", true);
            addBook("Lord Of The Rings", "J.R.R Tolkien", "1178", true);
        } else {
            let myLib = JSON.parse(localStorage.getItem("library.lib"));
            myLib.forEach((item) => {
                const oldBook = new Book(
                    item.title,
                    item.author,
                    item.pages,
                    item.read
                );
                library.lib.push(oldBook);
                oldBook.createDOMBook();
                library.booKeep();
            });
        }
    };
    return {
        save,
        load,
    };
})();

export default storeJSON