import { Meteor } from 'meteor/meteor';
import Future from 'fibers/future';  
 
const escpos = require('escpos');
let device;
Meteor.methods({
  'printss': async function(data){  
    var fut = new Future();
    // console.log(await pawnTicket());
    fut.return(await pawnTicket()); 
    return fut.wait();
  },
  'checkprinter': function(data){  
    var fut = new Future();
    printerInit((returns)=>{
      console.log("returns",returns);
      fut.return(returns); 
    });
    // prints();
    // fut.return(null); 
    return fut.wait();
  }
});
  // const device  = new escpos.USB(0x04b8,0x0005);
  // const device = new escpos.Serial('USB003');
  // const device  = new escpos.Network('\\TISAY-PC\EPSON_LX-300+II');
  // const device  = new escpos.Serial('/dev/usb/lp0'); 
 
function printerInit(callback){
  try {
    device = new escpos.USB(0x04b8,0x0005);
    // device = new escpos.Network('192.168.254.113');
    callback(true);  
  }catch (err){
    callback(false);
  }
}
async function pawnTicket(objData){
  let devicesStatus = true;
  await printerInit((obj) => {
    console.log(obj);
    devicesStatus = obj;
  });  
  if(!devicesStatus){ 
    return {statusT:1,status:"No Printer",message:"No Printer"};
  }

  let ornumber = "";
  let dateLoanGranted = "";//12 s-16
  let maturtyDate = "";//12 s-70
  let expiryDateOfRedemption = "";//12 s-70
  let clientname = "";//24 s-12
  let clientaddress = "";//36 s-45
  let pesoPrincipalLetter = "";//41 s-14
  let pesoPrincipalNumber = "";//23 s-57
  let withInterestOfword = "";//21 s-3
  let withInterestOfnumber = "";//4 s-29
  let withInterestfordays = "";//4 s-36
  let appraiseAtPesoWord = "";//38 s-30
  let appraiseAtPesoNumber = "";//70  s-70
  let penaltyInterest = "";//10  s-57
  let pawnItemDescription = "";//27 s-3
  let IdPresented = "";//14 s-11

  let PrincipalNumber = "";//17 s-62
  let InterestNumber = "";//17 s-62 
  let ServiceOfChargeNumber = "";//17 s-62
  let NetProceedsNumber = "";//17 s-62
  
  let objData = {
    dateLoanGranted:"JAN 03 2019",
    expiryDateOfRedemption: "MAY 02 2019",
    maturtyDate: "FEB 02 2019",
    clientname: "Ruel Paquera",
    clientaddress: "Catalunan Grande",
    pesoPrincipalLetter: "Seven Thousand Pesos",
    pesoPrincipalNumber: "7,000",
    withInterestOfword: "",
    withInterestOfnumber: "3",
    withInterestfordays: "30",
    appraiseAtPesoWord: "",
    appraiseAtPesoNumber: "7,700",
    penaltyInterest: "2%",
    ServiceOfChargeNumber: "",
    NetProceedsNumber: "",
    IdPresented: "",
    pawnItemDescription: "test subject to explode many things in this projects so test lang ni char"
  }
  dateLoanGranted = sic([
    {sIndex:16,strValue:objData.dateLoanGranted,maxLenght:11},
    {sIndex:68,strValue:objData.expiryDateOfRedemption,maxLenght:11}// expiryDateOfRedemption
  ]);  
  maturtyDate = sic([{sIndex:68,strValue:objData.maturtyDate,maxLenght:11}]);
  clientname = sic([
    {sIndex:12,strValue:objData.clientname,maxLenght:24},
    {sIndex:45,strValue:objData.clientaddress,maxLenght:35}//clientaddress
  ]);
  pesoPrincipalLetter = sic([
    {sIndex:14,strValue:objData.pesoPrincipalLetter,maxLenght:41},
    {sIndex:57,strValue:objData.pesoPrincipalNumber,maxLenght:23}//pesoPrincipalNumber
  ]);
  withInterestOfword = sic([
    {sIndex:3,strValue:objData.withInterestOfword,maxLenght:21},
    {sIndex:30,strValue:objData.withInterestOfnumber,maxLenght:4},//withInterestOfnumber,
    {sIndex:38,strValue:objData.withInterestfordays,maxLenght:4}//withInterestfordays
  ]);
  appraiseAtPesoWord = sic([    
    {sIndex:30,strValue:objData.appraiseAtPesoWord,maxLenght:38},
    {sIndex:70,strValue:objData.appraiseAtPesoNumber,maxLenght:10}//appraiseAtPesoNumber
  ]);  
  
  penaltyInterest = sic([{sIndex:57,strValue:objData.penaltyInterest,maxLenght:10}]); 
  PrincipalNumber = sic([{sIndex:62,strValue:objData.pesoPrincipalNumber,maxLenght:17}]); 


  pawnItemDescription = objData.pawnItemDescription.explodestr(27)
  
  let pawnItemDescription1 = sic([{sIndex:3,strValue:pawnItemDescription[0],maxLenght:27}]); 
  let pawnItemDescription2 = sic([
    {sIndex:3,strValue:pawnItemDescription[1],maxLenght:27},
    {sIndex:62,strValue:objData.penaltyInterest,maxLenght:17}//InterestNumber
  ]); 
  let pawnItemDescription3 = sic([
    {sIndex:3,strValue:pawnItemDescription[2],maxLenght:27},
    {sIndex:62,strValue:objData.ServiceOfChargeNumber,maxLenght:17}//ServiceOfChargeNumber
  ]); 
  let pawnItemDescription4 = sic([
    {sIndex:3,strValue:pawnItemDescription[3],maxLenght:27},
    {sIndex:62,strValue:objData.NetProceedsNumber,maxLenght:17}//NetProceedsNumber
  ]); 
  IdPresented = sic([{sIndex:11,strValue:objData.IdPresented,maxLenght:14}]); 
 
  const options = { encoding: "GB18030", position: 'OFF'} 
  const printer = new escpos.Printer(device, options);
  return new Promise((resolve, reject) => {
    device.open((error) => {
      if(error) {
        reject({statusT:2,status:"printer error",message:error});
        return;
      } else {
        resolve({statusT:0,status:"good",message:""});
      }
      printer
      .font('a')
      .align('rt') 
      .size(0.8, 0.8)   
      .text('')
      .text('')
      .text('')
      .text('')
      .text('')
      .text('')
      .text(maturtyDate)
      .text('')
      .text(dateLoanGranted)
      .text('')
      .text(clientname)
      .text('')
      .text(pesoPrincipalLetter)
      .text('')
      .text(withInterestOfword)
      .text(appraiseAtPesoWord)
      .text('')
      .text(penaltyInterest)
      .text('')
      .text(PrincipalNumber)
      .text(pawnItemDescription1)
      .text(pawnItemDescription2)
      .text(pawnItemDescription3)
      .text(pawnItemDescription4)
      .text('')
      .text('')
      .text(IdPresented)
      // // .cut()
      .close()
    });
  });
}

  String.prototype.explodestr=function(l) {
    var strs = [];
    var str = this;
       while(str.length > l){
           var pos = str.substring(0, l).lastIndexOf(' ');
           pos = pos <= 0 ? l : pos;
           strs.push(str.substring(0, pos));
           var i = str.indexOf(' ', pos)+1;
           if(i < pos || i > pos+l)
               i = pos;
           str = str.substring(i);
       }
       strs.push(str);
      return strs;
   }
  String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
  }
  function sic(arrData) {
    let strLineMain = ' '.repeat(80);
    arrData.forEach((value)=>{
      let str = value.strValue.substr(0,value.maxLenght);
      strLineMain = strLineMain.replaceAt(value.sIndex,str + ' '.repeat(value.maxLenght - str.length));
    });
    if(strLineMain.length < 80){
      strLineMain + ' '.repeat(80 - strLineMain.length);
    }
    return strLineMain ;
  }
