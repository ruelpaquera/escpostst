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
  
function setup(device) {

  return device.open()
      .then(() => device.selectConfiguration(1))
      .then(() => device.claimInterface(0));
  // device.instance();
}
async function print() { 
  navigator.usb.claimInterface()
  // var string = document.getElementById("printContent").value + "\n";
  // var encoder = new TextEncoder();
  // var data = encoder.encode("string");
  // device.transferOut(1, data)
  // .catch(error => { console.log(error); })

  // let loop = 0;
  // setInterval(()=>{
  //   loop++;
  //   console.log("call device");
  // },800);
  
  // await device.transferOut(1, 0x05ba);
  // let receivedData2 = await device.controlTransferOut({
  //     requestType: 'vendor',
  //     recipient: 'interface',
  //     request: 0x01,  // vendor-specific request: enable channels
  //     value: 0x0013,  // 0b00010011 (channels 1, 2 and 5)
  //     index: 0x0001   // Interface 1 is the recipient
  // });

  // let receivedData = await device.transferIn(1, 6);
  // console.log("receivedData",receivedData);
}
function connectAndPrint() {
  if (device == null) { 
    navigator.usb.requestDevice({ filters: [{ vendorId: 0x05ba }] })
    .then(selectedDevice => {
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
    // console.log(device);
    return setup(device);
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

navigator.usb.addEventListener('click', event => {
  // event.device will bring the connected device
  console.log("event connect" ,event);
});