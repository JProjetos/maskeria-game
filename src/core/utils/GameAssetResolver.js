import { GamePathResolver } from "./GamePathResolver.js";

export class GameAssetResolver {

    static cache = new Map();

    static loadImage(type, file) {
        const key = `${type}:${file}`;

        if (this.cache.has(key))
            return this.cache.get(key);

        const img = new Image();
        img.src = GamePathResolver.from(type, file);

        this.cache.set(key, img);
        return img;
    }

    static async preloadImage(type, file) {
        const key = `${type}:${file}`;

        if (this.cache.has(key))
            return this.cache.get(key);

        const img = new Image();
        img.src = GamePathResolver.from(type, file);

        await new Promise((res, rej) => {
            img.onload = res;
            img.onerror = rej;
        });

        this.cache.set(key, img);
        return img;
    }

    static loadAudio(type, file) {
        const key = `${type}:${file}`;

        if (this.cache.has(key))
            return this.cache.get(key);

        const audio = new Audio(GamePathResolver.from(type, file));
        this.cache.set(key, audio);
        return audio;
    }

    static get(type, file) {
        return this.cache.get(`${type}:${file}`);
    }
}
