function addDays(date, days) {
  var dat = new Date(date)
  dat.setDate(dat.getDate() + days);
  return dat
}

function subtractDays(date, days) {
  var dat = new Date(date)
  dat.setDate(dat.getDate() - days);
  return dat
}

var months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

function getInitDate() {
  var startOfWeek = getMondayOftheWeek()
  var endOfWeek = addDays(startOfWeek, 6)
  var week = getDates(startOfWeek, endOfWeek)
  return convertToAppDates(week)
}

function getInitTimes(start, end) {
  var startTime = start.split(' ')
  var endTime = end.split(' ')
  if(startTime[1] === "pm" && startTime[0]<12) start = Number(startTime[0])+12
  else if(startTime[1] === "am" && startTime[0]===12) start = Number(startTime[0])-12
  else start = Number(startTime[0])
  if(endTime[1] === "pm" && endTime[0]<12) end = Number(endTime[0])+12
  else if(endTime[1] === "am" && endTime[0]===12) end = Number(endTime[0])-12
  else end = Number(endTime[0])
  var times = []
  while(start <= end) {
    times.push(start)
    start++
  }
  return times
}

function getMondayOftheWeek() {
  var date = new Date();
  var day = date.getDay()
  var diff = date.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
  return new Date(date.setDate(diff));
}

function getDates(startDate, stopDate) {
 var dateArray = []
 var currentDate = startDate;
 while (currentDate <= stopDate) {
   dateArray.push(currentDate)
   currentDate = addDays(currentDate, 1);
 }
 return dateArray
}

function getPreviousNextWeek(date, next) {
  var weekArray = []
  var count = 1
  while (count <= 7) {    
    if(next) {
      var newdate = addDays(date, count)
    }
    else {
      newdate = subtractDays(date, count)
    }
    weekArray.push(newdate)
    count += 1
  }
  if(next === false) weekArray.reverse()
  return weekArray
}

function getPreviousNextDay(date, next) {
  if(next) {
    var newdate = addDays(date, 1)
  }
  else {
    newdate = subtractDays(date, 1)
  }
  return newdate
}

function convertToStdDates(dates) {
  return dates.map((date) => new Date(date))
}

function convertToAppDates(stdDates) {
  return stdDates.map((stdDate) => {
    return `${months[stdDate.getMonth()]} ${stdDate.getDate()}, ${stdDate.getFullYear()}`
  })
}

function fillCurrentTimes(dates, times) {
  let table = []
  let mobileTable = []
  let today = convertToAppDates([new Date()])
  let timewindows = []
  times.forEach(time => {
    timewindows.push(`${time}:00`)
    timewindows.push(`${time}:15`)
    timewindows.push(`${time}:30`)
    timewindows.push(`${time}:45`)
  })
  timewindows.forEach(time => {
    var row = {}
    dates.forEach(date => {
      row[`${date} ${time}`] = false
    })
    table.push(row)
    mobileTable.push(`${today[0]} ${time}`)
  })
  return [table, mobileTable]
}

function resetSelection(table) {
  table.map(row => {
    for(var key in row) {
      row[key] = false
    }
    return row
  })
  return table
}

export { getPreviousNextWeek,
         getPreviousNextDay,
         getDates,
         convertToStdDates,
         convertToAppDates,
         getInitDate,
         getInitTimes,
         getMondayOftheWeek,
         fillCurrentTimes,
         resetSelection }