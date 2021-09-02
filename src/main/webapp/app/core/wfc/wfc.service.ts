import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PrintCheques {
  salida: string;
  comando: string;
}

const WCF_URL = `http://localhost:8735/`;

@Injectable({ providedIn: 'root' })
export class WcfService {
  constructor(private http: HttpClient) {}

  getTerminalService(): Observable<any> {
    const url = `${WCF_URL}Service/GetTerminal`;
    return this.http.jsonp(url, 'callback');
  }

  getPrinterService(): Observable<any> {
    const url = `${WCF_URL}Service/GetImpresoras`;
    return this.http.jsonp(url, 'callback');
  }

  imprimirCheques(data: PrintCheques[], impresora: string): Observable<any> {
    const dataTrasfrom = JSON.stringify(data);
    const url = `${WCF_URL}Service/ImprimirRAW?datoJson=${dataTrasfrom}&impresora=${impresora}`;
    return this.http.jsonp(url, 'callback');
  }

  /*  getImprimirDemo(dato:string, impresora: string): Observable<any> {
         console.log(impresora);
         
         let url= `${WCF_URL}Service/ImprimirDemo?dato=${dato}&impresora=${impresora}`;
         
         this.http.jsonp(url, 'callback')
         .pipe(
             catchError( this.handleError('WCFImprimirDemoService'))
         )
         .subscribe(res => {
             if (res) {
                 console.log(res);
             } else {
                 console.log('Apagado el servicio WCF');
             }
         });
 
     }  */

  /* servicioExtrano() {
        try {
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: "http://localhost:8732/Service/TerminalJS",
               // data: "{}",
                dataType: "json",
                success: function (data) {
    
                    console.log(data);
                    
                  //  document.getElementById('lblTerminal').innerText = data;
                },
                error: function (err) {
                    alert('Error: ' + err.responseText);
                }
            });
        }
        catch (e) {
            alert(e);
        }
    }   */
}
