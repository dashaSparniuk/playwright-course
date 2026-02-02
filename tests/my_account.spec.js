import { test } from "@playwright/test"
import { MyAccountPage } from "./../page-objects/MyAccountPage.js"
import { getLoginToken } from "./../api-calls/getLoginToken.js"
import { adminDetails } from "./../data/userDetails.js"


test("My Account using cookie injection and mocking network request", async ({ page }) => {
    // Make a request to login token
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    // Inject the login to get into browser
    await page.route("**/api/users**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
        })
    })

    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()
})

