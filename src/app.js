import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class App {
  quote;
  quotes;
  social = [
    {
      url: 'https://www.linkedin.com/in/clint-broadhead-340686140/',
      icon: 'linkedin'
    },
    {
      url: 'https://github.com/coolhand33',
      icon: 'github'
    },
    {
      url: 'https://codepen.io/coolhand33',
      icon: 'codepen'
    },
    {
      url: 'https://twitter.com/cbslc33',
      icon: 'twitter'
    }
  ];

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
      //quotes api should deliver 100 quotes, this will select a random index between 0 and number of quotes - 1
      let quoteIndex = Math.floor(Math.random() * (this.quotes.length));
      this.quote = this.quotes[quoteIndex];
    }
  }
}
