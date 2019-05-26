import { Meteor } from 'meteor/meteor';
import Future from 'fibers/future';  
 
const escpos = require('escpos');
let device;
Meteor.methods({
  'printss': function(data){  
    var fut = new Future();
    pawnTicket();
    fut.return(null); 
    return fut.wait();
  },
  'checkprinter': function(data){  
    var fut = new Future();
    printerInit((returns)=>{
      console.log("returns",returns);
      fut.return(returns); 
    });
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
    // device  = new escpos.Network("//127.0.0.1/EPSON_LX-300+II");
    callback(true);  
  }catch (err){
    callback(false);  
    console.log("err",err);
  }
}
async function pawnTicket(err){
  if(device == null){
    printerInit((returns)=>{ 

    });
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
   
  dateLoanGranted = sic([
    {sIndex:16,strValue:"JAN 03 2019",maxLenght:11},
    {sIndex:68,strValue:"MAY 02 2019",maxLenght:11}// expiryDateOfRedemption
  ]);  
  maturtyDate = sic([{sIndex:68,strValue:"FEB 02 2019",maxLenght:11}]);
  clientname = sic([
    {sIndex:12,strValue:"Ruel Paquera",maxLenght:24},
    {sIndex:45,strValue:"Catalunan Grande",maxLenght:35}//clientaddress
  ]);
  pesoPrincipalLetter = sic([
    {sIndex:14,strValue:"Seven Thousand Pesos",maxLenght:41},
    {sIndex:57,strValue:"7,000",maxLenght:23}//pesoPrincipalNumber
  ]);
  withInterestOfword = sic([
    {sIndex:3,strValue:"",maxLenght:21},
    {sIndex:30,strValue:"3",maxLenght:4},//withInterestOfnumber,
    {sIndex:38,strValue:"30",maxLenght:4}//withInterestfordays
  ]);
  appraiseAtPesoWord = sic([    
    {sIndex:30,strValue:"Seventy Seven Thousand Pesos",maxLenght:38},
    {sIndex:70,strValue:"7,000",maxLenght:10}//appraiseAtPesoNumber
  ]);  
  
  penaltyInterest = sic([{sIndex:57,strValue:"2h",maxLenght:10}]); 
  PrincipalNumber = sic([{sIndex:62,strValue:"7000",maxLenght:17}]); 


  pawnItemDescription = "test subject to explode many things in this projects so test lang ni char".explodestr(27)
  
  let pawnItemDescription1 = sic([{sIndex:3,strValue:pawnItemDescription[0],maxLenght:27}]); 
  let pawnItemDescription2 = sic([
    {sIndex:3,strValue:pawnItemDescription[1],maxLenght:27},
    {sIndex:62,strValue:"2h",maxLenght:17}//InterestNumber
  ]); 
  let pawnItemDescription3 = sic([
    {sIndex:3,strValue:pawnItemDescription[2],maxLenght:27},
    {sIndex:62,strValue:"2h",maxLenght:17}//ServiceOfChargeNumber
  ]); 
  let pawnItemDescription4 = sic([
    {sIndex:3,strValue:pawnItemDescription[3],maxLenght:27},
    {sIndex:62,strValue:"2h",maxLenght:17}//NetProceedsNumber
  ]); 
  IdPresented = sic([{sIndex:11,strValue:"",maxLenght:14}]); 

  const options = { encoding: "GB18030", position: 'OFF'} 
  const printer = new escpos.Printer(device, options);
  device.open(function(){
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
    .close()
  });
}

// .text('')
// .text('')
// .text('')
// .text('')
// .text('')
// .text('')
// .text('')
// .text(maturtyDate)
// .text('')
// .text(dateLoanGranted)
// .text(clientname)
// .text('')
// .text(pesoPrincipalLetter)
// .text('')
// .text(withInterestOfword)
// .text(appraiseAtPesoWord)
// .text('')
// .text(penaltyInterest)
// .text('')
// .text(PrincipalNumber)
// .text(pawnItemDescription1)
// .text(pawnItemDescription2)
// .text(pawnItemDescription3)
// .text(pawnItemDescription4)
// .text('')
// .text('')
// .text(IdPresented)

// .text('                                                                                ')
// .text('                                                                                ')
// .text('                                                                                ')
// .text('                                                                                ')
// .text('                                                                                ')
// .text('                                                                                ')
// .text('                                                                                ')
// .text('                                                                    -FEB 02 2019')
// .text('                                                                                ')
// .text('              -JAN 03 2019 -                                        -02 May 2019')
// .text('           -  maria gelacio         -      - p-7 b-2 ,asdadasdasd               ')
// .text('                                                                                ')
// .text('             - Seven Thousand Pesos                    -- 7700                  ')
// .text('                                                                                ')
// .text('  -                     -   - 3% - - 30 -                                       ')
// .text('                             - peso word                            -- 7700     ')
// .text('                                                                                ')
// .text('                                                                                ')
// .text('                                                                                ')
// .text('                                                             - principal        ')
// .text('  - description of the pawn   -                                                 ')
// .text('  - description of the pawn   -                              - interest         ')
// .text('  - description of the pawn   -                              - service charge   ')
// .text('  - description of the pawn   -                              - net proceeed     ')
// .text('                                                                                ')
// .text('                                                                                ')
// .text('          - id presented -                                                      ')
  // .barcode('1234567', 'EAN8')
  // .qrimage('https://github.com/song940/node-escpos', function(err){
  //   this.cut();
  //   this.close();
  // });
  // 1 
  // 2 
  // 3 
  // 4 
  // 5 
  // 6 
  // 7 
  // 8 
  // 9 
  // 10
  // 11
  // 12
  // 13
  // 15
  // 16
  // 17
  // 18
  // 19
  // 20
  // 21
  // 22
  // 23
  // 24
  // 25
  // 26
  // 27

  // .text('                                                                                ')
  // .text('                                                                                ')
  // .text('                                                                                ')
  // .text('                                                                                ')
  // .text('                                                                                ')
  // .text('                                                                                ')
  // .text('                                                                                ')
  // .text('                                                                     FEB 02 2019')
  // .text('                                                                                ')
  // .text('  -           -JAN 03 2019 -                                        -02 May 2019')
  // .text('           -  maria gelacio         -      - p-7 b-2 ,asdadasdasd               ')
  // .text('                                                                                ')
  // .text('             - Seven Thousand Pesos                    -- 7700                  ')
  // .text('                                                                                ')
  // .text('  -                     ----- 3% --- 30 -                                       ')
  // .text('                             - peso word                            -- 7700     ')
  // .text('                                                                                ')
  // .text('                                                                                ')
  // .text('                                                                                ')
  // .text('                                                             - principal        ')
  // .text('  - description of the pawn   -                                                 ')
  // .text('  - description of the pawn   -                              - interest         ')
  // .text('  - description of the pawn   -                              - service charge   ')
  // .text('  - description of the pawn   -                              - net proceeed     ')
  // .text('                                                                                ')
  // .text('                                                                                ')
  // .text('          - id presented -                                                      ')
  
  // .text('1 ------------------------------------------------------------------------------')
  // .text('2 ------------------------------------------------------------------------------')
  // .text('3 ------------------------------------------------------------------------------')
  // .text('4 ------------------------------------------------------------------------------')
  // .text('5 ------------------------------------------------------------------------------')
  // .text('6 ------------------------------------------------------------------------------')
  // .text('7 ------------------------------------------------------------------------------')
  // .text('8 ------------------------------------------------------------------------------')
  // .text('9 ------------------------------------------------------------------------------')
  // .text('10------------------------------------------------------------------------------')
  // .text('11------------------------------------------------------------------------------')
  // .text('12------------------------------------------------------------------------------')
  // .text('13------------------------------------------------------------------------------')
  // .text('15------------------------------------------------------------------------------')
  // .text('16------------------------------------------------------------------------------')
  // .text('17------------------------------------------------------------------------------')
  // .text('18------------------------------------------------------------------------------')
  // .text('19------------------------------------------------------------------------------')
  // .text('20------------------------------------------------------------------------------')
  // .text('21------------------------------------------------------------------------------')
  // .text('22------------------------------------------------------------------------------')
  // .text('23------------------------------------------------------------------------------')
  // .text('24------------------------------------------------------------------------------')
  // .text('25------------------------------------------------------------------------------')
  // .text('26------------------------------------------------------------------------------')
  // .text('27------------------------------------------------------------------------------')
  // .text('29------------------------------------------------------------------------------')
  // .text('30------------------------------------------------------------------------------')
  // .text('31------------------------------------------------------------------------------')
  // .text('32------------------------------------------------------------------------------')
  // .text('33------------------------------------------------------------------------------') 


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
