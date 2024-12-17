import { App } from '../../App';
import { Page } from '../Page';
import L from 'leaflet';
import { UserAdsList } from '../UserAdsList';

export class SinglePage extends Page {
  async prepareForRender(pageContent, adId) {
    const pageDom = document.createElement('div');

    pageDom.innerHTML = pageContent;

    const ad = await this._findAd(adId);

    if (!ad) {
      App.getRouter().navigateTo('home');
    }

    this._prepareDom(pageDom, ad);

    return pageDom.innerHTML;
  }
  _prepareDom(pageDom, ad) {
    pageDom.querySelector('.single-title').innerText = ad.title;
    pageDom.querySelector('.single-image').setAttribute('src', ad.image);
    pageDom.querySelector('.item-stars').innerHTML = ad.renderStars();
    pageDom.querySelector('.single-description').innerHTML = ad.description;
    pageDom.querySelector('.single-email').href = `mailto:${ad.owner.email}`;
    pageDom.querySelector('.single-email').innerText = ad.owner.email;
    pageDom.querySelector('.single-phone').href = `tel:${ad.owner.phone}`;
    pageDom.querySelector('.single-phone').innerText = ad.owner.phone;
    pageDom.querySelector('.single-address').innerHTML = `${ad.location.title}`;
    pageDom.querySelector('.single-views').innerText = ad.views;
    pageDom.querySelector('.single-created-at').innerText = ad.createdAt;
    pageDom.querySelector('.single-updated-at').innerText = ad.updatedAt;
    pageDom.querySelector('.single-category').innerHTML = ad.category.title;
    pageDom.querySelector('.single-price').innerHTML = ad.priceFormat();
    pageDom.querySelector('.user-name').innerText = ad.owner.name;
    pageDom.querySelector('.user-date').innerText = ad.owner.joined;
  }

  async afterRender(adId) {
    const ad = await this._findAd(adId);
    this._mapRender(ad);
  }

  _mapRender(ad) {
    const map = L.map('singleMap', {
      center: [ad.gps.latitude, ad.gps.longitude],
      zoom: 13,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([+ad.gps.latitude, +ad.gps.longitude]).addTo(map);

    const circle = L.circle([+ad.gps.latitude, +ad.gps.longitude], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(map);
  }

  async _findAd(adid) {
    let ad = App.getAdsList().find(adid);

    if (ad) {
      return ad;
    }

    ad = await new UserAdsList().find(adid);

    return ad;
  }
}
