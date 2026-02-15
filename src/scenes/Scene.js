import { Panel } from "../ui/panels/Panel.js";

export class Scene {
    constructor({ game, bus, renderer, panels = [], $uiRoot}, options) {
        this.game = game;
        this.bus = bus;
        this.renderer = renderer;
        this.panels = panels;
        this.$uiRoot = $uiRoot;
        this.options = options;
    }

    enter() {}
    exit() {}
    update(dt) {}
    render() {}

    addPanel(panel) {
        if (!(panel instanceof Panel))
            return;

        panel.mount();
        this.panels.push(panel);
    }
}