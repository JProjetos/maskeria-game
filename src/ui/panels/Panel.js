import { StringCaseFormatter } from "../../core/utils/StringCaseFormatter.js";

export class Panel {
    constructor({ bus, $root, namespace }) {
        this.bus = bus;
        this.$root = $root;
        this.namespace = namespace 
            ?? StringCaseFormatter.toKebabCase(new.target.name);
    }

    mount() {}
    unmount() {}
}