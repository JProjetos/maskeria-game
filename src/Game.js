import { EventBus } from "./core/utils/EventBus.js";
import { SceneManager } from "./core/utils/SceneManager.js";
import { Renderer } from "./render/Renderer.js";
import { MenuScene } from "./scenes/MenuScene.js";
import { GamePathResolver } from "./core/utils/GamePathResolver.js";

export class Game {
    constructor({ canvasSelector = "#canvas", uiRootSelector = "#ui" }) {
        this.canvas = document.querySelector(canvasSelector);
        this.$uiRoot = $(uiRootSelector);

        this.bus = new EventBus();
        this.sm = new SceneManager();
        this.renderer = new Renderer(canvas);

        this.firstScene = new MenuScene({
            bus: this.bus,
            renderer: this.renderer,
            $uiRoot: this.$uiRoot
        })

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
            this.firstScene
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

        return fetch(GamePathResolver.from("root", "VERSION"))
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
