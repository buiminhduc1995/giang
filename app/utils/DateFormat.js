import Moment from "moment/moment";

Moment.locale('en');

export const DateFormatOrderItem = (date) => {
  return Moment(date, "HH:mm:ss DD/MM/YYYY").format('HH:mm - D/M');
};

export const DateFormatOrderDetail = (date) => {
  return Moment(date, "HH:mm:ss DD/MM/YYYY").format('HH:mm DD/MM/YYYY');
};

export const DateFormatDashboard = (date) => {
  return Moment(date).format('HH:mm DD/MM/YYYY');
};
export const getTimeStance = (date) =>{
  return Moment(date,'DD/MM/YYYY').valueOf()
}
export const timeStanceToDate = (timestance) =>{
  return Moment(timestance,)
}
export const DistanseTime = (date) => {
  const dateTime = Moment(date, "HH:mm:ss DD/MM/YYYY");
  const distance = new Date().getTime() - dateTime.valueOf();
  if (distance < 60000) return "Vừa mới";
  else if (distance < 3600000) return Math.round(distance / 60000) + " phút trước";
  else if (distance < 86400000) return Math.round(distance / 3600000) + " giờ trước";
  else if (distance < 172800000) return "Hôm qua";
  else if (distance < 2592000000) return Math.round(distance / 86400000) + " ngày trước";
  else return dateTime.format("DD/MM/YYYY");
}

