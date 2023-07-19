import payform from 'payform';

test('Валидация номера карты пропускает корректный номер карты.', () => {
  expect(payform.validateCardNumber('4242424242424242')).toBe(true);
});

test('Валидация номера карты не пропускает произвольную строку, содержащую любые нецифровые символы.', () => {
  expect(payform.validateCardNumber('424ы42L242,242!2')).toBe(false);
});

test('Валидация номера карты не пропускает строку с недостаточным количеством цифр.', () => {
  expect(payform.validateCardNumber('42424242424242')).toBe(false);
});

test('Валидация номера карты не пропускает строку со слишком большим количеством цифр.', () => {
  expect(payform.validateCardNumber('4242424242424242424242424')).toBe(false);
});

test('Валидация CVV/CVC пропускает строку с тремя цифровыми символами.', () => {
  expect(payform.validateCardCVC('424')).toBe(true);
});

test('Валидация CVV/CVC не пропускает строки с 1-2 цифровыми символами.', () => {
  expect(payform.validateCardCVC('42')).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с 4+ цифровыми символами.', () => {
  expect(payform.validateCardCVC('42424')).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами (латиница, кириллица и знаки препинания).', () => {
  expect(payform.validateCardCVC('Yф:')).toBe(false);
});
