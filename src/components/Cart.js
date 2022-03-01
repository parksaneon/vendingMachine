export default function Cart({ $target, initialState }) {
  const $component = document.createElement('div');
  $component.className = 'Cart';
  this.state = initialState;

  $target.appendChild($component);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.getTotalPrice = () =>
    this.state.reduce(
      (acc, { productPrice, optionPrice, quantity }) => acc + (productPrice + optionPrice) * quantity,
      0
    );

  this.render = () => {
    $component.innerHTML = `
      <ul>
        ${this.state
          .map(
            ({ imageUrl, productName, optionName, quantity, productPrice, optionPrice }) => `
          <li class="Cart__item">
            <img src="${imageUrl}">
            <div class="Cart__itemDescription">
              <div>${productName} ${optionName} ${quantity}개</div>
              <div>${productPrice + optionPrice}원</div>
            </div>
          </li>
        `
          )
          .join('')}
      </ul>
      <div class="Cart__totalPrice">
        총 상품가격 ${this.getTotalPrice()}원
      </div>
      <button class="OrderButton">주문하기</button>
    `;

    return $component;
  };

  this.render();
}
