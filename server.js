const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    const about = {
        avatar_Url: "https://avatars1.githubusercontent.com/u/53801283?s=460&v=4",
        name: "Diego da Vitória",
        role: "Estudante - LaunchBase-RocketSeat",
        description: "Estudante Analise e Desenvolvimento de Sistemas 2º Periodo - Programador Web-Developer",
        links: [
            { url: "https://github.com/diego-davitoria", cod: "fab fa-github-square" },
            { url: "https://github.com/diego-davitoria", cod: "fab fa-twitter-square" },
            { url: "https://linkedin.com/in/diego-da-vitoria", cod: "fab fa-linkedin" },
            { url: "http://api.whatsapp.com/send?1=pt_BR&phone=5527997511889/", cod: "fab fa-whatsapp-square" }
        ]
    }


    return res.render("about", { about: about})
})

server.get("/projetos", function(req, res) {
    return res.render("projetos", { items: videos })
})

server.get("/video", function(req, res){
    const id = req.query.id
    
    const video = videos.find(function(video){
            return video.id == id
    })
        if (!video) {
            return res.send("video not found - ERRO 0800")
        }

    return res.render("video", {item: video} )
})

server.listen(5500, function() {
    console.log("server is running")
})