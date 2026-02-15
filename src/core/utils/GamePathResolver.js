export class GamePathResolver {

    static detectBase() {
        return new URL("../../../", import.meta.url);
    }

    static base = this.detectBase();

    static resolve(path) {
        return new URL(path, this.base).href;
    }

    static paths = {
        root: " ",
        game: " ",
        assets: "assets/",
        src: "src/",
        core: "src/core/",
        render: "src/render/",
        scenes: "src/scenes",
        styles: "src/styles/",
        ui: "src/ui/"
    };

    static from(type, file = "") {
        if (!this.paths[type]) {
            throw new Error(`Tipo inválido: ${type}`);
        }

        return this.resolve(this.paths[type] + file);
    }
}
