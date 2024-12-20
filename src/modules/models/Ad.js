export class Ad {
  constructor(item) {
    for (let key in item) {
      this[key] = item[key];
    }

    this.createdAt = new Date(this.created_at).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    });
    this.updatedAt = new Date(this.updated_at).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    });
    this.templateElm = document.getElementById('ad-template');
  }

  render(isDashboard = false) {
    const adElm = document.importNode(this.templateElm.content, true);

    adElm.querySelectorAll('a').forEach((link) => {
      link.setAttribute('data-item-id', this.id);
    });

    adElm.querySelector('.item-image').src = this.image;
    adElm.querySelector('.listing-rating').innerHTML = this.renderStars(
      this.stars
    );
    adElm.querySelector('.listing-date').textContent = this.elapsed;
    adElm.querySelector('.item-title').textContent = this.title;
    adElm.querySelector('.item-category').textContent = this.category.title;
    adElm.querySelector('.item-location').textContent = this.location.title;

    if (isDashboard) {
      adElm.querySelector('.item-ribbon').classList.remove('hidden');
      adElm.querySelector('.item-delete').classList.remove('hidden');
      adElm.querySelector('.item-delete').setAttribute('data-item-id', this.id);
    }
    return adElm;
  }

  renderStars(stars) {
    let output = '';
    for (let i = 1; i <= stars; i++) {
      output += "<i class = 'fa fa-star filled'> </i>";
    }
    return output;
  }

  priceFormat() {
    return Intl.NumberFormat().format(this.price);
  }
}
