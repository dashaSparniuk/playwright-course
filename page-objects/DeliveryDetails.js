import {expect} from "@playwright/test"

export class DeliveryDetails {
    constructor(page) {
        this.page = page

        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.streetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postCodeInput = page.locator('[data-qa="delivery-post-code"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.saveAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.saveAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.saveAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.saveAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.saveAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.saveAddressCountry = page.locator('[data-qa="saved-address-country"]')
        this.continueToPaymentButton = page.getByRole('button', {name: 'Continue to Payment'})
    }
    fillDetails = async (userAddress) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill("userAddress.firstName")
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill("userAddress,lastName")
        await this.streetInput.waitFor()
        await this.streetInput.fill("userAddress.street")
        await this.postCodeInput.waitFor()
        await this.postCodeInput.fill("userAddress.postCode")
        await this.cityInput.waitFor()
        await this.cityInput.fill("userAddress.city")
        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption("userAddress.country")
        
    }
    saveDetails = async () => {
        const addressCountBeforeSaving = await this.saveAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.saveAddressContainer).toHaveCount(addressCountBeforeSaving + 1)
        
        await this.savedAddressFirstName.first().waitFor()
        expect(await this.saveAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
        
        await this.savedAddressLastName.first().waitFor()
        expect(await this.saveAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())
        
        await this.savedAddressStreet.first().waitFor()
        expect(await this.saveAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())
        
        await this.savedAddressCity.first().waitFor()
        expect(await this.saveAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())
        
        await this.savedAddressPostcodefirst().waitFor()
        expect(await this.saveAddressPostcode.first().innerText()).toBe(await this.postcodeInput.inputValue())
        
        await this.savedAddressCountryfirst().waitFor()
        expect(await this.saveAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())
        
        await this.page.pause()
    }
    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForUrl("/\/payment/", {timeout: 3000})
        
    }
}