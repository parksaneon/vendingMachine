// ROUTE_CHANGE 이벤트 발생 시 onRouteChange 콜백 함수를 호출하도록 이벤트를 바인딩.
export const init = onRouteChange => {
  window.addEventListener('ROUTE_CHANGE_EVENT', () => {
    onRouteChange();
  });
};

// URL을 업데이트하고 커스텀 이벤트를 발생
export const routeChange = url => {
  history.pushState(null, null, url);
  window.dispatchEvent(CustomEvent('ROUTE_CHANGE_EVENT'));
};
