import crypto from 'crypto';
import fs from 'fs';
import { stdout } from 'process';

//========================================================
//set the server seed, must be in quotes
let serverSeed = '<YOUR SERVER SEED>';  

// set the client seed, must be in quotes
let clientSeed = '<YOUR CLIENT SEED>';

// set first nonce, 0 for new seed
let firstNonce = 0; 

// set final nonce - the number of bets calculated will be (final nonce - first nonce).  More bets = more time to execute.
let finalNonce = 1000000; 

//Add or remove any targets within the brackets, seperated by commas.  More targets = more time to execute.
let targets = [1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];


// changing anything below this line might break something
//========================================================

let resultByTarget = [];

const betCount = finalNonce - firstNonce;
let nonces = Array.from({length: betCount}, (v, k) => k+1); 

for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    
}

function winLossAmount(multiplier, numberOfHits){
    return (numberOfHits * multiplier) - betCount
  }
 
  function hitRate(hitCount, sampleSize){
      return ((hitCount / sampleSize) * 100) + '%'
  }


class Target {
    constructor(target, hits, attempts){
        this.target = target;
        this.hits = hits;
        this.attempts = attempts; 
        this.expectedHitRate = parseFloat((((100/target) * 0.99) / 100).toFixed(7));
        this.hitRate = parseFloat((hits / attempts).toFixed(7));
        this.expectedHits = parseFloat((this.expectedHitRate * attempts).toFixed(7));
        this.expectedHitsVsHits = parseFloat((hits - this.expectedHits).toFixed(7));
        this.expectedHitRateVsHitRate = parseFloat((this.hitRate - this.expectedHitRate).toFixed(7));
        this.winLossAmount = (target * hits) - attempts;
    }
}



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
    for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        let hits = 0;

        for (let i = 0; i < nonces.length; i++) {
            const nonce = nonces[i];
            let currentResult = getLimboResult(serverSeed, clientSeed, nonce);
            results.push(currentResult);
            if(currentResult >= target){
                hits += 1;
            };
        };
        let currentTarget = new Target(target, hits, betCount);
        resultByTarget.push(currentTarget);
    }

    fs.writeFile("results/results.json", JSON.stringify(results), err => {
        if (err) {
            throw err;
        }
        console.log('Each rolled number has been saved to \'./results.json\' . Running this program again will ovewrite the file. ')
    })
  return resultByTarget;
}

let summary = [
  {'Server Seed': serverSeed, 'Player Seed': clientSeed, 'Sample Size': betCount},
]
console.time('time to execute')
console.table(summary);
console.log('Simulating Limbo Bets...')
console.table(simulateBets())
console.timeEnd('time to execute')







