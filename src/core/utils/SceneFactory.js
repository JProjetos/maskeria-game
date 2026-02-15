import { StringCaseFormatter } from "./StringCaseFormatter.js";

export class SceneFactory {
    static async createScene(name, env, options) {
        const className = StringCaseFormatter.toPascalCase(name);
        const path = `../../scenes/${className}.js`;

        try {
            const module = await import(path);
            const SceneClass = module[className];
            if (!SceneClass) throw new Error(`Scene "${className}" não encontrada no módulo`);

            return new SceneClass(env, options);
        } catch (err) {
            throw new Error(`SceneFactory: falha ao criar a cena "${name}"\n${err}`);
        }
    }
}
