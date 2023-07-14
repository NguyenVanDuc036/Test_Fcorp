export const formatInputMoney = (number: number): string => {
  return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function debounce(fn: any) {
  let timeout: any;
  return function (...args:[]) {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, 300);
  };
}
