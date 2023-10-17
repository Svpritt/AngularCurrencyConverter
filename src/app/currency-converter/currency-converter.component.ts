import { Component } from '@angular/core';
import { CurrentCurrencyRateService } from '../services/current-currency-rate.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
mainSelectValue: string = 'UAH';
secondSelectValue: string = 'USD';
mainInputValue!: number;
secondInputValue!: number;
apiCurences: any[] = [];

  constructor(private currencyService: CurrentCurrencyRateService) {}

  ApiCurences: any[] = [];
  ngOnInit() {
    this.currencyService.getTopCurrencies().subscribe(data => {
      this.ApiCurences = data; 
    }); 
  }
  onMainCurrencyChange(selectedCurrency: string) {
    this.mainSelectValue = selectedCurrency;
    this.exchangeCalculateMain();
  }
  onSecondCurrencyChange(selectedCurrency: string) {
    this.secondSelectValue = selectedCurrency;
    this.exchangeCalculateSecond();
  }
  getCurrencyByCode(currencyCode: string): any {
    // оскільки це НБУ то він не міняє гривню на гривню то і курса такого нема. ставимо рейт 1 
    if (currencyCode === 'UAH') {
      return { rate: 1 };
    }
    // тут шукаємо в кожному обьекті массива код де С це обьект по котрому ми проходимося і дивимось його .cc (це з документаціі)
    const currency = this.ApiCurences.find((c) => c.cc === currencyCode);
    if (currency) {
      return currency;
    } else {
    alert('api undefind this currency'); //не знаю потрібно воно чи нє але якось обробити потрібно.
      return null;
    }
  }
  exchangeCalculateMain() {
    const mainCurrency = this.getCurrencyByCode(this.mainSelectValue);
    const secondCurrency = this.getCurrencyByCode(this.secondSelectValue);
    if (mainCurrency && secondCurrency) {
        // ми конвертуємо мейн селект в грвині а потім грвині в потрібну валюту в секонд селекті. 
        //Мейн валюта - це та якою торгує Данний банк країни. 
        this.secondInputValue = parseFloat((this.mainInputValue * mainCurrency.rate / secondCurrency.rate).toFixed(2));
    } else {
      console.log('Помилка, валюта не знайдена');
    }
  }
  exchangeCalculateSecond() {
    //тут ми робимо все навпаки.
    const mainCurrency = this.getCurrencyByCode(this.mainSelectValue);
    const secondCurrency = this.getCurrencyByCode(this.secondSelectValue);
    if (mainCurrency && secondCurrency) {
        this.mainInputValue = parseFloat((this.secondInputValue * secondCurrency.rate / mainCurrency.rate).toFixed(2));
    } else {
      console.log('Помилка, валюта не знайдена');
    }
  }
}
