export default {
  methods: {
    csvToJson() {
      var allText = null
      var rawFile = new XMLHttpRequest()
      rawFile.open("GET", 'view-data.csv', false)
      rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0)) {
            allText = rawFile.responseText
        }
      }
      rawFile.send()

      var array = allText.toString().split("\r")
      let result = []
      let headers = array[0].split(", ")
      for (let i = 1; i < array.length - 1; i++) {
        let obj = {}
        let str = array[i]
        let s = ''
        let flag = 0
        for (let ch of str) {
          if (ch === '"' && flag === 0) {
            flag = 1
          }
          else if (ch === '"' && flag == 1) flag = 0
          if (ch === ', ' && flag === 0) ch = '|'
          if (ch !== '"') s += ch
        }
        let properties = s.split("|")
        for (let j in headers) {
          if (properties[j].includes(", ")) {
            obj[headers[j]] = properties[j]
              .split(", ").map(item => item.trim())
          }
          else obj[headers[j]] = properties[j]
        }
        result.push(obj)
      }
      return JSON.stringify(result)
    }
  }
}
