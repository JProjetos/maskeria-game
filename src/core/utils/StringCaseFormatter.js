export class StringCaseFormatter {
    static toKebabCase(str) {
        return str
            .replace(/([a-z0-9])([A-Z])/g, "$1-$2")    // Junta números e mínusculas com maiúsculas através do hífen
            .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2") // Junta maiúsculas com maiúsculas e minúsculas através do hífen
            .replace(/[\s_]+/g, "-")                   // Junta caracteres de escape através do hífen
            .toLowerCase();
    }

    static toSnakeCase(str) {
        return str
            .replace(/([a-z0-9])([A-Z])/g, "$1_$2")    // Junta números e mínusculas com maiúsculas através do underscore
            .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2") // Junta maiúsculas com maiúsculas e minúsculas através do underscore
            .replace(/[\s_]+/g, "_")                   // Junta caracteres de escape através do underscore
            .toLowerCase();
    }

    static toCamelCase(str) {
        return str
            .toLowerCase()                                      // Transforma tudo em minúsucla
            .replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase()); // Transforma a letra após - _ ou espaço em maiúscula
    }

    static toPascalCase(str) {
        const camel = str
            .toLowerCase()                                      // Transforma tudo em minúsucla
            .replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase()); // Transforma a letra após - _ ou espaço em maiúscula
        return camel.charAt(0).toUpperCase() + camel.slice(1);  // Transforma a primeira letra em maiúscula
    }

    static toScreamingCase(str) {
        return this.toSnakeCase(str).toUpperCase();
    }
}