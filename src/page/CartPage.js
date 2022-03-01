import { getItem } from '../util/storage';

export default function CartPage({ $target }) {
  const $page = document.createElement('div');
  $page.className = 'CartPage';

  $page.innerHTML = '<h1>장바구니</h1>';

  this.state = { products: null };

  const cartData = getItem('products_cart', []);

  this.render = () => {
    if (cartData.length === 0) {
      alert('장바구니가 비어있습니다.');
      routeChange('/');
    } else {
      $target.appendChild($page);
    }
  };
}
