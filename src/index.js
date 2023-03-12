const { log } = require("console");
const express = require("express");
const routerProducts = require("./routes/productsRouter");
const routerCarts = require("./routes/cartsRouter");
// const routerChat = require("./routes/chatRouter")
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const { mongoDBconnection } = require("./dataBase/mongo.config");
const path = require("path")

const PORT = 5000;
const BASE = "api/v1"
const app = express();

const connectToBBDD = async () => {
    await mongoDBconnection()
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToBBDD()

// HANDLEBARS CONFIGURACION
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");

app.use(express.static(`${__dirname}/public`));

// app.get("/", (req, res) => {
//     // res.send("hola")
//     res.render("chat", {productos : [1,2,3]})
// })

app.use(`/${BASE}/products`, routerProducts)
app.use(`/${BASE}/carts` , routerCarts)
// app.use(`/${BASE}/chat`, routerChat)

const server = app.listen(PORT, () => {
    console.log(`API run port ${PORT}`);
})

const ChatManager = require("./services/chatServices")

const manager = new ChatManager;

app.get("/api/v1/chat", async (req, res) => {
    const messages = await manager.getMessages()
    console.log("messages -->", messages);
    res.render("chat")
})

const io = new Server(server)

io.on("connection", async (socket) => {
    console.log("New client is connect");
    // socket.on("message", (data) => {
    //     console.log(data);
    // })

})