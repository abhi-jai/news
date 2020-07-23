import { Stores, Actions } from '../Redux'
import { HTTP_METHODS } from '../Helpers/Endpoints'
import Session from '../Helpers/Session'

// require('dotenv.dev').config()
export class NetworkManager {

  constructor(endpoint, body = {}, params = {}) {
    this.baseUrl = "https://newsapi.org/v2"
    this.endpoint = endpoint.endpoint
    this.method = endpoint.method
    this.params = params
    this.body = body
    this.headers = {
    //   "Content-Type": "application/json"
    }
  }

  httpRequest = async (header = true) => {
    let error = []
    let data = []
    let status = false
    let message = ""
    try {
      const url = `${this.baseUrl}${this.endpoint}${this.requestParams}`
      const options = {
        method: this.method
      }
      if (header) {
        options.headers = this.headers
      }
      if (this.method !== HTTP_METHODS.GET) {
        options.body = JSON.stringify(this.body)
      }
      const res = await fetch(url, options)
      const response = await res.json()
      data = response.articles
      status = response.status
      if (status != "ok") {
        message = this.parseErrors(response.status)
        Stores.dispatch({ type: Actions.NOTIFY, data: {message: message, type: "error"} })
      }
    } catch (err) {
      error.push(err.message)
      message = err.message
      Stores.dispatch({ type: Actions.NOTIFY, data: {message, type: "error"} })
    } finally {
      return new Response(status, data, error)
    }
  }

  get requestParams() {
    let param = "?"
    var i = 1;
    for (let key in this.params) {
        if(i == 1){
            param = `${param}${key}=${this.params[key]}`
        }else{
            param = `${param}&${key}=${this.params[key]}`
        }
        i++;
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
  constructor(status, data) {
    this.status = status
    this.data = data
  }
}