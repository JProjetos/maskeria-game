export class AssetResolver {

    static base = new URL("/", window.location.origin);

    static setBase(root) {
        if (!root.endsWith("/")) root += "/";
        this.base = new URL(root, window.location.origin);
    }

    static resolve(path) {
        return new URL(path, this.base).href;
    }

    static paths = {
        components: "components/",
        assets: "game/assets/",
        rootStyles: "styles/", // pasta de estilos das páginas do root
        styles: "game/src/styles/", // pasta de estilos do jogo
        core: "game/src/core",
        public: "public/"
    };

    static from(type, file) {
        if (!this.paths[type]) throw new Error(`Tipo inválido: ${type}`);
        return this.resolve(this.paths[type] + file);
    }

}
