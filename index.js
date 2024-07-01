const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 5000;

// ===== Home Route ====== //
app.get('/', (req,res) => {
    return res.send("HNG11_STAGE_ONE_TASK.")
})

app.get("/api/hello", async (req,res) => {
    try {

        const {visitor_name} = req.query;  // ======= Visitor Name ========= //
        const name = visitor_name || "Mark";

        let ip = req.headers['x-forwarded-for'] ? ip.split(',')[0] : "127.0.0.1"; // ==== Visitor Ip === //

        const getLocation = await axios(`http://ip-api.com/json/${ip}`);
        const getLocationData = await getLocation.data;
        
        const location = getLocationData.city || "New York"; // ========== Visitor Location ========= //

        return res.status(200).json({
            client_ip: ip, 
            location,
            greeting: `Hello ${name}!, the temperature is 11 degrees Celsius in ${location}.`
        });

    } catch (error) {
        return res.status(500).json({message:"Error fetching location. Please try again."});
    }
    
});

app.listen(PORT,() => {
    console.log(`Server is listening on port ${PORT}`);
})