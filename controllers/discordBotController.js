const asyncHandler = require('express-async-handler')


const PostReview = asyncHandler(async (req,res) => {
    
    const {
        psId, 
        vocal,
        fileName,
    } = req.body

    const payload = {vocal,psId, fileName}

    const response = await fetch("http://us1.bot-hosting.net:20663", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    // Vérifier si la réponse est OK
    if (response.ok) {
        // Extraire l'URL du contenu de la réponse
        const responseData = await response.json();
        const url = responseData.url;

        // Renvoyer l'URL comme réponse de votre backend

        return res.status(201).json(url);
        
    } else {
        // Si une erreur se produit, renvoyer le message d'erreur
        const errorMessage = await response.text();
        return res.status(response.status).json({ message: errorMessage });
    }
})  



module.exports = {
    PostReview,
}