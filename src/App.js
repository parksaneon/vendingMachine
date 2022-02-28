import ProductListPage from './page/ProductListPage';
import ProductDetailPage from './page/ProductDetailPage';
import CartPage from './page/CartPage';
import { init } from './util/router';

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;

    $target.innerHTML = '';

    if (pathname === '/') {
      new ProductListPage({ $target }).render();
    } else if (pathname === '/cart') {
      new CartPage({ $target }).render();
    } else if (pathname.indexOf('/products/') === 0) {
      new CartPage({ $target }).render();
      const [_, productId] = pathname.split('/');

      new ProductDetailPage({
        $target,
        productId,
      }).render();
    }
  };

  init(this.route);

  this.route();
}
