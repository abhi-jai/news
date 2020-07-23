import { NetworkManager } from "./NewsApiManager"
import { API } from "../Helpers/Endpoints"

class NewsService {
  constructor() {
    this.node = API.NEWS
  }


  top = async (data) => {
    const instance = new NetworkManager(this.node.TOP, {}, data)
    return await instance.httpRequest()
  }

  everything = async (data) => {
    const instance = new NetworkManager(this.node.EVERYTHING, {}, data)
    return await instance.httpRequest()
  }

}

export default new NewsService()