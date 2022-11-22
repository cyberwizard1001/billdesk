const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/pc-picker', (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + JSON.stringify(err,undefined,2)); }
});



module.exports = mongoose;

