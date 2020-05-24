'use strict';
import './styles.css';
import apiService from './apiService';
import tamplate from './tamplates/tamplate.hbs';
const key = '16360208-b38b3071e12220d724142a6b1';
const input = document.querySelector('input[name = "query"]');
const gallery = document.querySelector('#gallery');
const button = document.querySelector('button[data-action = "load-more"]');
const debounce = require('lodash.debounce');
const modalCard = document.querySelector('.list__images');
let numberOfPage = 1;
let searchQuery;

input.addEventListener('input', debounce(handlerSearchingImages, 1000));
button.addEventListener('click', handlerNexPages);
modalCard.addEventListener('click', openModalWindow);
function handlerSearchingImages(event) {
  if (event.data === '' || event.data === null) {
    button.classList.remove('button-appearance');
    return;
  }
  button.classList.add('button-appearance');
  gallery.innerHTML = '';
  numberOfPage = 1;
  searchQuery = event.target.value;
  apiService(searchQuery, numberOfPage, key).then(data => {
    const markup = tamplate(data);
    gallery.insertAdjacentHTML('beforeend', markup);
  });
}
function handlerNexPages(event) {
  event.preventDefault();
  numberOfPage += 1;
  const pageHeight =
    document.documentElement.offsetHeight - button.clientHeight;

  apiService(searchQuery, numberOfPage, key).then(data => {
    const markup = tamplate(data);
    gallery.insertAdjacentHTML('beforeend', markup);
    window.scrollTo({
      top: pageHeight,
      behavior: 'smooth',
    });
  });
}
