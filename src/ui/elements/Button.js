export class Button {
    constructor({ text, className, onClick }) {
        this.text = text;
        this.className = className;
        this.onClick = onClick;

        this.$el = $("<button>", {
            text: text,
            class: className
        }).on("click", onClick);
    }

    mount($parent) {
        if (!$parent) throw new Error("Um container jQuery precisa ser fornecido");
        $parent.append(this.$el);
    }

    unmount() {
        this.$el.off("click");
        this.$el.remove();
    }
}