import { __decorate } from "tslib";
import { stringify } from 'qs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { QsSerializer } from '../qs.serializer';
let ApiService = class ApiService {
    constructor(http, messages, snackBar, router) {
        this.http = http;
        this.messages = messages;
        this.snackBar = snackBar;
        this.router = router;
    }
    login(xGooToken) {
        const options = this.observeResponse();
        return this.http.post(environment.apiUrl + '/auth:login', {}, {
            headers: { 'X-go-token': xGooToken }
        }).pipe(catchError((e) => {
            this.messages.show(e.error.message);
            return throwError(e);
        }));
    }
    logout() {
        const options = this.observeResponse();
        return this.http.post(environment.apiUrl + '/auth:logout', {}, options);
    }
    observeResponse(options) {
        return Object.assign({ observe: 'response' }, options);
    }
    get(uri, params = {}) {
        let url = environment.apiUrl + uri;
        let strParams = stringify(params);
        if (strParams) {
            url += '?' + strParams;
        }
        return this.handle(this.http.get(url, {
            observe: 'body',
        }));
    }
    getData(uri, params = {}) {
        return this.get(uri, params).pipe(map((result) => result.data));
    }
    getAll(uri, params = {}) {
        params['limit'] = 0;
        return this.get(uri, params);
    }
    getAllData(uri, params = {}) {
        params['limit'] = 0;
        return this.getData(uri, params);
    }
    post(uri, body, options) {
        return this.handle(this.http.post(environment.apiUrl + uri, this.getEncodedBody(body), options));
    }
    put(uri, body, options) {
        return this.handle(this.http.put(environment.apiUrl + uri, this.getEncodedBody(body), options));
    }
    patch(uri, body, options) {
        return this.handle(this.http.patch(environment.apiUrl + uri, this.getEncodedBody(body), options));
    }
    delete(uri, id) {
        return this.handle(this.http.delete(environment.apiUrl + uri + '/' + String(id)));
    }
    getEncodedBody(data) {
        return (new QsSerializer)
            .serialize(data)
            .filter(v => v.value instanceof File)
            .length > 0 ?
            this.getEncodedBodyWithFile(data) :
            data;
    }
    getEncodedBodyWithFile(data) {
        let body = new FormData();
        (new QsSerializer).serialize(data).forEach(item => {
            body.append(item.name, item.value);
        });
        return body;
    }
    handle(o) {
        return o.pipe(catchError((e) => {
            if (e.status === 422) {
                this.snackBar.show(e.error.message);
            }
            if (e.status === 401) {
                this.router.navigateByUrl('/login');
            }
            if (e.status === 403) {
                this.snackBar.show(e.error.message || e.error.error);
            }
            return throwError(e);
        }));
    }
};
ApiService = __decorate([
    Injectable()
], ApiService);
export { ApiService };
//# sourceMappingURL=api.service.js.map