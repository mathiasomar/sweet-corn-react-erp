const mongoose = require('mongoose');

const connectDB = async (uri) => {
    await mongoose.connect(uri)
        .then(() => console.log("Connected to mongoDB.."))
        .catch((err) => console.log(err))
}

module.exports = connectDB