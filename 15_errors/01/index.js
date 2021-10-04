export function calculateDiscount(price, percent) {
  if (typeof(price) !== 'number' && typeof(percent) !== 'number') {
  throw new TypeError('Вводиммые значения должны быть цифрами')
  }
  return (price / 100) * percent;
}

export function getMarketingPrice(product) {
  try {
    const productObject = JSON.parse(product);
    return productObject.prices.marketingPrice;
  }
  catch {
    return null;
  }
}

// Функция имитирует неудачный запрос за картинкой
function fetchAvatarImage(userId) {
  return new Promise((resolve, reject) => {
    reject(new Error(`Error while fetching image for user with id ${userId}`));
  });
}

export async function getAvatarUrl(userId) {
  try {
    const image = await fetchAvatarImage(userId);
    return image.url;
  }
  catch {
    return '/images/default.jpg';
  }
}