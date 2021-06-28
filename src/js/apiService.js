const MY_KEY = '22260377-843feab13a68cee38d30608c2';
const BASE_URL = `https://pixabay.com/api`;

export default class ImgCard {
  constructor() {
    this.query = '';
    this.page = 1;
  }
  getFetch() {
    return fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${MY_KEY}`,
    )
      .then(res => res.json())
      .then(data => {
        this.incrementPage();
        return data;
      });
  }
  get queryValue() {
    return this.query;
  }
  set queryValue(value) {
    this.query = value;
  }
  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}
