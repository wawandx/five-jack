function solution(record) {
    let input = record.join('').replace(/ /g, '');

    if (input.length > 100000) {
        return "error input record string must be 1 ~ 100.000"
    }

    const data = [];
    let answer = [];
    record.map((val, index) => {
        splitRecord = val.split(' ');
        const action = splitRecord[0];
        const uID = splitRecord[1];
        const nickName = splitRecord[2];

        if (action === 'Leave' && index == 0) {
            console.log('You must enter before Leave');
        } else if (action === 'Change' && index == 0) {
            console.log('You must enter before Change Name');
        } else if (action === 'Enter') {
            data.map(dataVal => {
                if (dataVal.uID === uID) {
                    dataVal.nickName = nickName
                }
            });
            data[index] = {
                action,
                uID,
                nickName 
            };
        } else if (action === 'Change') {
            data.map(dataVal => {
                if (dataVal.uID === uID) {
                    dataVal.nickName = nickName
                }
            });
        } else if (action == 'Leave') {
            data[index] = {
                action,
                uID,
                nickName 
            };
        }
        
        if (index == record.length-1) {
            answer = answerText(data);
        }
    })

    return(answer);
}

function answerText(data) {
    const answer = [];
    data.map((val) => {
        if (val.action === "Enter") {
            answer.push(`${val.nickName} came in.`);
        } else if (val.action === "Leave") {
            answer.push(`${val.nickName} has left.`);
        }
    })

    return answer;
}

const record = ["Enter uid1234 Muzi", "Enter uid4567 Prodo", "Leave uid1234", "Enter uid1234 Prodo", "Change uid4567 Ryan"];
console.log(solution(record))