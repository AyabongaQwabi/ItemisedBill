var assert =require('assert')
var filter =require('../filter')
describe('Itemised Bill',function(){
	
	describe('getCalls(calls_csv)',function(){
		it('should get all calls from csv',function(){
		    var callKeys = ['date','provider','number','duration']
			var calls = filter.getCalls('ItemisedBill.csv')
			var firstTwo =[calls[0],calls[1]]
			var call1 ={
							date:'01/10/2015',
							provider:'MTN',
							number:'0832401145',
							duration:'00h05m34s'
						}
			var call2 ={
							date:'01/10/2015',
							provider:'MTN',
							number:'0838758090',
							duration:'00h01m34s'
						}
			var test = [call1,call2]

			assert.equal(calls.length,35)
			assert.deepEqual(firstTwo,test)
		})
	});
	describe('getAllBy(calls_csv,provider)',function(){
		it('should get all calls from csv by specific provider',function(){
		    var callKeys = ['date','provider','number','duration']
		   
			var mtnCalls = filter.getAllBy('ItemisedBill.csv','MTN')
			var firstTwo =[mtnCalls[0],mtnCalls[1]]
			var call1 ={
							date:'01/10/2015',
							provider:'MTN',
							number:'0832401145',
							duration:'00h05m34s'
						};
			var call2 ={
							date:'01/10/2015',
							provider:'MTN',
							number:'0838758090',
							duration:'00h01m34s'
						};
						
			var test = [call1,call2];

			assert.equal(mtnCalls.length,16);
			assert.deepEqual(firstTwo,test);
		})
	});
	describe('getAllBy(calls_csv ,number)',function(){
		it('should get all calls to specific number',function(){
		  
			var numberCalls = filter.getAllBy('ItemisedBill.csv','0832401145')
			var firstTwo =[numberCalls[0],numberCalls[1]]
			var call1 ={
							date:'01/10/2015',
							provider:'MTN',
							number:'0832401145',
							duration:'00h05m34s'
						};
			var call2 ={
							date:'03/10/2015',
							provider:'MTN',
							number:'0832401145',
							duration:'00h06m34s'
						};
			var test = [call1,call2];

			assert.equal(numberCalls.length,5);
			assert.deepEqual(firstTwo,test);
		})
	});
	describe('howManyCalls(calls_csv)',function(){
		it('should get total number of calls',function(){
		    			
			assert.equal(filter.howManyCalls('ItemisedBill.csv'),35);
			
		})
	});
	describe('howManyCalls(calls_csv,provider)',function(){
		it('should get total number of calls by provider',function(){
		    			
			assert.equal(filter.howManyCalls('ItemisedBill.csv','MTN'),16);
			
		})
	});
	
	describe('getTotal(calls,csv)',function(){
		it('should get total number of calls for each provider',function(){
		    var callKeys = ['date','provider','number','duration']
		    var calls = filter.getCalls('ItemisedBill.csv')
			var totals = filter.getTotal('calls',calls)
			
			var _totals ={
							'MTN':16,
							'CellC':11,
							'Vodacom':8,
							
						};
		
			assert.deepEqual(totals,_totals);
		})
		it('should get total duration of calls made to each provider',function(){
		    var callKeys = ['date','provider','number','duration']
		    var calls = filter.getCalls('ItemisedBill.csv')
			var totals = filter.getTotal('duration',calls)
			
			var _totals ={
							'MTN':'01h25m14s',
							'CellC':'00h15m34s',
							'Vodacom':'02h45m34s',
							
						};
		
			assert.deepEqual(totals,_totals);
		})
	});
});