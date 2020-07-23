import { Stores, Actions } from '../Redux'
import { HTTP_METHODS } from '../Helpers/Endpoints'
import Session from '../Helpers/Session'

require('dotenv').config()
export class NetworkManager {

  constructor(endpoint, body = {}, params = {}) {
    this.baseUrl = process.env.REACT_APP_API_URL
    this.endpoint = endpoint.endpoint
    this.method = endpoint.method
    this.params = params
    this.body = body
    this.headers = {
      // "Content-Type": "application/json"
    }
  }

  httpRequest = async (header = true) => {
    let error = []
    let data = []
    let status = false
    let message = ""
    let code = 200
    try {
      const url = `${this.baseUrl}${this.endpoint}${this.requestParams}`
      const options = {
        method: this.method
      }
      if (Session.getToken) {
        this.headers.Authorization = Session.getToken ?? ""
      }
      if (header) {
        options.headers = this.headers
      }
      if (this.method !== HTTP_METHODS.GET) {
        options.body = JSON.stringify(this.body)
      }
      const res = await fetch(url, options)
      const response = await res.json()
      data = response.data
      status = response.status
      code = response.status_code
      message = response.message
      if (!status) {
        message = this.parseErrors(response.error, response.message)
        Stores.dispatch({ type: Actions.NOTIFY, data: {message: message, type: "error"} })
      }
      if (response.status_code === 401) {
        Session.clearSession()
        Stores.dispatch({ type: Actions.NOTIFY, data: {message: response.message, type: "error"} })
        Stores.dispatch({ type: Actions.LOGOUT })
      }
    } catch (err) {
      error.push(err.message)
      message = err.message
      Stores.dispatch({ type: Actions.NOTIFY, data: {message, type: "error"} })
    } finally {
      return new Response(status, message, code, data, error)
    }
  }

  get requestParams() {
    let param = ""
    for (let key in this.params) {
      param = `${param}/${this.params[key]}`
    }
    return param;
  }

  parseErrors = (errors = {}, firstError = "") => {
    let err = []
    for (let e in errors) {
      err.push(errors[e])
    }
    if (firstError.length > 2) {
      err.push(firstError)
    }
    return err[0]
  }

}

class Response {
  constructor(status, message, code, data, error) {
    this.status = status
    this.message = message
    this.data = data
    this.error = error
    this.code = code
  }
}