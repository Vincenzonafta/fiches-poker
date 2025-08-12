const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*"
    }
});

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Stato iniziale delle chips
let players = [
    { name: "Giocatore 1", chips: 1000 },
    { name: "Giocatore 2", chips: 1000 },
    { name: "Giocatore 3", chips: 1000 },
    { name: "Giocatore 4", chips: 1000 }
];

io.on("connection", (socket) => {
    console.log("Nuovo giocatore collegato");
    socket.emit("state", players);

    socket.on("changeChips", (data) => {
        players[data.index].chips += data.amount;
        if (players[data.index].chips < 0) players[data.index].chips = 0;
        io.emit("state", players);
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server in ascolto su porta ${PORT}`);
});
