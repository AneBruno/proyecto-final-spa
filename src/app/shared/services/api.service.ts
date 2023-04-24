import { stringify         } from 'qs';
import { Injectable        } from '@angular/core';
import { HttpClient        } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { environment       } from 'src/environments/environment';
import { catchError, map   } from 'rxjs/operators';
import { Observable        } from 'rxjs/internal/Observable';
import { throwError        } from 'rxjs';
import { MessagesService   } from './messages.service';
import { Router            } from '@angular/router';
import { SnackBarService   } from './snack-bar.service';
import { QsSerializer      } from '../qs.serializer';

@Injectable()
export class ApiService {

    constructor(
        private http     : HttpClient,
        private messages : MessagesService,
        private snackBar : SnackBarService,
        private router   : Router,
    ) {
    }

    public login(xGooToken: string) {
        const options = this.observeResponse();
        return this.http.post(environment.apiUrl + '/auth:login', {}, {
            headers: { 'X-go-token': xGooToken }
        }).pipe(catchError((e: HttpErrorResponse)=> {
            this.messages.show(e.error.message);
            return throwError(e);
        }));
    }

    public logout() {
        const options = this.observeResponse();

        return this.http.post(environment.apiUrl + '/auth:logout', {}, options);
    }

    observeResponse(options?) {
        return {
            observe: 'response',
            ...options
        }
    }

    public get(uri: string, params: any = {}): Observable<any> {
        let url = environment.apiUrl + uri;
        let strParams = stringify(params);
        if (strParams) {
            url += '?' + strParams;
        }

        return this.handle(this.http.get(url, {
            observe: 'body',
        }));
    }

    public getData(uri: string, params: any = {}) {
        return this.get(uri, params).pipe(map((result:any)=>result.data));
    }

    public getAll(uri: string, params: any = {}): Observable<any> {
        params['limit'] = 0;
        return this.get(uri, params);
    }

    public getAllData(uri: string, params: any = {}): Observable<any> {
        params['limit'] = 0;
        return this.getData(uri, params);
    }

    public post(uri: string, body: any, options?: any) {
        return this.handle(
            this.http.post(
                environment.apiUrl + uri,
                this.getEncodedBody(body),
                options
            )
        );
    }

    public put(uri: string, body: any, options?: any) {
        return this.handle(
            this.http.put(
                environment.apiUrl + uri,
                this.getEncodedBody(body),
                options
            )
        );
    }

    public patch(uri: string, body:any, options?:any) {
      return this.handle(
        this.http.patch(
          environment.apiUrl + uri,
          this.getEncodedBody(body),
          options
        )
      )
    }

    public delete(uri: string, id: number) {
        return this.handle(this.http.delete(environment.apiUrl + uri + '/' + String(id)));
    }

    private getEncodedBody(data: any): any {
        return (new QsSerializer)
            .serialize(data)
            .filter(v => v.value instanceof File)
            .length > 0 ?
                this.getEncodedBodyWithFile(data) :
                data;
    }

    private getEncodedBodyWithFile(data: any): FormData {
        let body = new FormData();
        (new QsSerializer).serialize(data).forEach(item => {
            body.append(item.name, item.value);
        });

        return body;
    }

    private handle(o: Observable<any>): Observable<ArrayBuffer> {
        return o.pipe(catchError((e: HttpErrorResponse)=> {
            if (e.status === 422) {
                this.snackBar.show(e.error.message);
            }
            if (e.status === 401) {
                this.router.navigateByUrl('/login');
            }
            if (e.status === 403) {
                this.snackBar.show(e.error.message||e.error.error);
            }

            return throwError(e);
        }));
    }

}
