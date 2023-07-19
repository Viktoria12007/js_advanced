import { setAttr } from 'redom';
import payform from 'payform';
import isEmail from 'validator/lib/isEmail';
import urls from './urls';
import createDOMTree from './dom';
import '../scss/styles.scss';

const dom = createDOMTree();

payform.cardNumberInput(dom.cardNumber);
payform.expiryInput(dom.cardExpirationDate);
payform.cvcInput(dom.cvcCVV);

function setStyle(e, state, input, feedback) {
  if (state) {
    if (e.target.name === 'cardNumber') {
      const paymentSystem = payform.parseCardType(e.target.value);
      setAttr(dom.brandLogo, {
        src: `${urls[paymentSystem]}`,
        alt: `${paymentSystem}`,
        className: 'logo mb-2 visible',
      });
    }
    setAttr(input, {
      className: 'form-control is-valid',
    });
    setAttr(feedback, {
      textContent: 'Успешно!',
      className: 'valid-feedback',
    });
  } else {
    if (e.target.name === 'cardNumber') {
      setAttr(dom.brandLogo, {
        src: '',
        alt: '',
        className: 'logo mb-2',
      });
    }
    setAttr(input, {
      className: 'form-control is-invalid',
    });
    if (!e.target.value) {
      setAttr(feedback, {
        textContent: 'Поле обязятельно к заполнению!',
      });
    } else {
      setAttr(feedback, {
        textContent: 'Не верный формат!',
      });
    }
    setAttr(feedback, {
      className: 'invalid-feedback',
    });
  }
}

function cancelStyle(e, input, feedback) {
  if (e.target.name === 'cardNumber') {
    setAttr(dom.brandLogo, {
      src: '',
      alt: '',
      className: 'logo mb-2',
    });
  }
  setAttr(input, {
    className: 'form-control',
  });
  setAttr(feedback, {
    textContent: 'Не верный формат!',
    className: 'invalid-feedback',
  });
}

const statusValidation = {
  cardNumber: null,
  cardExpirationDate: null,
  cvcCVV: null,
  email: null,
};

function checkReadyForm() {
  if (Object.values(statusValidation).every((element) => element)) {
    setAttr(dom.button, {
      disabled: false,
    });
  } else {
    setAttr(dom.button, {
      disabled: true,
    });
  }
}

dom.cardNumber.addEventListener('blur', (e) => {
  statusValidation.cardNumber = payform.validateCardNumber(e.target.value);
  setStyle(
    e,
    statusValidation.cardNumber,
    dom.cardNumber,
    dom.cardNumberFeedback
  );
  checkReadyForm();
});
dom.cardExpirationDate.addEventListener('blur', (e) => {
  const { month, year } = payform.parseCardExpiry(e.target.value);
  statusValidation.cardExpirationDate = payform.validateCardExpiry(month, year);
  setStyle(
    e,
    statusValidation.cardExpirationDate,
    dom.cardExpirationDate,
    dom.cardExpirationDateFeedback
  );
  checkReadyForm();
});
dom.cvcCVV.addEventListener('blur', (e) => {
  statusValidation.cvcCVV = payform.validateCardCVC(e.target.value);
  setStyle(e, statusValidation.cvcCVV, dom.cvcCVV, dom.cvcCVVFeedback);
  checkReadyForm();
});
dom.email.addEventListener('blur', (e) => {
  statusValidation.email = isEmail(e.target.value);
  setStyle(e, statusValidation.email, dom.email, dom.emailFeedback);
  checkReadyForm();
});

dom.cardNumber.addEventListener('input', (e) => {
  cancelStyle(e, dom.cardNumber, dom.cardNumberFeedback);
});
dom.cardExpirationDate.addEventListener('input', (e) => {
  cancelStyle(e, dom.cardExpirationDate, dom.cardExpirationDateFeedback);
});
dom.cvcCVV.addEventListener('input', (e) => {
  cancelStyle(e, dom.cvcCVV, dom.cvcCVVFeedback);
});
dom.email.addEventListener('input', (e) => {
  cancelStyle(e, dom.email, dom.emailFeedback);
});

dom.button.addEventListener('click', (e) => {
  e.preventDefault();
});
