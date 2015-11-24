var express = require('express')
var filter =  require('./filter')
var app = express();
var handlebars = require('express-handlebars')

app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine','handlebars')
app.get('/bill',function(req,res){

	var calls = filter.getCalls('./ItemisedBill.csv')
	var providers = filter.getProviders('ItemisedBill.csv')
	var totals = filter.getTotal('duration',calls)
	console.log(providers)
	res.render('bill',{
		calls:calls,
		providers:providers,
		totals:totals
	})

})
app.get('/',function(req,res){
	res.redirect('/bill')
})

app.listen(1111)