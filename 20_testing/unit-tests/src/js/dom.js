import { el, setChildren } from 'redom';

export default function createDOMTree() {
  const container = el('div', {
    className:
      'container vh-100 d-flex flex-column align-items-center justify-content-center',
  });
  const card = el('div', { className: 'card w-50' });
  const cardHeader = el('h3', {
    textContent: 'Оплата банковской картой',
    className: 'card-header text-center',
  });
  const cardBody = el('div', { className: 'card-body p-3' });
  const brandLogo = el('img', { className: 'logo mb-2' });
  const form = el('form', {
    className: 'd-flex flex-column needs-validation',
    autocomplete: 'on',
  });

  const cardNumber = el('input', {
    className: 'form-control',
    id: 'cardNumber',
    type: 'tel',
    autofocus: true,
    required: true,
    placeholder: 'Номер банковской карты',
    name: 'cardNumber',
    autocomplete: 'cc-number',
  });
  const cardNumberLabel = el('label', {
    for: 'cardNumber',
    textContent: 'Номер банковской карты',
  });
  const cardNumberFeedback = el('div', {
    textContent: 'Успешно!',
    className: 'valid-feedback',
  });
  const cardNumberWrap = el(
    'div',
    {
      className: 'form-floating',
    },
    cardNumber,
    cardNumberLabel,
    cardNumberFeedback
  );

  const cardExpirationDate = el('input', {
    className: 'form-control',
    type: 'tel',
    required: true,
    placeholder: 'Дата окончания действия карты',
    name: 'cardExpirationDate',
    autocomplete: 'cc-exp',
  });
  const cardExpirationDateLabel = el(
    'label',
    {
      textContent: 'Дата окончания действия карты (ММ/ГГ)',
      className: 'form-label d-flex flex-column mb-2',
    },
    cardExpirationDate
  );
  const cardExpirationDateFeedback = el('div', {
    textContent: 'Успешно!',
    className: 'valid-feedback',
  });
  const cardExpirationDateWrap = el(
    'div',
    {
      className: 'form-floating',
    },
    cardExpirationDate,
    cardExpirationDateLabel,
    cardExpirationDateFeedback
  );

  const cvcCVV = el('input', {
    className: 'form-control',
    type: 'tel',
    required: true,
    placeholder: 'CVC/CVV',
    name: 'cvcCVV',
    autocomplete: 'of',
  });
  const cvcCVVLabel = el(
    'label',
    {
      textContent: 'CVC/CVV (3 цифры на обороте карты)',
      className: 'form-label d-flex flex-column mb-2',
    },
    cvcCVV
  );
  const cvcCVVFeedback = el('div', {
    textContent: 'Успешно!',
    className: 'valid-feedback',
  });
  const cvcCVVWrap = el(
    'div',
    {
      className: 'form-floating',
    },
    cvcCVV,
    cvcCVVLabel,
    cvcCVVFeedback
  );

  const email = el('input', {
    className: 'form-control',
    type: 'email',
    required: true,
    placeholder: 'Email',
    name: 'email',
    autocomplete: 'email',
  });
  const emailLabel = el(
    'label',
    {
      textContent: 'Email для отправки онлайн-чека',
      className: 'form-label d-flex flex-column mb-3',
    },
    email
  );
  const emailFeedback = el('div', {
    textContent: 'Успешно!',
    className: 'valid-feedback',
  });
  const emailWrap = el(
    'div',
    {
      className: 'form-floating',
    },
    email,
    emailLabel,
    emailFeedback
  );

  const button = el('button', {
    textContent: 'Оплатить',
    className: 'btn btn-secondary',
    type: 'submit',
    disabled: true,
    style: { 'margin-left': 'auto' },
  });

  setChildren(document.body, [container]);
  setChildren(container, [card]);
  setChildren(card, [cardHeader, cardBody]);
  setChildren(cardBody, [brandLogo, form]);
  setChildren(form, [
    cardNumberWrap,
    cardExpirationDateWrap,
    cvcCVVWrap,
    emailWrap,
    button,
  ]);

  return {
    container,
    cardNumber,
    cardExpirationDate,
    cvcCVV,
    brandLogo,
    cardNumberFeedback,
    cardExpirationDateFeedback,
    cvcCVVFeedback,
    email,
    emailFeedback,
    button,
  };
}
