import MoneyFormat from '../../utils/MoneyFormat';

interface Info {
  store: string;
  address: string;
  phone: string;
  customer: string;
  invoiceID?: string;
  created_at: string;
  total?: number;
  discount?: number;
  amount: number;
}
interface Item {
  drg_drug_name: string;
  price: number;
  quantity: number;
  unit_name: string;
  dosage: string;
}

export async function html(info: Info, invoice: Array<Item>, sourceQR?: string) {
  let total = 0;
  invoice.map(e => (total += e.quantity * e.price));
  let stringData = ``;
  invoice.map(e => {
    stringData += `<div style="display: flex; flex-direction: row; justify-content: space-between">
      <div>
        <p>${e.drg_drug_name}</p>
        <p>${e.quantity} ${e.unit_name} x ${e.price}</p>
        <p>${e.dosage}</p>
      </div>
      <p>${MoneyFormat(e.price * e.quantity)}</p>
    </div>`;
  });

  return `
<div style = "padding:2mm; width: auto">

  <center style = "margin-bottom: 3px">
    <div style = "display: block"> 
      <h3>${info.store}</h3>
    </div>
  </center>
    
  <div style = "padding-bottom: 2px; border-bottom: 1px dotted #000">
    <div style = "display: block">
      <p> 
        Địa chỉ      : ${info.address}</br>
        Điện thoại   : ${info.phone}</br>
        Tên KH       : ${info.customer}</br>
        Mã hóa đơn   : ${info.invoiceID}</br>
        Thời gian tạo: ${info.created_at}</br>
      </p>
    </div>
  </div>

  <div style = "width: 100%; font-size: 0.9em; border-bottom: 1px dotted #000">
    <div style="display: flex; flex-direction: row; justify-content: space-between" >
      <p style = "font-weight: bold">Sản phẩm</p>
    </div>
    ${stringData}
  </div> 

  <div style = "width: 100%; font-size: 0.9em; border-bottom: 1px dotted #000">
    <div style="display: flex; flex-direction: row; justify-content: space-between">
      <p>Tổng tiền</p>
      <p>${MoneyFormat(total)}</p>
    </div>
    <div style="display: flex; flex-direction: row; justify-content: space-between">
      <p>Giảm giá</p>
      <p>${MoneyFormat(total - info.amount)}</p>
    </div>
  </div> 

  <div style = "width: 100%; font-size: 0.9em; border-bottom: 1px dotted #000">
    <div style="display: flex; flex-direction: row; justify-content: space-between">
      <p>Tổng thanh toán</p>
      <p>${MoneyFormat(info.amount)}</p>
    </div>  

    <center style = "margin-top: 3px">
      <div style = "display: block"> 
        <p style = "font-weight: bold">Hẹn gặp lại lần sau!</p>
      </div>
    </center>
  </div>

  
</div>`;
}

//In ma VNPay
{
  /* <center style = "margin-top: 10px">
    <div>
      <canvas width="70" height="70" style="display: flex; align-self: center"></canvas>
      <img src= "data:image/png;base64, ${sourceQR}"  style="display: block">
    </div>
  </center> */
}
