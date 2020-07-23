
export const HTTP_METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DEL: "DELETE"
}


class Endpoint {
  constructor(endpoint, method) {
    this.endpoint = endpoint
    this.method = method
  }
}

export const API = {

  NEWS: {
    TOP: new Endpoint("/top-headlines", HTTP_METHODS.GET),
    EVERYTHING: new Endpoint("/everything", HTTP_METHODS.GET)
  }
}