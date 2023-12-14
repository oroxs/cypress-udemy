
import { navigateTo } from "../support/page_objects/navigationPage"
import { onFormLayoutPage} from "../support/page_objects/formLayoutPage"
import { onDatePickerPage } from "../support/page_objects/datepickerPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with page objects',() => {

    beforeEach ('open application', () => {
        cy.openHomePage()
    })

    it('Verify Navigation across the pages', () => {

        navigateTo.formLayoutsPage()
     //   navigateTo.datepickerPage()
        navigateTo.dialogboxPage()
        navigateTo.toastrPage()
        navigateTo.tooltipPage()
    })

    it.only('should submit inline and basic form',() => {
        navigateTo.formLayoutsPage()
        onFormLayoutPage.submitInlineFormWithNameAndEmail('Vedy','test@test.com')
        onFormLayoutPage.submitBasicForm('Vedy@test.com', 'Password')     
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRangeFromToday(4,10)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('vedy', 'Nugraha')
        onSmartTablePage.updateAgeByFirstName('John',30)
        onSmartTablePage.deleteRowByIndex(4)

    })



})