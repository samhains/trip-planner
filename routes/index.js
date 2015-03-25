var router = require('express').Router();
var models = require('../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var ThingToDo = models.ThingToDo;

router.get('/',function(req,res,next){
	var obj = {hotels:["Andaz Wall Street"],restaurants:["Cafe Katya","Jungsik"],thingsToDo:["Ground Zero"]};
	var promise  = Hotel.find({}).exec();

	promise
	.then(function(hotels){
		obj.all_hotels = hotels;
		return Restaurant.find({}).exec();})
	.then(function(restaurants){
		obj.all_restaurants = restaurants;
		return ThingToDo.find({}).exec();})
	.then(function(things){
		obj.all_things_to_do = things;
		res.render('index', obj);
	});

});

module.exports = router;