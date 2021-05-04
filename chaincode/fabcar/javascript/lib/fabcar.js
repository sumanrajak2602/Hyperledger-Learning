/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx){
        let datatostore={
            Id:'1',
            Name:'suman',
            Color:'blue',
            TimeStamp:'1234567'
            };

     
         await ctx.stub.putState('1',Buffer.from(JSON.stringify(datatostore))); 
         return "success";
    }

    async writeData(ctx,id, name,color){
        let datatostore={
            Id: id,
            Name:name,
            Color: color,
            TimeStamp:''
            };

            datatostore.TimeStamp = Date.now();
     
         await ctx.stub.putState(id,Buffer.from(JSON.stringify(datatostore))); 
         return "success";
    }

    async readData(ctx,id){
       
        let dataAsBytes = await ctx.stub.getState(id); 
        if (!dataAsBytes || dataAsBytes.toString().length <= 0) {
          throw new Error('Data with this Id does not exist: ');
           }
          let actualdata=JSON.parse(dataAsBytes.toString());
          
          return JSON.stringify(actualdata);
    }


    

}

module.exports = FabCar;
