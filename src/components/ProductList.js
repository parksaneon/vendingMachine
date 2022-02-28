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
        ({ imageUrl, name, price }) => `<li class="Product">
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
}
