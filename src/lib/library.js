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
  var startOfWeek = new Date()
  var endOfWeek = addDays(startOfWeek, 6)
  var week = getDates(startOfWeek, endOfWeek)
  return convertToAppDates(week)
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
  return weekArray
}

function convertToStdDates(dates) {
  return dates.map((date) => new Date(date))
}

function convertToAppDates(stdDates) {
  return stdDates.map((stdDate) => {
    return `${months[stdDate.getMonth()]} ${stdDate.getDate()}, ${stdDate.getFullYear()}`
  })
}

export { getPreviousNextWeek, getDates, convertToStdDates, convertToAppDates, getInitDate }