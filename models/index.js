var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trip-planner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
});
//takes promises that mongo returns, and made them bluebird compatible

var placeSchema = new mongoose.Schema({
    address: String,
    city: String,
    state: String,
    phone: String,
    location: [Number]
});

var hotelSchema = new mongoose.Schema({
    name: String,
    place: [placeSchema],
    num_stars: {type: Number, min:1,max:5},
    amenities: {type: [String], get: function(arr){
    return arr.join(',');}}
});

var thingToDoSchema = new mongoose.Schema({

	name: String,
	place: [placeSchema],
	age_range: String
});

var restaurantSchema = new mongoose.Schema({
    name: String,
	place: String,
 	cuisine: [String],
	price: {type: Number, min:1,max:5},
});

var Place = mongoose.model('Place', placeSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var ThingToDo = mongoose.model('ThingToDo', thingToDoSchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
    Place: Place,
    Hotel: Hotel,
    ThingToDo: ThingToDo,
    Restaurant: Restaurant
}