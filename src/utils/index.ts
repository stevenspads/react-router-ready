export function isValidPrice(price: string) {
  return price.match(/^\d+(\.\d{1,2})?$/);
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}
