import RESULTS from './results/test.js';


function streakStats(multi){
    let winStreakRecord = 0;
    let loseStreakRecord = 0;
    let currentWinStreak = 0;
    let currentLoseStreak = 0;
    

    let winLose = RESULTS.map(
        function(num){
            if(num >= multi){
                1;
            } else {
                 0;
            }
        }
    )

    for (let i = 0; i < winLose.length; i++) {
        const number = winLose[i];
        number == 1 ? (currentWinStreak ++) && (currentLoseStreak = 0) : (currentLoseStreak ++)&&(currentWinStreak = 0)  ;

        if(currentWinStreak > winStreakRecord){
            winStreakRecord = currentWinStreak;
        }

        if(currentLoseStreak > loseStreakRecord){
            loseStreakRecord = currentLoseStreak;
        }
        
    }
    const streaks ={
        'Longest Winning Streak': winStreakRecord,
        'Longest Losing Streak': loseStreakRecord
    }
    return streaks;
    
    
}

console.log(RESULTS.length)


// console.log(streakStats(8));
