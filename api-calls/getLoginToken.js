import * as nodeFetch from "node-fetch"

export const getLoginToken = async (username, password) => {
const response = await nodeFetch("https://localhost:2221/api/login", {
 method: "POST",
 body: JSON.stringify({"username":"username", "password":"password"}),
})
if (response.status !== 200) {
    throw new Error("An error occiredf thying to retreive the login token.")
}
const body = await response.json()
return body.token
}
