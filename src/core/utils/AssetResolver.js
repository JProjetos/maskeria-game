import { PathResolver } from "./PathResolver.js";

export class AssetResolver {

    static cache = new Map();

    static loadImage(type, file) {
        const key = `${type}:${file}`;

        if (this.cache.has(key))
            return this.cache.get(key);

        const img = new Image();
        img.src = PathResolver.from(type, file);

        this.cache.set(key, img);
        return img;
    }

    static async preloadImage(type, file) {
        const key = `${type}:${file}`;

        if (this.cache.has(key))
            return this.cache.get(key);

        const img = new Image();
        img.src = PathResolver.from(type, file);

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

        const audio = new Audio(PathResolver.from(type, file));
        this.cache.set(key, audio);
        return audio;
    }

    static get(type, file) {
        return this.cache.get(`${type}:${file}`);
    }
}
