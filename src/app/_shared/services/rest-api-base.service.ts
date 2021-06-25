import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { ServiceResponseBase } from './service-response-base';
// import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestApiServiceBase {
  private PEC_REMOTE_URL = "https://d21library.azurewebsites.net/";
  private PEC_LOCAL_URL = "http://192.168.1.6:5000/api/";
  private PEC_DEV_URL = "http://localhost:5000/";

  protected hostUrl: string;

  constructor(protected httpClient: HttpClient) {
    // if (!environment.production) {
     this.hostUrl = this.PEC_REMOTE_URL;
     
    // this.hostUrl = this.PEC_DEV_URL;
    // } else {
    //   this.httpClient.get<ServiceResponseBase<string[]>>(
    //     this.PEC_REMOTE_URL + "values"
    //   )
    //     .subscribe(
    //       _ => {
    //         this.hostUrl = this.PEC_REMOTE_URL;
    //       },
    //       _ => {
    //         this.hostUrl = this.PEC_LOCAL_URL;
    //       }
    //     );
    // }
  }
}
