import './sass/main.scss';
import './js/apiService.js';
import createCard from './templates/img-card.hbs';
import { data } from 'browserslist';
import ImgCard from './js/apiService.js';
var debounce = require('lodash.debounce');
import LoadMoreBtn from './js/loadMore.js';
import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

const refs = {
  list: document.querySelector('.gallery'),
  input: document.querySelector('.input'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imgCardFetch = new ImgCard();

refs.input.addEventListener('input', debounce(onInput, 1000));
refs.input.addEventListener('click', onInputClick);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onInput() {
  if (refs.input.value.trim() === '') {
    return;
  }

  imgCardFetch.queryValue = refs.input.value;
  imgCardFetch.getFetch().then(img => {
    if (img.hits.length === 0) {
      loadMoreBtn.hide();
      error({
        text: 'No matches',
      });
    } else {
      createImgItemMarkup(img);
      loadMoreBtn.show();
    }
  });
}
function fetchArticles() {
  loadMoreBtn.disable();
  imgCardFetch.getFetch().then(img => {
    createImgItemMarkup(img);
    loadMoreBtn.enable();
    btnScrollElem();
  });
}

function createImgItemMarkup(data) {
  refs.list.insertAdjacentHTML('beforeend', createCard(data));
}
function onInputClick() {
  refs.input.value = '';
  refs.list.innerHTML = '';
  loadMoreBtn.hide();
}

function btnScrollElem() {
  loadMoreBtn.refs.button.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
