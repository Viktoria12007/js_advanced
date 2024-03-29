/// <reference types="cypress" />

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

describe('Игра "Найди пару". В начальном состоянии игра должна иметь поле четыре на четыре клетки, в каждой клетке цифра должна быть невидима.', () => {
  beforeEach(() => {
    cy.clock();
    cy.visit('http://localhost:8080/');
    cy.get('.form-control').type(`4{enter}`);
    cy.get('.box_for_cards .card').should('have.length', 8);
    cy.get('.box_for_cards .card').should('not.have.class', 'flip');
  });

  it('Нажать на одну произвольную карточку. Убедиться, что она осталась открытой.', () => {
    const randomNumber = randomInteger(0, 7);
    cy.get('.box_for_cards .card').eq(randomNumber).click();
    cy.tick(1500);
    cy.get('.box_for_cards .card')
      .eq(randomNumber)
      .should('have.attr', 'hasFlippedCard', 'true');
  });

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой.', () => {
    function findCouple(index) {
      cy.get('.box_for_cards .card').eq(index).as('secondCard');
      cy.get('@firstCard')
        .invoke('attr', 'data-number')
        .then((data) => {
          cy.get('@secondCard')
            .invoke('attr', 'data-number')
            .then((data2) => {
              cy.get('@firstCard').click();
              cy.get('@secondCard').click();
              cy.tick(1500);
              if (data === data2) {
                cy.get('@firstCard').should(
                  'have.attr',
                  'hasFlippedCard',
                  'true'
                );
                cy.get('@secondCard').should(
                  'have.attr',
                  'hasFlippedCard',
                  'true'
                );
                stop = true;
              }
              // eslint-disable-next-line no-param-reassign
              index += 1;
              if (index < 8 && !stop) {
                findCouple(index);
              }
            });
        });
    }
    cy.get('.box_for_cards .card').first().as('firstCard');
    let stop = false;
    let index = 1;
    findCouple(index);
  });

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на вторую карточку обе становятся невидимыми.', () => {
    function findNotCouple(index) {
      if (nextCouples) {
        cy.get('.box_for_cards .card').eq(index).as('firstCard');
        nextCouples = false;
        // eslint-disable-next-line no-param-reassign
        index += 1;
        if (index < 8 && !stop) {
          findNotCouple(index);
        }
      } else {
        cy.get('.box_for_cards .card').eq(index).as('secondCard');
        cy.get('@firstCard')
          .invoke('attr', 'data-number')
          .then((data) => {
            cy.get('@secondCard')
              .invoke('attr', 'data-number')
              .then((data2) => {
                cy.get('@firstCard').click();
                cy.get('@secondCard').click();
                cy.tick(1500);
                if (data === data2) {
                  nextCouples = true;
                  // eslint-disable-next-line no-param-reassign
                  index += 1;
                  if (index < 8 && !stop) {
                    findNotCouple(index);
                  }
                } else {
                  cy.get('@firstCard').should(
                    'have.attr',
                    'hasFlippedCard',
                    'false'
                  );
                  cy.get('@secondCard').should(
                    'have.attr',
                    'hasFlippedCard',
                    'false'
                  );
                  nextCouples = false;
                  stop = true;
                }
              });
          });
      }
    }
    let nextCouples = true;
    let stop = false;
    let index = 0;
    findNotCouple(index);
  });
});
