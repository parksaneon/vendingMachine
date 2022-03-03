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

  $component.addEventListener('click', ({ target }) => {
    // 이벤트가 INPUT 태그에서 발생한 경우에만 처리
    if (target.tagName === 'INPUT') {
      try {
        const nextQuantity = parseInt(target.value);
        const nextSelectedOptions = [...this.state.selectedOptions];

        // input의 값이 숫자인 경우에만 처리하기
        if (typeof nextQuantity === 'number') {
          const { product } = this.state;

          const optionId = parseInt(target.dataset.optionId);
          const option = product.productOptions.find(({ id }) => id === optionId);
          const selectedOptionIndex = nextSelectedOptions.findIndex(
            selectedOption => selectedOption.optionId === optionId
          );

          // INPUT에 입력한 값이 재고수량을 넘을 경우 재고수량으로 입력한 것으로 바꿔버리기
          nextSelectedOptions[selectedOptionIndex].quantity =
            option.stock >= nextQuantity ? nextQuantity : option.stock;

          this.setState({
            ...this.state,
            selectedOptions: nextSelectedOptions,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
}
