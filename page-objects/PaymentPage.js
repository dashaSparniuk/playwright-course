import { expect} from "@playwright/test"

export class PaymentPage {
    constructor(page) {
       this.page=page

       this.discountCode = page.framelocator('[data-qa="active-discount-container"]')
                               .locator('[data-qa="discount-code"]')
        //new element fro the discount inpuy
        this.discountInput = page.getByPlaceholder('Discount code')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountedValue = page.locator('[data-qa="total-woth-discount-value"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
        this.creditCardOwnerInput = page.getByPlaceholder('Credit Card Owner')
        this.creditCardNumberInput = page.getByPlaceholder('Credit Card Number')
        this.creditCardValidUntilInput = page.getByPlaceholder('Valid until')
        this.creditCardCvcInput = page.getByPlaceholder('Credit Card CVC')
        this.payButton = page.locator('[data-qa="pay-button"]')
    }
    activeDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()

        // Option 1 for laggy inputs: using .fill() with await aexpect()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)

        //Option 2 for laggy inputs: slow typing
        //await this.discountInput.focus()
        //await this.page.keyboard.type(code, {delay: 1000})
        //expect(await this.discountInput.InputValue()).toBe(code)

        //await this.page.keyboard.down('Control')
        //await this.page.keyboard.type('c')
        //await this.page.keyboard.up('Control')

        expect (await this.discountedValue.isVisible()).toBe(false)
        expect (await this.discountActiveMessage.isVisible()).toBe(false)

        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        // check that it displayed "Discount activated"
        await this.discountActiveMessage.waitFor()
        //check that there is now a discounted price total showing
        await this.discountedValue.waitFor()
        const discountValueText = await this.discountedValue.InnerText() // "345$"
        const discountValueOnlyStringNumber = discountValueText.replasce("$", "")
        const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10)

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.InnerText() // "345$"
        const totalValueOnlyStringNumber = totalValueText.replasce("$", "")
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)
        // chech that the discounted price total is smaller than the regular one
        expect(discountValueNumber).toBeLessThan(totalValueNumber)

    }
    fillPaymentPage = async (paymentDetails) => {
        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(paymentDetails.owner)
        await this.creditCardNumberInput.waitFor()
        await this.creditCardNumberInput.fill(paymentDetails.number)
        await this.creditCardValidUntilInput.waitFor()
        await this.creditCardValidUntilInput.fill(paymentDetails.validUntil)
        await this.creditCardCvcInput.waitFor()
        await this.creditCardCvcInput.fill(paymentDetails.cvc)
        
    }
    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000})

    }
}