// const express = require("express");
// const PORT = 7777;
// const connectDB = require("./config/database");
// const authRouter = require("./routes/auth");
// const profileRouter = require("./routes/profile");
// const requestRouter = require("./routes/request");
// const userRouter = require("./routes/user");
// const User = require("./models/user");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const { app, server } = require("./lib/socket");
// const messageRoutes = require("./routes/message.route");
// const { userAuth } = require("./middlewares/auth");

// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     credentials: true,
// }));

// // Explicitly handle OPTIONS requests for all routes
// // app.options("*", cors({
// //     origin: "http://localhost:5173",
// //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
// //     credentials: true,
// // }));
// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   }));
  

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use((req, res, next) => {
//     console.log("hello devs");
//     next();
// });

// app.use("/", authRouter);
// app.use("/", profileRouter);
// app.use("/", requestRouter);
// app.use("/", userRouter);
// app.use("/messages", userAuth, messageRoutes);

// app.get("/", (req, res) => {
//     res.send("this is home page");
// });

// app.get("/users", async (req, res) => {
//     try {
//         const users = await User.find({});
//         if (users.length === 0)
//             res.status(400).json("no user found");
//         else res.send(users);
//     } catch (err) {
//         res.status(400).send("ERROR: " + err);
//     }
// });

// app.get("/user", async (req, res) => {
//     try {
//         const userEmail = req.body.emailId;
//         if (!userEmail) return res.status(400).send("Email ID not provided");

//         const resultUser = await User.findOne({ emailId: userEmail }).lean();
//         if (resultUser) return res.json({ msg: resultUser });
//         else return res.status(404).send("User not found");
//     } catch (err) {
//         res.status(500).send("ERROR: " + err);
//     }
// });

// connectDB()
//   .then(() => {
//       console.log("database connected successfully");
//       server.listen(PORT, () => console.log("server started at " + PORT));
//   })
//   .catch((err) => {
//       console.log("database cannot connected");
//   });



const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { app, server } = require("./lib/socket");
const messageRoutes = require("./routes/message.route");
const { userAuth } = require("./middlewares/auth");

// Consolidated CORS configuration
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Ensure PATCH is included
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

// Explicitly handle OPTIONS requests for preflight checks
// app.options("*", cors(corsOptions));

app.options("*", (req, res) => {
    console.log("Preflight request received");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.send();
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log("hello devs");
    next();
});

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/messages", userAuth, messageRoutes);

app.get("/", (req, res) => {
    res.send("this is home page");
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0)
            res.status(400).json("no user found");
        else res.send(users);
    } catch (err) {
        res.status(400).send("ERROR: " + err);
    }
});

app.get("/user", async (req, res) => {
    try {
        const userEmail = req.body.emailId;
        if (!userEmail) return res.status(400).send("Email ID not provided");

        const resultUser = await User.findOne({ emailId: userEmail }).lean();
        if (resultUser) return res.json({ msg: resultUser });
        else return res.status(404).send("User not found");
    } catch (err) {
        res.status(500).send("ERROR: " + err);
    }
});

connectDB()
  .then(() => {
      console.log("database connected successfully");
      server.listen(process.env.PORT, () => console.log("server started at " + process.env.PORT));
  })
  .catch((err) => {
      console.log("database cannot connected");
  });
