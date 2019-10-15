const mongoose = require('mongoose');
const dotenv = require('dotenv').config();


module.exports = () => {
    function connect() {

        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(()=>console.log('DB Connected!'))
        .catch(err=>{
            console.log('DB connection error: {$err.message}');
        });

    }
    connect();
    // 연결 해제되면 다시 연결함
    mongoose.connection.on('disconnected', connect);
    require('./Model/User.js');
    require('./Model/post.js');
};