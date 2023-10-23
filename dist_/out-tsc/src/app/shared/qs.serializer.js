export class QsSerializer {
    constructor() {
        this.params = [];
    }
    serialize(obj, prevKey = '') {
        for (let key in obj) {
            let value = obj[key];
            if ((Array.isArray(value) || this.isObject(value)) && !(value instanceof File)) {
                this.serialize(value, prevKey + this.enclose(key, prevKey));
            }
            else {
                this.params.push({
                    name: prevKey + this.enclose(key, prevKey),
                    value: (value === null) ? '' : value,
                });
            }
        }
        return this.params;
    }
    isObject(value) {
        let result = value !== null && typeof value === 'object';
        return result;
    }
    enclose(value, prevKey = '') {
        if (!prevKey.length) {
            return value;
        }
        return `[${value}]`;
    }
}
//# sourceMappingURL=qs.serializer.js.map