import SelectedOptions from './SelectedOptions';

export default function ProductDetail({ $target, initialState }) {
  const $productDetail = document.createElement('div');
  $productDetail.className = 'ProductDetail';

  $target.appendChild($productDetail);

  this.state = initialState;

  let selectedOptions = null;
  let isInitialized = false;

  this.setState = nextState => {
    this.state = nextState;
    this.render();

    if (selectedOptions) {
      selectedOptions.setState({
        selectedOptions: this.selectedOptions,
      });
    }
  };

  this.render = () => {
    const {
      product: { imageUrl, name, price },
    } = this.state;

    if (!isInitialized) {
      $productDetail.innerHTML = `
      <img src="${imageUrl}"/>
      <div class="ProductDetail__info">
        <h2>${name}</h2>
        <div class="ProductDetail__price">${price}원~</div>
        <select>
          <option>선택하세요.</option>
          ${product.productOptions
            .map(
              ({ id, stack, name, price }) => `
            <option value="${id}" ${stack === 0 ? 'disabled' : ''}>
              ${name} ${name} ${price > 0 ? `(+${price}원)` : ''}
            </option>
          `
            )
            .join('')}
        </select>
        <div class="ProductDetail__selectedOptions"></div>
      </div>
    `;

      selectedOptions = new SelectedOptions({
        $target: $productDetail.querySelector('.ProductDetail__selectedOptions'),
        initialState: {
          product: this.state.product,
          selectedOptions: this.state.selectedOptions,
        },
      });

      isInitialized = ture;
    }
  };

  $productDetail.addEventListener('change', ({ target }) => {
    if (target.tagName === 'SELECT') {
      const selectedOptionId = parseInt(target.value);
      const {
        product: { productOptions },
        selectedOptions,
      } = this.state;
      const option = productOptions.find(({ id }) => id === selectedOptionId);
      const selectedOption = selectedOptions.find(({ optionId }) => optionId === selectedOptionId);

      if (option && !selectedOption) {
        const nextSelectedOptions = [
          ...selectedOptions,
          {
            productId: product.id,
            optionId: option.id,
            optionName: option.name,
            optionPrice: option.price,
            quantity: 1,
          },
        ];

        this.setState({ ...this.state, selectedOptions: nextSelectedOptions });
      }
    }
  });
}
