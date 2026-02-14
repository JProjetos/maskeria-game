import { StringCaseFormatter } from "../../core/utils/StringCaseFormatter.js";

export class Panel {
    constructor({ bus, namespace, $root }) {
        this.bus = bus;
        this.namespace = namespace 
            ?? StringCaseFormatter.toKebabCase(new.target.name);
        this.$root = $root;
    }

    mount() {}
    unmount() {}
}