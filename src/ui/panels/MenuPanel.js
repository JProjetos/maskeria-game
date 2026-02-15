import { GamePathResolver } from "../../core/utils/GamePathResolver.js";
import { Game } from "../../Game.js";
import { Button } from "../elements/Button.js";
import { Panel } from "./Panel.js";

export class MenuPanel extends Panel {
    constructor(ctx) {
        super(ctx);
    }

    mount() {
        this.$root.addClass(this.namespace);

        let $menu = $("<div>", {
            class: "menu"
        });

        let $optionsWrapper = $("<div>", {
            class: "options-wrapper"
        });

        let $logo = $("<img>", {
            class: "logo",
            src: GamePathResolver.from("assets", "logo/dark-border.svg")
        })

        let $options = $("<div>", {
            class: "options"
        });

        let buttonInfo = [
            {
                text: "Singleplayer",
                class: "singleplayer",
                onClick: () => {
                    this.bus.emit(`${this.namespace}:singleplayer`)
                }
            },
            {
                text: "Multiplayer",
                class: "multiplayer",
                onClick: () => {
                    this.bus.emit(`${this.namespace}:multiplayer`)
                }
            },
            {
                text: "Options",
                class: "options",
                onClick: () => {
                    this.bus.emit(`${this.namespace}:options`)
                }
            }
        ]

        buttonInfo.forEach(info => {
            new Button(info).mount($options);
        })

        let $aditionalInfo = $("<div>", {
            class: "additional-info"
        })

        $aditionalInfo.append(`
            <p class="versions">
                <span>${Game.version}</span>
            </p>
            <p>
                © 2026 JProjetos
            </p>
        `)
        
        $optionsWrapper.append($logo);
        $optionsWrapper.append($options);

        $menu.append($optionsWrapper);
        $menu.append($aditionalInfo);

        this.$root.append($menu);
    }   
    
    unmount() {
        this.$root.off(this.namespace);
    }
}