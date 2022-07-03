import Moment from 'moment/moment';
function countDate(dateAgo: String) {
  const now = Moment().format('YYYY-MM-DD');
  dateNow = Moment(now)
  dateAgoBefore = Moment(dateAgo).format('YYYY-MM-DD')
  const value = dateNow.diff(dateAgoBefore, 'days')
  if (value < 0) {
    const e = Math.abs(value)
    if (e / 31 === 1) return 'HSD 1 tháng'
    else if ((e / 31) < 1 && e < 365) return 'HSD ' + e + ' Ngày'
    else if ((e / 31) > 1 && e < 365) return 'HSD ' + Math.round(e / 31) + ' Tháng'
    else if (e > 365) return 'HSD ' + Math.round(e / 365) + ' Năm'
    else return 'HSD ' + e + ' Ngày'
  } else {
    return 'Hết hạn'
  }
}

export default countDate;