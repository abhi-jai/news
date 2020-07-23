import momentJs from "moment"

class DateHelper {
  constructor() {
    this.moment = momentJs
  }

  getYear = () => {
    return this.moment().year()
  }

  getDate = (date = this.moment(), format = "DD/MM/YY") => {
    return this.moment(date).format(format)
  }

  getUnixDate = (date, format = "DD/MM/YY") => {
    return this.moment.unix(date).format(format)
  }
  
  checkIfSameMonth = (date = this.moment()) => {
    return this.moment(date).month()
  }

}

export default new DateHelper()