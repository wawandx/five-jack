function solution(n, users) {
    //Limitation
    if (n < 1 || n > 500) {
        return "error input total Stages must be 1 ~ 500";
    }

    let input = users.join('').replace(/ /g, '');
    if (input.length == 0 || input.length > 200000) {
        return "error input total Users must be 1 ~ 200,000"
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i] < 1 || users[i] > n+1) {
            return `error input last Stages must be 1 ~ ${n+1}`;
        }
    }

    //N = total stages
    //users = array users dimana tiap array berisi stages terakhir yang diselesaikan tiap users
    //answer = banyaknya stages gagal diurutkan descending
    let stages = [];
    let answer = [];
    let totalUsers = users.length;
    let arrayFailedRate = [];
    for (let i = 1; i < n+1; i++) {
        const result = users.filter(user => user == i); //mencari banyaknya stages yang diselesaikan berdasarkan stages
        stages.push(result.length)
        if (i == n) {
            arrayFailedRate = failedRate(stages, totalUsers)
        }
    }

    let swap;
    do {
        swap = false;
        for (let i = 0; i < arrayFailedRate.length-1; i++) {
            if (arrayFailedRate[i].rate < arrayFailedRate[i+1].rate) {
                var log = arrayFailedRate[i];
                arrayFailedRate[i] =   arrayFailedRate[i+1];
                arrayFailedRate[i+1] = log;
                swap = true;
            }
        }
    } while (swap)

    arrayFailedRate.map(rate => {
        answer.push(rate.stage);
    })
    return answer;
}

function failedRate(stages, totalUsers) {
    let temp = [];
    let total = totalUsers;
    for (let i = 0; i < stages.length; i++) {
        temp.push({
            stage: i+1,
            rate: stages[i]/total
        });
        total = total - stages[i]; 
    }

    return temp;
}

console.log(solution(5, [2,1,2,6,2,4,3,3]))
console.log(solution(4, [4,4,4,4,4]))