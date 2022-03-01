export default function SelectedOptions({ $target, initialState }) {
  const $component = document.createElement('div');
  $target.appendChild($component);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.getTotalPrice = () => {
    const { product, selectedOptions } = this.state;
    const { price: productPrice } = product;

    return selectedOptions.reduce((acc, { optionPrice, quantity }) => acc + (productPrice + optionPrice) * quantity, 0);
  };

  this.render = () => {
    const {
      product: { price },
      selectedOptions = [],
    } = this.state;

    if (product && selectedOptions) {
      $component.innerHTML = `
        <h3>선택된 상품</h3>
        <ul>
          ${selectedOptions
            .map(
              ({ optionName, optionPrice, optionId, quantity }) => `
            <li>
              ${optionName} ${price + optionPrice}원
              <input type="text" data-optionId="${optionId}" value="${quantity}">
            </li>
          `
            )
            .join('')}
        </ul>
        <div class="ProductDetail__totalPrice">${this.getTotalPrice()}원</div>
        <button class="OrderButton">주문하기</button>
      `;
    }
  };

  this.render();
}
