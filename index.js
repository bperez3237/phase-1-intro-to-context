// Your code here


function createEmployeeRecord(timeCard) {
    const record = {}
    record['f']
    record['firstName'] = timeCard[0]
    record['familyName'] = timeCard[1]
    record['title'] = timeCard[2]
    record['payPerHour'] = timeCard[3]
    record['timeInEvents'] = []
    record['timeOutEvents'] = []

    return record
}

function createEmployeeRecords(nestedArray){
    let objArray = nestedArray.map(array => createEmployeeRecord(array))

    return objArray
}

function createTimeInEvent(recordObj, date) {
    let obj = {}
    obj['type'] = 'TimeIn'
    obj['date'] = date.slice(0,10)
    obj['hour'] = parseInt(date.slice(11))
    recordObj['timeInEvents'].push(obj)
    return recordObj
}

function createTimeOutEvent(recordObj, date){
    let obj = {}
    obj['type'] = 'TimeOut'
    obj['date'] = date.slice(0,10)
    obj['hour'] = parseInt(date.slice(11))
    recordObj['timeOutEvents'].push(obj)
    return recordObj
}

function hoursWorkedOnDate(recordObj, date) {
    let hourIn;
    recordObj['timeInEvents'].forEach(event => {
        if (event['date'] === date) {
            hourIn = event['hour']
        }
    })
    let hourOut;
    recordObj['timeOutEvents'].forEach(event => {
        if (event['date'] === date) {
            hourOut = event['hour']
        }
    })
    return  (hourOut - hourIn)/100
}

function wagesEarnedOnDate(recordObj, date){
    return recordObj['payPerHour']*hoursWorkedOnDate(recordObj,date)
}

function allWagesFor(recordObj) {
    let dates = []
    recordObj['timeInEvents'].forEach(event => {
        dates.push(event['date'])
    })

    const initialValue = 0;
    let wages = dates.map(date => wagesEarnedOnDate(recordObj,date))

    let accum = 0;
    wages.forEach(wage => accum += wage)
    return accum


}

function calculatePayroll(recordArray) {
    let payroll = 0;
    recordArray.forEach(recordObj => {
        payroll += allWagesFor(recordObj)
    })
    return payroll
    
}


