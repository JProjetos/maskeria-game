import { EventBus } from "./core/utils/EventBus.js";
import { SceneManager } from "./core/utils/SceneManager.js";
import { Renderer } from "./core/render/Renderer.js";
import { MenuScene } from "./scenes/MenuScene.js";
import { PathResolver } from "./core/utils/PathResolver.js";

export class Game {
    constructor() {
        this.bus = new EventBus();

        this.sm = new SceneManager();

        let canvas = document.querySelector("#canvas");
        this.renderer = new Renderer(canvas);

        this.$uiRoot = $("#ui");

        this.lastTime = 0;
        this.loop = this.loop.bind(this);
    }

    static version = null;

    async start() {
        await this.boot();
        requestAnimationFrame(this.loop);
    }

    async boot() {
        await Game.getVersion();

        this.bus.on("scene:change", scene => {
            this.sm.change(scene);
        });

        this.renderer.resize(this.$uiRoot.width(), this.$uiRoot.height());
        $(window).on("resize", () => {
            this.renderer.resize(this.$uiRoot.width(), this.$uiRoot.height());
        })

        this.sm.change(
            new MenuScene({
                bus: this.bus,
                renderer: this.renderer,
                $uiRoot: this.$uiRoot
            })
        )
        this.sm.applyChange();
    }

    loop(time) {
        const dt = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.update(dt);
        this.render();

        requestAnimationFrame(this.loop);
    }

    update(dt) {
        this.sm.update(dt);
    }

    render() {
        this.sm.render(this.renderer)
    }

    static async getVersion() {
        if (Game.version !== null) {
            return Promise.resolve(Game.version);
        }

        return fetch(PathResolver.from("game", "VERSION"))
            .then(res => {
                if (!res.ok) throw new Error("Falha ao buscar versão local");
                return res.text();
            })
            .then(text => {
                Game.version = text;
                return text;
            });
    }
}
