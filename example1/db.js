const mongoose = require('mongoose');

module.exports = () => {
    function connect() {
        mongoose.connect('localhost:27017', function(err){
            if(err){
                console.error('mongodb connection error',err);
            }
            console.log('mongodb connected');
        });
    }
    connect();
    // 연결 해제되면 다시 연결함
    mongoose.connection.on('disconnected', connect);
    require('./user.js');
};