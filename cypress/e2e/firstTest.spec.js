/// <reference types="cypress" />

const { get } = require("core-js/core/dict");

describe('Our first suite', () => {

    it('first test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        
        // by Tag name
        cy.get('input')

        // by ID
        cy.get('#inputEmail1')

        // by Class name
        cy.get('.size-medium')

        // by Attribute name
        cy.get('[placeholder]')

        // by Attribute name and value
        cy.get('[placeholder="Email"]')

        // by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by Tag name and attribute with value
        cy.get('input[placeholder="Email"]')

        // by Two different attributes
        cy.get('input[placeholder="Email"][type="email"]')

        // by Tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // The most recomended way by Cypress
        cy.get('[data-cy="imputEmail1"]')
    });

    it('Second test',()=> {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy=sumbitButton]')

        cy.contains('Submit')
        cy.contains('[status="danger"]','Submit')

        cy.get('#exampleInputEmail1')
            .parents('form')
            .find('button')
            .should('contain','Submit')
            .parents('form')
            .find('nb-checkbox')
            .click()
        cy.contains('nb-card','Basic form').find('[type="email"]')
    })

    it('then and wrap methods',()=> {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        
        // cy.contains('nb-card','Horizontal form').find('[for="inputEmail3"]').should('contain','Email')
        // cy.contains('nb-card','Horizontal form').find('[for="inputPassword3"]').should('contain','Password')
        // cy.contains('nb-card','Basic form').find('.label').should('contain','Email address')
        // cy.contains('nb-card','Basic form').find('.label').should('contain','Password')

        // Selenium
        // const firstForm = cy.contains('nb-card','Horizontal form')
        // const secondForm = cy.contains('nb-card','Basic form')

        // firstForm.find('[for="inputEmail3"]').should('contain','Email')
        // firstForm.find('[for="inputPassword3"]').should('contain','Password')
        // secondForm.find('.label').should('contain','Email address')

        // Cypress Style

        cy.contains('nb-card','Horizontal form').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail3"]').text()
            const passwordlabelFirst = firstForm.find('[for="inputPassword3"]') .text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordlabelFirst).to.equal('Password')

            cy.contains('nb-card','Basic form').then(secondForm => {
                const passwordlabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordlabelFirst).to.equal(passwordlabelSecond)
            })
        })
    })

    it('invoke command',()=> {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // #1
        cy.get('[for="exampleInputEmail1"]').should('contain','Email address')
        
        // #2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
        })

        // #3
        cy.get('[for="inputFirstName"]').invoke('text').then( text => {
            expect(text).to.equal('First Name')
        })

        // #4
        cy.contains('nb-card','Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr','class')
            //.should('contain','checked')
            .then(classValue => {
                expect(classValue).to.contain('checked')
            })
    })

    it('assert property',() => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card','Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('26').click()
            cy.wrap(input).invoke('prop','value').should('contain','Aug 26, 2022')
        })
    })

    it('Radio button',() => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Using the Grid').find('[type="radio"]').then (radioButton => {
            cy.wrap(radioButton)
            .eq(1)
            .check({force:true})
            .should('be.checked')

            cy.wrap(radioButton)
            .first()
            .check({force:true})

            cy.wrap(radioButton)
            .eq(1)
            .should('not.be.checked')

            cy.wrap(radioButton)
            .eq(2)
            .should('be.disabled')
        })
    })

    it('Checked box',() => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

       // cy.get('[type="checkbox"]').check({force:true})
        cy.get('[type="checkbox"]').eq(0).click({force:true})
        cy.get('[type="checkbox"]').eq(1).check({force:true})

    })

    it('Select dropdown',() => {
        cy.visit('/')
        
        // cy.get('nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain','Dark')
        // cy.get('nb-layout-header nav').should('have.css','background-color','rgb(34, 43, 69)')
        
        cy.get('nav nb-select').then( drpdown => {
            cy.wrap(drpdown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()

                const colors = {
                    "Light":"rgb(255, 255, 255)",
                    "Dark":"rgb(34, 43, 69)",
                    "Cosmic":"rgb(50, 50, 89)",
                    "Corporate":"rgb(255, 255, 255)",
                }

                cy.wrap(listItem).click()
                cy.wrap(drpdown).should('contain',itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if (index <3){
                    cy.wrap(drpdown).click()
                }
            })
            
        })
    })

    it('Web Table',() =>{
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // #1
        cy.get('nb-card').should('contain','Smart Table')
        cy.get('tbody').contains('tr','John').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(20)
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain','20')
        })
        
        //#2
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Vedy')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Aditya')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then( tableColumn => {
            cy.wrap(tableColumn).eq(2).should('contain','Vedy')
            cy.wrap(tableColumn).eq(3).should('contain','Aditya')

        })

        //#3
        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow =>{
                if(age == 200){
                    cy.wrap(tableRow).find('td').should('contain','No data found')
                } else {
                cy.wrap(tableRow).find('td').eq(6).should('contain',age)
            }
            })
        })

    })
    it('Date Picker', ()=> {

        function selectDayFromCurrent(day){
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default',{month:'short'})
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
            cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then ( dateAttribute => {
                if (!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                }else {
                    cy.get('nb-calendar-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card','Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(8)
           
            cy.wrap(input).invoke('prop','value').should('contain',dateAssert)
        })

    })

    it('Tooltip',() =>{
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card','Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain','This is a tooltip')
    })

    it.only('Dialog boxs',() => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

    
    // #1
        // cy.get('tbody tr').first().find('.nb-trash').click() 
        // cy.on('window:confirm',(confirm)=> {
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })  

    // #2
        // const stub = cy.stub()
        // cy.on('window:confirm', stub)
        // cy.get('tbody tr').first().find('.nb-trash').click().then(()=>{
        //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        // }) 

    // #3
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm',() => false)     
    })
})
