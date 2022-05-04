import express from "express";
import cors from 'cors';
import { config } from 'dotenv';
import fetch from "cross-fetch";


const app = express();


if(process.env.NODE_ENV !== 'production') config();


const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', async (req, res) => {

    try{

        const data = {
            endDate: "2099-02-18T14:23:00.000Z",
            isLocked: true,
            roomNamePatter: "normal",
            fields: ["hostRoomUrl"]
        };

        const response = await fetch("https://api.whereby.dev/v1/meetings", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const resData = await response.json();
        // console.log(r;
        res.json({roomUrl: resData.roomUrl, hostUrl: resData.hostRoomUrl});



    } catch(error){
        console.error(error.message);
        res.status(500).json({message: error.message});
    }

})


app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
})