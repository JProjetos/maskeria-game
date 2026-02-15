export class StringCaseFormatter {
    static toKebabCase(str) {
        return str
            .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
            .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
            .replace(/[\s_]+/g, "-")
            .toLowerCase();
    }

    static toSnakeCase(str) {
        return this.toKebabCase(str).replace(/-/g, "_");
    }

    static toCamelCase(str) {
        return this.toKebabCase(str)
            .replace(/-./g, match => match[1].toUpperCase());
    }

    static toPascalCase(str) {
        const camel = this.toCamelCase(str);
        return camel.charAt(0).toUpperCase() + camel.slice(1);
    }

    static toScreamingCase(str) {
        return this.toSnakeCase(str).toUpperCase();
    }
}