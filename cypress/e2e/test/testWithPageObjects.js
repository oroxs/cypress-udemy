import { navigateTo, onNavigationPage } from "../../support/page_objects/navigationPage"

describe('Test wiht page Objects',()=>{

    beforeEach('open application', ()=> {
        cy.visit('/')
    })

    it ('Verify navigations across the pages',() =>{

        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.smartTablePage()
        navigateTo.toasterPage()
        navigateTo.tooltipPage()
    })
})