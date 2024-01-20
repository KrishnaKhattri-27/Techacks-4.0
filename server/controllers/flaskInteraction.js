const fs = require("fs");

const flaskInteraction=(req,res)=>{
    const imageChunkBuffer = Buffer.from(receivedImageChunk, "base64");

    fs.appendFileSync("received_image1.png", imageChunkBuffer, "base64");

    console.log("Image chunk received and saved.");

    res.json({
        message: "Image chunk received on the server",
      });
}


module.exports=flaskInteraction;