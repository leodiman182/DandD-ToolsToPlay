const fetch = require("node-fetch");

const fetchOptions = async (search) => {
    const url = `https://www.dnd5eapi.co/api/${search}`; 
    const response = await fetch(url); 
    const data = await response.json();    
  
    return data; 
}

module.exports = fetchOptions;