import { Scene } from "../../scenes/Scene.js";

export class SceneManager {
    constructor() {
        this.current = null;
        this.next = null;
    }

    change(scene) {
        if(!(scene instanceof Scene))
            return;

        this.next = scene;
    }

    applyChange() {
        if(!this.next) return;

        this.current?.exit();
        this.current = this.next;

        this.next = null;
        this.current?.enter();
    }

    update(dt) {
        this.current?.update(dt);
    }

    render(renderer) {
        this.current?.render(renderer);
    }
}
