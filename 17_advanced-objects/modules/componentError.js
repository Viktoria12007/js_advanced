export default class ComponentError extends Error {
    constructor() {
        super('Такого элемента не существует!');
        this.name = "ComponentError";
    }
}