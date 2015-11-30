var files = require('fs')
exports.getCalls = function(csv){
	var calls=[]
	csv = files.readFileSync(csv,'utf8')
		   .split('\r')
	           .slice(1)   
		   .forEach(function(call){
			    	if(call){calls.push({date:call.split(',')[0],provider:call.split(',')[1],number:call.split(',')[2],duration:call.split(',')[3]})}
	            })

	return calls;
}
exports.howManyCalls = function(csv,query){
	var calls=[]
	csv = files.readFileSync(csv,'utf8')
	           .split('\r')
	           .slice(1)   
	           .forEach(function(call){			   	    
			    	if(!query ){
			    		if(call){
			    			calls.push({date:call.split(',')[0],provider:call.split(',')[1],number:call.split(',')[2],duration:call.split(',')[3]})
			    		}
			    	}
			        else if(call.split(',')[0] == query || call.split(',')[1] ==query || call.split(',')[2]==query || call.split(',')[3]==query){
			        	calls.push({date:call.split(',')[0],provider:call.split(',')[1],number:call.split(',')[2],duration:call.split(',')[3]})
			        }
	           })
    
	return calls.length;
}
exports.getAllBy = function(csv,query){
	var calls=[]
	csv = files.readFileSync(csv,'utf8')
	           .split('\r')
	           .slice(1)   
		   .forEach(function(call){
			    	if(!query ){
			    		if(call){
			    			calls.push({date:call.split(',')[0],provider:call.split(',')[1],number:call.split(',')[2],duration:call.split(',')[3]})
			    		}
			    	}
			        else if(call.split(',')[0] == query || call.split(',')[1] ==query || call.split(',')[2]==query || call.split(',')[3]==query){
			        	calls.push({date:call.split(',')[0],provider:call.split(',')[1],number:call.split(',')[2],duration:call.split(',')[3]})
			        }
	           })

	return calls;
}
exports.getTotal =function(query,calls){	
	switch(query){
		case 'duration':		    
		    var totals={};						
			calls.forEach(function(call){
				if(totals[call.provider]==undefined){
					totals[call.provider]={
								name:call.provider,
								duration:call.duration
							      }			
				}
				else{
					totals[call.provider].duration = addDuration(totals[call.provider].duration,call.duration);
				}
			})
			var providers=[]
			for(var key in totals){
				providers.push(totals[key])
			}
			console.log(providers)
			return providers;
			break;
		default:
			var totals={};						
			calls.forEach(function(call){
				if(totals[call.provider]==undefined){
					totals[call.provider]={
											name:call.provider,
											callsmade:1
										  }		
				}
				else{
					totals[call.provider].callsmade +=1;
				}
			})
			var providers=[]
			for(var key in totals){
				providers.push(totals[key])
			}
			console.log(providers)
			return providers;
			break;
		
	}
}
exports.getProviders = function(csv){
	var calls=[]
	var totals={}
	csv = files.readFileSync(csv,'utf8')
		   .split('\r')
	           .slice(1)   
	           .forEach(function(call){
			    	if(call){calls.push({date:call.split(',')[0],provider:call.split(',')[1],number:call.split(',')[2],duration:call.split(',')[3]})}
	            })

	calls.forEach(function(call){
				if(totals[call.provider]==undefined){

					totals[call.provider]={
											name:call.provider,
											calls:[]
										  }
					totals[call.provider].calls.push(call);

				}
				else{
					totals[call.provider].calls.push(call);
				}
			})
	var providers=[]
	for(var key in totals){
		totals[key].total=totals[key].calls.length
		providers.push(totals[key])
	}
	//console.log(providers)
	return providers;
}


function addDuration(dur1,dur2){
	
    var newDur ={hours:0,mins:0,secs:0}
    dur1 = {hours:dur1.substring(0,2),mins:dur1.substring(3,5),secs:dur1.substring(6,8)}
    dur2 = {hours:dur2.substring(0,2),mins:dur2.substring(3,5),secs:dur2.substring(6,8)}
    newDur.secs  = parseInt(dur1.secs)+parseInt(dur2.secs),
    newDur.mins  = parseInt(dur1.mins)+parseInt(dur2.mins),
    newDur.hours = parseInt(dur1.hours)+parseInt(dur2.hours);
    
    while( newDur.secs>=60){
    	newDur.mins+=1;
    	newDur.secs-=60;
    }
    while(newDur.mins>=60){
    	newDur.hours+=1;
    	newDur.mins-=60;
    }

    if(newDur.hours.toString().length==1){
    	newDur.hours='0'+newDur.hours.toString();
    }
    if(newDur.mins.toString().length==1){
    	newDur.mins='0'+newDur.mins.toString();
    }
    if(newDur.secs.toString().length==1){
    	newDur.secs='0'+newDur.secs.toString();
    }

	return newDur.hours+'h'+newDur.mins+'m'+newDur.secs+'s'
}
