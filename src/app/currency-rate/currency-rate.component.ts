import { Component, OnInit } from '@angular/core';
import { CurrentCurrencyRateService } from '../services/current-currency-rate.service';

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.css']
})
export class CurrencyRateComponent implements OnInit {
  ApiCurences: any[] = [];
  usdCurrency: any;
  eurCurrency: any;

  constructor(private currencyService: CurrentCurrencyRateService){}

  ngOnInit(): void {
    this.currencyService.getTopCurrencies().subscribe(data => {
      this.ApiCurences = data;
      //тут така халепа, що поки ми витягуємо данні з сервісу а той з Беку. проходить час, і щоб не
      // винаходити лісопед - одразуж тут і пхаємо обьекти в змінні на випадок якщо з них ще щось треба дістати.
      this.usdCurrency = this.ApiCurences.find(currency => currency.cc === 'USD');
      this.eurCurrency = this.ApiCurences.find(currency => currency.cc === 'EUR');
    });
  }



}
