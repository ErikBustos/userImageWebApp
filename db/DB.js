const fetch = require('node-fetch');

require('dotenv').config();

const URL = `http://localhost:${process.env.PORT_LOOPBACK}/`

class DB{
        //return a JSON response of the URL
        async getJson(endpoint){
            let myJson;
            await fetch(URL+endpoint)
            .then(response => response.json())
            .then(json => {
                myJson= json
            })
            return myJson;
        }

        //POST a JSON to the database
        async postJson(endpoint, json){
            let responseJson;
            await fetch(URL+endpoint,
                {
                    method: 'POST',
                    body: JSON.stringify(json),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then(response => response.json())
            .then(json => responseJson = json)
            return responseJson;
        }

}

module.exports = DB;