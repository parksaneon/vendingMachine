import ProductList from '../components/ProductList';
import request from '../util/request';

export default function ProductListPage({ $target }) {
  const $page = document.createElement('div');
  $page.className = 'ProductListPage';

  $page.innerHTML = '<h1>상품 목록</h1>';

  this.setState = nextState => {
    this.state = nextState;
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchProducts = async () => {
    const products = await request('/products');
    this.setState(products);
  };

  fetchProducts();

  const productList = new ProductList({
    $target: $page,
    initialState: this.state,
  });
}
