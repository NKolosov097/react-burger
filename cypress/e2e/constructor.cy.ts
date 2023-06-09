import login from '../fixtures/login.json'

describe('Constructor E2E tests', () => {
    beforeEach(() => {
        cy.viewport(1400, 900)
        cy.visit('#/')
    })
    const ingredientItem = '[class^=ingredient-item_item]'

    it('show and hide ingredient details modal', () => {
        cy.get(ingredientItem).first().click()
        cy.get('[class^=ingredient-details_container]').contains(
            'Детали ингредиента'
        )
        cy.get('[class^=ingredient-details_closeButton]').click()
        cy.get('[class^=ingredient-details_closeButton]').should('not.exist')
    })

    it('create order', () => {
        cy.get('[data-test="ingredient-list-bun"]').first().as('listOfBuns')
        cy.get('@listOfBuns').eq(0).find(ingredientItem).first().as('bun')
        cy.get('[data-test="ingredient-list-sauce"]').as('listOfSauces')
        cy.get('@listOfSauces').eq(0).find(ingredientItem).first().as('sauce')
        cy.get('[data-test="constructor-drop-target-bun"]')
            .first()
            .as('bun-desc')
        cy.get('[data-test="constructor-drop-target-notBun"]').as(
            'ingredient-desc'
        )

        cy.contains('Выберите булочку')
        cy.contains('Выберите начинку')

        cy.get('@bun').trigger('dragstart')
        cy.get('@bun-desc').trigger('drop')
        cy.get('@sauce').trigger('dragstart')
        cy.get('@ingredient-desc').trigger('drop')

        cy.get('[class^=button]').as('order-button')
        cy.get('@order-button').click()

        cy.contains('Вход')
        cy.get('[name=email]').type(login.email)
        cy.get('[name=password]').type(login.password)
        cy.contains('button', 'Войти').click()
        cy.getAllLocalStorage().get('value').should('not.be.empty')

        cy.get('button').contains('Оформить заказ').click()
        cy.contains('Ваш заказ обрабатывается')

        cy.contains('идентификатор заказа', { timeout: 20000 })
        cy.contains('Ваш заказ начали готовить')
        cy.get('[data-test="modal-close-icon"').click()

        cy.contains('Выберите булочку')
        cy.contains('Выберите начинку')
    })
})
