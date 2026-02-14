import { Scene } from "./Scene.js";
import { Panel } from "../ui/panels/Panel.js";
import { MenuPanel } from "../ui/panels/MenuPanel.js";
import { AssetResolver } from "../core/utils/AssetResolver.js";
import { CSSFileLoader } from "../core/utils/CSSFileLoader.js";
import { PathResolver } from "../core/utils/PathResolver.js";
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

        CSSFileLoader.load(PathResolver.from("styles", `${StringCaseFormatter.toKebabCase(this.constructor.name)}.css`));
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
            AssetResolver.loadImage("assets", "menu/background.jpg")
        )
    }
} 