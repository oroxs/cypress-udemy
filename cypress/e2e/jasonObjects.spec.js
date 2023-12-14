/// <reference types="cypress" />

describe('JSON objects', () => {
    it ('JSON objects', () => {
        cy.openHomePage()

    const simpleObject = {"key": "value", "key2": "value2"}

    const simpleArrayOfValue = ["one", "two", "three"]
        
    const arrayOfObjects = [{"key": "value"},{"key2": "value2"},{"key3": "value3"}]
    
    const typeOfData = {"string":"this is string", "number": 10}

    const mix ={
        "FirstName": "Vedy",
        "LastName": "Nugraha",
        "Age":35,
        "Students": [
            {
                "firstName": "Sara",
                "lastName": "Conor"
            },
            {
                "firstName": "Bruce",
                "lastName": "Willis"
            }

        ]
    }

    console.log(simpleObject.key2)
    console.log(simpleObject["key2"])
    console.log(simpleArrayOfValue[1])
    console.log(arrayOfObjects[2].key3)
    console.log(mix.Students[0].firstName)
    })
})