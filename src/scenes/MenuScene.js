import { Scene } from "./Scene.js";
import { Panel } from "../ui/panels/Panel.js";
import { MenuPanel } from "../ui/panels/MenuPanel.js";
import { GameAssetResolver } from "../core/utils/GameAssetResolver.js";
import { CSSFileLoader } from "../core/utils/CSSFileLoader.js";
import { GamePathResolver } from "../core/utils/GamePathResolver.js";
import { StringCaseFormatter } from "../core/utils/StringCaseFormatter.js";

export class MenuScene extends Scene {
    constructor({bus, renderer, panels = [], $uiRoot}) {
        super({bus, renderer, panels, $uiRoot});
    }

    enter() {
        this.addPanel(
            new MenuPanel({
                bus: this.bus,
                $root: this.$uiRoot
            })
        )

        CSSFileLoader.load(GamePathResolver.from("styles", `${StringCaseFormatter.toKebabCase(this.constructor.name)}.css`));
    }

    addPanel(panel) {
        if(!(panel instanceof Panel))
            return;

        panel.mount();
        this.panels.push(panel);
    }

    exit() {
        this.panels.forEach(panel => panel.unmount());
        this.panels = [];
    }

    update(dt) {}

    render(renderer) {
        renderer.drawBackground(
            GameAssetResolver.loadImage("assets", "menu/background.jpg")
        )
    }
} 