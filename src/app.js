import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class App {
  constructor(httpClient) {
    this.loading = true;
    this.httpClient = httpClient;
    this.quotes = {};
    this.httpClient.createRequest('https://talaikis.com/api/quotes/')
      .asGet()
      .send()
      .then(data => {
        this.quotes = JSON.parse(data.response);
        this.getQuote();
        this.loading = false;
      });
  }

  heading = 'RQG';

  getQuote() {
    if (this.quotes.length > 0) {
      //quotes api delivers 100 quotes, this will select a random index between 0 and 99
      let quoteIndex = Math.floor(Math.random() * (99 - 0 + 1)) + 0;
      this.quote = this.quotes[quoteIndex].quote;
      this.author = this.quotes[quoteIndex].author;
    }
  }
}
