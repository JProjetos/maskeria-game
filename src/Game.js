import { EventBus } from "./core/utils/EventBus.js";
import { SceneManager } from "./core/utils/SceneManager.js";
import { Renderer } from "./render/Renderer.js";
import { GamePathResolver } from "./core/utils/GamePathResolver.js";
import { SceneFactory } from "./core/utils/SceneFactory.js";

export class Game {
    constructor({ canvasSelector = "#canvas", uiRootSelector = "#ui" }) {
        this.canvas = document.querySelector(canvasSelector);
        this.$uiRoot = $(uiRootSelector);

        this.bus = new EventBus();
        this.sm = new SceneManager();
        this.renderer = new Renderer(this.canvas);

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

        this.bus.on("scene:set-next", (scene) => {
            this.sm.setNext(scene);
        });

        this.bus.on("scene:change", () => {
            this.sm.change();
        });

        this.bus.on("scene:start", async ({ scene, options = {} }) => {

            const nextScene = await SceneFactory.createScene(
                scene,
                {
                    game: this,
                    bus: this.bus,
                    renderer: this.renderer,
                    panels: [],
                    $uiRoot: this.$uiRoot
                },
                options
            );

            this.bus.emit("scene:set-next", nextScene);
            this.bus.emit("scene:change");
        });

        this.bus.on("window:resize", () => {
            let resizeTimeout;

            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.renderer.resize(this.$uiRoot.width(), this.$uiRoot.height());
            }, 100);
        })

        this.bus.emit("window:resize");
        $(window).on("resize", () => {
            this.bus.emit("window:resize");
        })

        this.bus.emit("scene:start", { scene: "MenuScene" });
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

    static getVersion() {
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
