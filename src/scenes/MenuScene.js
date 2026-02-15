import { Scene } from "./Scene.js";
import { MenuPanel } from "../ui/panels/MenuPanel.js";
import { GameAssetResolver } from "../core/utils/GameAssetResolver.js";
import { CSSFileLoader } from "../core/utils/CSSFileLoader.js";
import { GamePathResolver } from "../core/utils/GamePathResolver.js";
import { StringCaseFormatter } from "../core/utils/StringCaseFormatter.js";

export class MenuScene extends Scene {
    constructor(env, options) {
        super(env, options);
    }

    enter() {
        this.menuPanel = new MenuPanel({ 
            bus: this.bus, 
            $root: this.$uiRoot 
        });

        this.addPanel(this.menuPanel);

        this.handleSingleplayer = () => {
            this.bus.emit("scene:start", {
                scene: "gameplay-scene",
                mode: "singleplayer"
            });
        };

        this.handleMultiplayer = () => {
            this.bus.emit("scene:start", {
                scene: "gameplay-scene",
                mode: "multiplayer"
            });
        };

        this.bus.on(`${this.menuPanel.namespace}:singleplayer`, this.handleSingleplayer);
        this.bus.on(`${this.menuPanel.namespace}:multiplayer`, this.handleMultiplayer);

        CSSFileLoader.load(
            GamePathResolver.from(
                "styles",
                `${StringCaseFormatter.toKebabCase(this.constructor.name)}.css`
            )
        );
    }

    exit() {
        this.bus.off(`${this.menuPanel.namespace}:singleplayer`, this.handleSingleplayer);
        this.bus.off(`${this.menuPanel.namespace}:multiplayer`, this.handleMultiplayer);

        this.renderer.clear();

        this.panels.forEach(panel => panel.unmount());
        this.panels = [];
    }

    render(renderer) {
        renderer.drawBGCover(
            GameAssetResolver.loadImage("assets", "menu/background.jpg")
        );
    }
}
