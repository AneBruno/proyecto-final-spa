export class User {
    nombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }
    isAdministrador() {
        return this.rol.id === 1;
    }
}
//# sourceMappingURL=user.model.js.map