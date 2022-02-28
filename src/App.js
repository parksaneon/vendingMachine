import ProductDetailPage from './page/ProductDetailPage';
import ProductListPage from './page/ProductListPage';

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;

    $target.innerHTML = '';

    if (pathname === '/') {
      new ProductListPage({ $target }).render();
    } else if (pathname.indexOf('/products/') === 0) {
      const [_, productId] = pathname.split('/');

      new ProductDetailPage({
        $target,
        productId,
      }).render();
    }
  };
}
