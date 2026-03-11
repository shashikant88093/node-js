const axios = require("axios")
const { ca } = require("zod/v4/locales")



const getWithRetry = async(url, attempt = 1) => {
    try {
          const response = await axios.get(url)
          return response.data
    }
    catch (err) {
        if(attempt <= 3){
           setImmediate(()=> getWithRetry(url , attempt + 1),Math(2,attempt * 1000));
        }else{
            throw new Error(`Max retires reached for ${url}`)
        }
 
    }
}


module.exports = {
    getWithRetry
}