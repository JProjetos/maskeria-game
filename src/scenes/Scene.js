export class Scene {
    constructor({bus, ctx, panels = [], $uiRoot}) {
        this.bus = bus;
        this.ctx = canvas;
        this.panels = panels;
        this.$uiRoot = $uiRoot;
    }

    enter() {}
    exit() {}
    createPanels() {}
    update(dt) {}
    render() {}
}