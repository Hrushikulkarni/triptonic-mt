require('dotenv').config();
const axios = require('axios');
const key = process.env.GOOGLE_API_KEY;

const hello = async (req, res) => {
  res.send("Hello");
}


// Take area, city and category of place to give out the list of places.
const mresto = async (req, res, next) => {
  try {
    const neighborhood = 'UCI'
    const city = 'Irvine'
    const category = 'pizza'
    const {data} = await axios.get(
   `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${neighborhood}+${city}&type=restaurant&key=${key}`
    )
    res.json(data)
    }
    catch (err) {
      next(err)
    }
}

// Take generalised text prompt explaining requirement in a line give out the place list.
const textsearch = async (req, res, next) => {
  if (req.method === "POST") {
    try{
      const payload = {
        textQuery: "Spicy Vegetarian Food in Irvine, CA"
      };

      // Set up the headers for the POST request
      const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key, // Replace 'API_KEY' with your actual API key
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel'
      };

      // Make the POST request using axios
      const response = await axios.post('https://places.googleapis.com/v1/places:searchText', payload, { headers });

      // Process the response
      console.log(response.data);
      res.json(response.data);
    }
    catch(err) {
      next(err)
    }
  }
}

// Search for particular category of places in a specified location.
const nearsearch = async (req, res, next) => {
  if (req.method === "POST") {
    try{
      const payload = {
        includedTypes: ["tourist_attraction"],
        rankPreference: "DISTANCE",
        maxResultCount: 10,
        locationRestriction: {
          circle: {
            center: {
              latitude: 33.669445,
              longitude: -117.823059
            },
            radius: 5000.0
          }
        }
      };

      // Set up the headers for the POST request
      const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key, // Replace 'API_KEY' with your actual API key
        'X-Goog-FieldMask': 'places.displayName'
      };

      // Make the POST request using axios
      const response = await axios.post('https://places.googleapis.com/v1/places:searchNearby', payload, { headers });

      // Process the response
      console.log(response.data);
      res.json(response.data);
    }
    catch(err) {
      next(err)
    }
  }
}

module.exports = {hello, mresto, textsearch, nearsearch}