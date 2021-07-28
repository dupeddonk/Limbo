import crypto from 'crypto';

//========================================================

let serverSeed = '';  //enter server seed, must be in quotes
let clientSeed = ''; // enter client seed, must be in quotes
let firstNonce = 0; // set first nonce, 0 for new seed
let finalNonce = 1000000; // set final nonce - the number of bets calculated will be (final nonce - first nonce)

//========================================================


const betCount = finalNonce - firstNonce;
let nonces = Array.from({length: betCount}, (v, k) => k+1); 


function getLimboResult(serverSeed, clientSeed, nonce){
        const hmac = crypto.createHmac('sha256', `${serverSeed}`);
      hmac.update(`${clientSeed}:${nonce}:0`);
      const buffer = hmac.digest();
      const bytes = [];
      for (let i = 0; i < 5; i++) {
        const el = buffer[i];
        bytes.push(el);
      }
      const floats = [];
      floats.push(bytes[0] / 256);
      floats.push(bytes[1] / (256 ** 2));
      floats.push(bytes[2] / (256 ** 3));
      floats.push(bytes[3] / (256 ** 4));

      const float = Math.floor((floats.reduce((a, b) => a + b, 0)) * 100000000);
      const result = 100000000 / (float + 1) * (1 - 0.01);
      const finalResult = Math.floor(result * 100) / 100;
      
      return finalResult;
}

