//variables to make tests cleaner
const visitForm = () => cy.visit('localhost:3000/pizza');

const nameInput = () => cy.get('input[name="name"]');
const sizeInput = () => cy.get('select[name="size"]');
const salamiInput = () => cy.get('[type="checkbox"][name="salami"]');
const peppersInput = () => cy.get('[type="checkbox"][name="peppers"]');
const chokesInput = () => cy.get('[type="checkbox"][name="chokes"]');
const glazeInput = () => cy.get('[type="checkbox"][name="glaze"]');
const specialInput = () => cy.get('input[name="special"]');

//function for filling out form
const formFiller = () => {
    visitForm()
    nameInput().type('Steven')
    sizeInput().select('Personal - 8"')
    glazeInput().check()
    specialInput().type('extra napkins please!')
}

//testing that text box can be filled out
describe('Name Box Test', function(){
    it('checks if the name box can be typed in', function(){
        visitForm()
        nameInput().type('Steven')
    })
})

//testing that multiple toppings can be selected
describe('Toppings Check', function() {
    it('checks if multiple toppings can be selected at the same time', function(){
        visitForm()
        salamiInput().check()
        peppersInput().check()
        chokesInput().check()
        glazeInput().check()
    })
})

//testing that the form may be submitted when properly filled out
describe('Submit Form', function(){
    it('checks if submit button is disabled initially', function(){
        visitForm()
        .get('button[type="submit"]')
        .should('have.disabled')
    })
    it('checks if submit button is enabled after filling out form properly', function(){
        visitForm()
        formFiller()
        cy.get('button[type="submit"]')
        .should('not.have.disabled')
    })
    it('checks that form may be submitted', function(){
        visitForm()
        formFiller()
        cy.get('form')
        .submit()
    })
})