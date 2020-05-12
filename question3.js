function solution(relation) {
    //Limitation
    if (relation.length > 20) {
        return "Error the length of the row relation must be 1 ~ 20"
    }

    for(let i=0; i < relation.length; i++) {   
        if(relation[i].length > 8) {
            return "Error the length of the relation column must be 1 ~ 8"
        } 
        for(let j=0; j < relation[i].length; j++) {
            if(relation[i][j].length > 8) {  
                return "Error the length of all strings in relation must be 1 ~ 8"
            }    
        }
    }

    let data = [];
    let check = [];
    let concatData = [];
    for(let i = 0; i < relation[0].length; i++) {
        check[i] = false;
        for(let j = 0; j < relation.length; j++) {
            for(let k = 0; k < relation.length; k++) {
                if(j != k) {
                    if (relation[j][i] == relation[k][i]) {
                        check[i] = true;
                        concatData[i] = checkJoinArray(relation, i);
                    }
                }
            }
        }
        if (!check[i]) {
            data.push({
                unique : `unique key in column array [${i}]`
            });
        }
    }

    const mergeData = [];
    let uniqueMergeData = [];
    concatData.map(val => {
        val.map(valArray => {
            mergeData.push(valArray);
        })
    })

    //FILTER merge data to Unique data
    for(let i = 0; i < mergeData.length; i++) {
        let count = 0;
        for(let j = i; j < mergeData.length; j++) {
            if(i != j) {
                if(mergeData[i].data == mergeData[j].data) {
                    count++;
                }
            }
        }
        if (count>0) {
            uniqueMergeData = mergeData.filter((val) => {
                return (val.key != mergeData[i].key && val.joinKey != mergeData[i].joinKey)
            })
        }
    }

    //GROUPING DATA
    var helper = {};
    var result = uniqueMergeData.reduce(function(r, o) {
        var key = o.key + '-' + o.joinKey;
        
        if(!helper[key]) {
            helper[key] = Object.assign({}, o); // create a copy of o
            r.push(helper[key]);
        } else {
            helper[key].data += o.data + ', ';
        }

        return r;
    }, []);

    result.map(val => {
        data.push({
            unique : `unique key in column array [${val.key}][${val.joinKey}]`
        })
    })

    return {
        count: data.length,
        data
    };
}

function checkJoinArray(relation, index){
    let concatData = [];
    for(let j = 0; j < relation[0].length; j++) {
        if (j > index-1 && j != index) {
            for(let i = 0; i < relation.length; i++) {
                concatData.push({
                    key: index,
                    joinKey : j,
                    data: relation[i][index].concat(relation[i][j])
                });
            }
        }
    }
    return concatData;
}

const relation = [ 
    ["100", "ryan", "music", "2"], 
    ["200", "apeach", "math", "2"], 
    ["300", "tube", "computer", "3"], 
    ["400", "con", "computer", "4"], 
    ["500", "muzi", "music", "3"], 
    ["600", "apeach", "music", "2"],
    ["700", "raka", "computer", "2"],
];
console.log(solution(relation));