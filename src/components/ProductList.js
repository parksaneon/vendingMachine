import { routeChange } from '../util/router';

export default function ProductList({ $target, initialState }) {
  const $productList = document.createElement('ul');
  $target.appendChild($productList);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    $productList.innerHTML = `${this.state
      .map(
        ({
          id,
          imageUrl,
          name,
          price,
        }) => `<li class="Product" data-product-id="${id}">
        <img src="${imageUrl}"/>
        <div class="Product__info">
          <div>${name}</div>
          <div>${price}</div>
        </div>
      </li>`
      )
      .join('')}`;
  };

  this.render();

  $productList.addEventListener('click', ({ target }) => {
    const $li = target.closet('li');
    const { productId } = $li.dataset;

    if (productId) {
      routeChange(`/products/${productId}`);
    }
  });
}
