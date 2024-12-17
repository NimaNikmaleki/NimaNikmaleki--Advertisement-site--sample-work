import { Page } from '../Page';
import { App } from '../../App';
import { Loading } from '../../utils/loading';

export class Home extends Page {
  async prepareForRender(pageContent) {
    const pageDom = document.createElement('div');
    pageDom.innerHTML = pageContent;

    const [ads] = await Promise.all([
      App.getAdsList().list(),
      App.getCategory().list(),
      App.getLocation().list(),
    ]);

    this._prepareFilterInputs(pageDom);
    this._preapreAds(pageDom, ads);

    return pageDom.innerHTML;
  }

  afterRender() {
    this._handleFilterForm();
    this._handleSort();
    this._handleListing();
  }

  _handleListing() {
    const gridItem = document.querySelectorAll('.listing-item');
    const btnleft = document.getElementById('left-grid');
    const btnright = document.getElementById('right-grid');

    btnleft.addEventListener('click', () => {
      btnleft.firstChild.classList.add('act-grid-opt');
      btnright.firstChild.classList.remove('act-grid-opt');

      gridItem.forEach((item) => {
        item.classList.add('has_one_column');
      });
    });

    btnright.addEventListener('click', () => {
      btnleft.firstChild.classList.remove('act-grid-opt');
      btnright.firstChild.classList.add('act-grid-opt');

      gridItem.forEach((item) => {
        item.classList.remove('has_one_column');
      });
    });
  }

  _handleSort() {
    const sortElm = document.getElementById('sort-select');

    sortElm.addEventListener('change', (event) => {
      App.getAdsList().setFilter('sort', sortElm.value);

      Loading.show();
      App.getAdsList()
        .loadAds()
        .then((ads) => {
          this._preapreAds(document, ads);
          Loading.hide();
        });
    });
  }

  _handleFilterForm() {
    const form = document.getElementById('filter-form');
    const submitBtn = document.getElementById('filter-form-submit');

    const keywordElm = document.getElementById('keyword');
    const categoryElm = document.getElementById('category');
    const locationElm = document.getElementById('location');

    submitBtn.addEventListener('click', () => {
      App.getAdsList().setFilters(
        keywordElm.value,
        categoryElm.value,
        locationElm.value
      );

      Loading.show();
      App.getAdsList()
        .loadAds()
        .then((ads) => {
          this._preapreAds(document, ads);
          Loading.hide();
        });
    });
  }

  _prepareFilterInputs(pageDom) {
    const keywordElm = pageDom.querySelector('#keyword');
    const categoriesElm = pageDom.querySelector('#category');
    const locationsElm = pageDom.querySelector('#location');

    const adsList = App.getAdsList();

    if (adsList.getFilter('keyword')) {
      keywordElm.setAttribute('value', adsList.getFilter('keyword'));
    }

    App.getCategory().renderTo(categoriesElm, adsList.getFilter('category'));
    App.getLocation().renderTo(locationsElm, adsList.getFilter('location'));
  }

  _preapreAds(pageDom, ads) {
    const listWrapper = pageDom.querySelector('#home-list');
    const message = pageDom.querySelector('#no-result');

    listWrapper.innerHTML = '';

    ads.forEach((ad) => {
      listWrapper.append(ad.render());
    });

    const messageBox = pageDom.querySelector('#no-result');

    if (ads.length > 0) {
      messageBox.classList.add('hidden');
    } else {
      messageBox.classList.remove('hidden');
    }
  }
}
