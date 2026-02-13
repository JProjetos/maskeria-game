export class CSSFileLoader {
    static loaded = new Set();

    static load(href) {
        if (this.loaded.has(href))
            return Promise.resolve();

        return new Promise((resolve, reject) => {
            $("<link>", {
                rel: "stylesheet",
                href
            }).on("load", () => {
                this.loaded.add(href);
                resolve();
            }).each(function () {
                if (this.sheet)
                    resolve();
            }).on("error", reject).appendTo("head");
        })
    }
}