function simulateBets(){
  let results = []
  let one = 0;
  let multi1point01 = 0;
  let multi1point5 = 0;
  let multi2 = 0;
  let multi4 = 0;
  let multi5 = 0;
  let multi10 = 0;
  let multi100 = 0;
  let multi1000 = 0;
  let multi10000 = 0;
  let multi100000 = 0;
  let multi500000 = 0;
  let multi750000 = 0;
  let multi900000 = 0;
  let multi999999 = 0;

  for (let i = 0; i < nonces.length; i++) {

    const nonce = nonces[i];
    let currentResult = getLimboResult(serverSeed, clientSeed, nonce)

    results.push(currentResult);
    if (currentResult > 999999){
      multi999999 += 1;
      multi900000 += 1;
      multi750000 += 1;
      multi500000 += 1;
      multi100000 += 1;
      multi10000 += 1;
      multi1000 += 1;
      multi100 += 1;
      multi10 += 1;
      multi5 += 1;
      multi4 += 1;
      multi2 +=1;
      multi1point5 += 1;
      multi1point01 += 1;
    }
    
    else if (currentResult > 900000){
      multi900000 += 1;
      multi750000 += 1;
      multi500000 += 1;
      multi100000 += 1;
      multi10000 += 1;
      multi1000 += 1;
      multi100 += 1;
      multi10 += 1;
      multi5 += 1;
      multi4 += 1;
      multi2 +=1;
      multi1point5 += 1;
      multi1point01 += 1;
    }

    else if (currentResult > 750000){
      multi750000 += 1;
      multi500000 += 1;
      multi100000 += 1;
      multi10000 += 1;
      multi1000 += 1;
      multi100 += 1;
      multi10 += 1;
      multi5 += 1;
      multi4 += 1;
      multi2 +=1;
      multi1point5 += 1;
      multi1point01 += 1;
    }
    else if (currentResult > 500000){
      multi500000 += 1;
      multi100000 += 1;
      multi10000 += 1;
      multi1000 += 1;
      multi100 += 1;
      multi10 += 1;
      multi5 += 1;
      multi4 += 1;
      multi2 +=1;
      multi1point5 += 1;
      multi1point01 += 1;
    }
    
    else if (currentResult > 100000){
      multi100000 += 1;
      multi10000 += 1;
      multi1000 += 1;
      multi100 += 1;
      multi10 += 1;
      multi5 += 1;
      multi4 += 1;
      multi2 +=1;
      multi1point5 += 1;
      multi1point01 += 1;
    }
    
    else if (currentResult > 10000){
      multi10000 += 1;
      multi1000 += 1;
      multi100 += 1;
      multi10 += 1;
      multi5 += 1;
      multi4 += 1;
      multi2 +=1;
      multi1point5 += 1;
      multi1point01 += 1;
    }
    
    else if (currentResult > 1000){
      multi1000 += 1;
      multi100 += 1;
      multi10 += 1;
      multi5 += 1;
      multi4 += 1;
      multi2 +=1;
      multi1point5 += 1;
      multi1point01 += 1;
    } else if (currentResult > 100){
      multi100 += 1;
      multi10 += 1;
      multi5 += 1;
      multi4 += 1;
      multi2 +=1;
      multi1point5 += 1;
      multi1point01 += 1;
    } else if (currentResult > 10){
        multi10 += 1;
        multi5 += 1;
        multi4 += 1;
        multi2 +=1;
        multi1point5 += 1;
        multi1point01 += 1;
    } else if (currentResult > 5){
        multi5 += 1;
        multi4 += 1;
        multi2 += 1;
        multi1point5 += 1
        multi1point01 += 1;
    } else if
    
    
    (currentResult > 4){
        multi4 += 1;
        multi2 += 1;
        multi1point5 += 1
        multi1point01 += 1;
    } else if (currentResult > 2){
        multi2 +=1;
        multi1point5 += 1
        multi1point01 += 1;
    }
    
    else if (currentResult > 1.5){
      multi1point5 += 1
      multi1point01 += 1;
    } else if (currentResult > 1.01){
      multi1point01 += 1;
    } else {
      one += 1;
    }
    
    
  }

 function winLossAmount(multiplier, numberOfHits){
   return (numberOfHits * multiplier) - betCount
 }

 function hitRate(hitCount, sampleSize){
     return ((hitCount / sampleSize) * 100) + '%'
 }

 const average = (results.reduce((a, b) => a + b, 0)) / results.length
 let toDollars = Intl.NumberFormat('en-US',{
    style: "currency",
    currency: "USD",
});
  const resultByMultiplier = [
   
    ['999,999x', multi999999, toDollars.format(winLossAmount(999999, multi999999)), hitRate(multi999999, betCount)], 
    ['900,000x', multi900000, toDollars.format(winLossAmount(900000, multi900000)), hitRate(multi900000, betCount)], 
    ['750,000x', multi750000, toDollars.format(winLossAmount(750000, multi750000)), hitRate(multi750000, betCount)], 
    ['500,000x', multi500000, toDollars.format(winLossAmount(500000, multi500000)), hitRate(multi500000, betCount)], 
    ['100,000x', multi100000, toDollars.format(winLossAmount(100000, multi100000)), hitRate(multi100000, betCount)], 
    ['10,000x', multi10000, toDollars.format(winLossAmount(10000, multi10000)), hitRate(multi10000, betCount)],
    ['1,000x', multi1000, toDollars.format(winLossAmount(1000, multi1000)), hitRate(multi1000, betCount)], 
    ['100x', multi100, toDollars.format(winLossAmount(100, multi100)), hitRate(multi100, betCount)], 
    ['10x', multi10, toDollars.format(winLossAmount(10, multi10)), hitRate(multi10, betCount)],
    ['5x', multi5, toDollars.format(winLossAmount(5, multi5)), hitRate(multi5, betCount)],

    ['4x', multi4, toDollars.format(winLossAmount(4, multi4)), hitRate(multi4, betCount)],
    ['2x', multi2, toDollars.format(winLossAmount(2, multi2)), hitRate(multi2, betCount)],
    ['1.5x', multi1point5, toDollars.format(winLossAmount(1.5, multi1point5)), hitRate(multi1point5, betCount)], 
    ['1.01x', multi1point01, toDollars.format(winLossAmount(1.01, multi1point01)), hitRate(multi1point01, betCount)], 
    ['1.0 (loss)', one, 'XXX']];
    
    console.log('Server Seed: ' + serverSeed);
    console.log('Client Seed: ' + clientSeed);
    console.log('Starting Nonce: ' + firstNonce);
    console.log('Number of Bets: ' + betCount);
    console.log('Amount of each bet: $1')
    console.log('Theoretical Expected Loss: ' + toDollars.format((betCount * 0.01)));
    console.log('| index | target multiplier | wins | win/loss amount |')
  console.table(resultByMultiplier);

  return results;
}
console.time('time to execute')
simulateBets();
console.timeEnd('time to execute')




