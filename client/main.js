import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';   
// var usb = require('usb').usb;
// const path = require("path");
// const exec = require("child_process").exec;
// const usb = require('../node_modules/webusb').usb;
let device;
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    connectAndPrint();
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
  
async function setup(device) {

  return await device.open()
      .then(() => device.selectConfiguration(1))
      .then(() => device.claimInterface(0))
      // .then(() => device.controlTransferOut({
      //   requestType: 'class',
      //   recipient: 'interface',
      //   request: 0x22,
      //   value: 0x01,
      //   index: 0x02})) // Ready to receive data
      // .then(() => device.transferIn(5, 64)) // Waiting for 64 bytes of data from endpoint #5.
      // .then(result => {
      //   let decoder = new TextDecoder();
      //   console.log('Received: ' + decoder.decode(result.data));
      // })
  // device.instance();
}
async function print() { 
  // navigator.usb.claimInterface()
  // var string = document.getElementById("printContent").value + "\n";
  // var encoder = new TextEncoder();
  // var data = encoder.encode("string");
  // device.transferOut(1, data)
  // .catch(error => { console.log(error); })
    // console.log(device.configuration);
  // let loop = 0;
  // setInterval(()=>{
  //   loop++;
  //   console.log("call device");
  // },800);
    /*
   .then(() => device.isochronousTransferIn({
    requestType: 'vendor',
    recipient: 'interface',
    request: 0x01,  // vendor-specific request: enable channels
    value: 0x0013,  // 0b00010011 (channels 1, 2 and 5)
    index: 0x0000   // Interface 1 is the recipient
  })) // Ready to receive data 
  */
  // await device.transferOut(1, 0x05ba);
  var buffer = new ArrayBuffer(1);
  await device.open()
  .then(() => device.selectConfiguration(1))
  .then(() => device.claimInterface(0))
  .then(() => device.isochronousTransferOut(0x0000,(data)=>{

  },6)) // Ready to receive data
  // .then(() => device.transferIn(2, 8)) // Waiting for 64 bytes of data from endpoint #5.
  .then(result => {
    let decoder = new TextDecoder();
    console.log('Received: ' ,result);
    console.log('Received: ' + decoder.decode(result.data));
  });

  // let receivedData = await device.transferIn(1, 6);
  // console.log("receivedData",receivedData);
}
function connectAndPrint() {
  if (device == null) { 
    navigator.usb.requestDevice({ filters: [{ 
      vendorId: 0x05ba,
      productId: 0x000a
    }]})
    .then(selectedDevice => {
      console.log(selectedDevice.productName);      // "Arduino Micro"
      console.log(selectedDevice.manufacturerName); // "Arduino LLC"
      device = selectedDevice; 
      return setup(device);
    })
    .then(() => print())
    .catch(error => { console.log(error); })
  }
  else 
    print(); 
}
navigator.usb.getDevices()
.then(devices => {
  if (devices.length > 0) {
    device = devices[0];
    console.log(device);
    return setup(device);
  }else {
    connectAndPrint();
  }
})
.catch(error => { console.log(error); });

navigator.usb.addEventListener('connect', event => {
  // event.device will bring the connected device
  console.log("event connect" ,event);
});

navigator.usb.addEventListener('disconnect', event => {
  // event.device will bring the disconnected device
  console.log("event disconnect" ,event);
}); 

navigator.usb.addEventListener('Touch', event => {
  // event.device will bring the connected device
  console.log("event connect" ,event);
});