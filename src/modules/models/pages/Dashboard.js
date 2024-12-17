import { App } from '../../App';
import { Loading } from '../../utils/loading';
import { Page } from '../Page';
import { UserAdsList } from '../UserAdsList';

export class DashBoardPage extends Page {
  shouldBeLogoutIn() {
    return true;
  }
  async prepareForRender(pageContent) {
    const pageDom = document.createElement('div');
    pageDom.innerHTML = pageContent;

    const ads = await new UserAdsList().loadAds();

    const wrapper = pageDom.querySelector('#dashboard-list');

    ads.forEach((ad) => {
      wrapper.append(ad.render(true));
    });
    this._prepareDom(pageDom, ads);

    return pageDom.innerHTML;
  }

  _prepareDom(pageDom, ads) {
    const messageBox = pageDom.querySelector('#no-result');

    if (ads.length > 0) {
      messageBox.classList.add('hidden');
    } else {
      messageBox.classList.remove('hidden');
    }

    pageDom.querySelector('#dashboard-user').innerText = App.getAuth().user;
    pageDom.querySelector('#dashboard-ads-count').textContent = ads.length;
  }

  afterRender() {
    this._handelDeleteAd();
    this._handelLogout();
  }

  _handelDeleteAd() {
    const deleteBtn = document.querySelectorAll('.item-delete');
    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const adId = event.currentTarget.getAttribute('data-item-id');

        const conf = confirm('ایا از حذف این اگهی مطمئن هستید ؟ ');

        if (!conf) {
          return;
        }

        Loading.show();

        new UserAdsList().delete(adId).then(() => {
          btn.closest('.listing-item').remove();
          Loading.hide();
        });
      });
    });
  }

  _handelLogout() {
    const logoutBtn = document.getElementById('dashboard-logout');

    logoutBtn.addEventListener('click', () => {
      Loading.show();
      App.getAuth()
        .logout()
        .then(() => {
          App.getRouter().navigateTo('login');
          Loading.hide();
        })
        .catch(() => {
          Loading.hide();
        });
    });
  }
}
