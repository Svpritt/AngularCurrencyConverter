import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CurrencyRateComponent } from './currency-rate/currency-rate.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CurrentCurrencyRateService } from './services/current-currency-rate.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyRateComponent,
    CurrencyConverterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CurrentCurrencyRateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
