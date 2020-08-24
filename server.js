require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Url = require("./models/url");
const PORT = process.env.PORT || 4000;
const { nanoid } = require("nanoid");
app.use(express.json());
app.use(cors());



app.patch("/:slug", async (req, res, callback) => {
    const id = req.params.slug;

    try {
        Url.findOneAndUpdate({ slug: id }, { $inc: { views: 1 } }, { new: true }, function (err, response) {
            if (err) {
                callback(err);
            } else {
                callback(response);
            }
        });

    } catch (error) {
        console.log(error);
    }
});




app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));


mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established");
    }
);

app.use("/users", require("./routes/userRouter"));
app.use("/url", require("./routes/urlRouter"));