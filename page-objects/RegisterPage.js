export class RegisterPage {
    constructor(page) {
        this.page = page

        this.emailInput = page.getByPlaceholder('e-mail')
        this.passwordInput = page.getByPlaceholder('password')
        this.registerButton = page.getByRole('button', {name: 'Register'})
    }
      signUpAsNewUser = async (email,password) => {
        //type into email inputs 
        await this.emailInput.waitFor()
        //const emailId = uuidv4()
        //const email = emailId + "@gmail.com" //ds-dsada-dsada@gmail.com
        await this.emailInput.fill(email)
        //type into password input
        await this.passwordInput.waitFor()
        await this.passwordInput.fill("secretpassword")
        //click register button
        await this.registerButton.waitFor()
        await this.registerButton.click()
        
    }
}