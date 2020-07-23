
class Session {
  constructor() {
    this.keys = {
      USER: "@USER_INFO",
      TOKEN: "@AUTH_TOKEN"
    }
  }

  setUser = (data) => {
    localStorage.setItem(this.keys.USER, JSON.stringify(data))
  }

  getUser = () => {
    const json = localStorage.getItem(this.keys.USER)
    return JSON.parse(json)
  }

  setToken = (data) => {
    localStorage.setItem(this.keys.TOKEN, data)
  }

  get getToken() {
    return localStorage.getItem(this.keys.TOKEN)

  }

  clearSession = () => {
    return localStorage.clear()
  }

}

export default new Session()