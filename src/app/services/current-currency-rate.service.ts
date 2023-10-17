import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurrentCurrencyRateService {
  private apiUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  constructor(private http: HttpClient) { }

  getTopCurrencies(): Observable<any[]> {
    //що тут, робимо запит, отримуємо дату, фільтруємо, знаходимо ті валюти що нам треба. Доречі щоб додати нові валюти треба буде додати іх назви
    // і якщо вони будуть в НБУ вони будуть в отриманому массиві можна також по коду валюти якщо треба.
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.filter(currency => ['EUR', 'USD', 'PLN', 'TRY', 'AED'].includes(currency.cc)))
    );
  }
}

