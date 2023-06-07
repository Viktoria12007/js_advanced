import { el, setChildren } from 'redom';

const container = el('div', { className: 'container vh-100 d-flex flex-column align-items-center justify-content-center' });
const card = el('div', { className: 'card w-50' });
const cardHeader = el('h3', { textContent: 'Оплата банковской картой', className: 'card-header text-center' });
const cardBody = el('div', { className: 'card-body p-3' });
const form = el('form', { className: 'd-flex flex-column' });
const numberCard = el('label', { textContent: 'Номер банковской карты:', className: 'form-label d-flex flex-column mb-2' }, el('input', {
  className: 'form-control mt-2', type: 'text', autofocus: true, required: true, placeholder: 'Номер банковской карты',
}));
const expirationDateCard = el('label', { textContent: 'Дата окончания действия карты (ММ/ГГ):', className: 'form-label d-flex flex-column mb-2' }, el('input', {
  className: 'form-control mt-2', type: 'text', required: true, placeholder: 'Дата окончания действия карты',
}));
const cvcCVV = el('label', { textContent: 'CVC/CVV (3 цифры на обороте карты):', className: 'form-label d-flex flex-column mb-2' }, el('input', {
  className: 'form-control mt-2', type: 'text', required: true, placeholder: 'CVC/CVV',
}));
const email = el('label', { textContent: 'Email для отправки онлайн-чека:', className: 'form-label d-flex flex-column mb-3' }, el('input', {
  className: 'form-control mt-2', type: 'email', required: true, placeholder: 'Email',
}));
const button = el('button', {
  textContent: 'Оплатить', className: 'btn btn-secondary', type: 'submit', disabled: true, style: { 'margin-left': 'auto' },
});

setChildren(document.body, [container]);
setChildren(container, [card]);
setChildren(card, [cardHeader, cardBody]);
setChildren(cardBody, [form]);
setChildren(form, [numberCard, expirationDateCard, cvcCVV, email, button]);
