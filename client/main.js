import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';   
// import DeviceController from './deviceController'
// import { USBPrinter, NetPrinter, BLEPrinter } from 'react-native-printer';
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
    // var encoder = new TextEncoder();
    // var data = encoder.encode("tsting");
    // console.log(data);
    // Meteor.call('tests');
    // increment the counter when button is clicked
    // myPrint("aw");

  // console.log("================================")
  // var  VENDOR_ID = 0x04a9;  
  // var  PRODUCT_ID = 0x10d3;  
  // var DEVICE_INFO = { "vendorId": VENDOR_ID, "productId": PRODUCT_ID };
  // navigator.usb.requestDevice({ filters: [{ vendorId: 0x04a9 }] })
  // .then(selectedDevice => {
  //   console.log("selectedDevice",selectedDevice);
  //   device = selectedDevice; 
  //   return setup(device);
  // })
  // .then(() => print())
  // .catch(error => { 
  //   console.log("error",error); })

    instance.counter.set(instance.counter.get() + 1);
  },
}); 
function setup(device) { 
  return device.open(false)
      .then(() => device.selectConfiguration(1))
      .then(() => device.claimInterface(0))
      // .then(() => device.transferIn(1, 64)) // Waiting for 64 bytes of data from endpoint #5.
      // .then(result => {
      //   let decoder = new TextDecoder();
      //   console.log('Received: ' + result );//decoder.decode(result.data));
      // })
      .catch((evt) => {         
        console.log(evt.code); 
        console.log(evt.message); 
        console.log(evt.name);  
      }); 
}
async function print() { 
  device.close();
  await device.open();
  // only 1 configuration was available for me
  await device.selectConfiguration(0);
  // // interface 1 was bulk transfer
  await device.claimInterface(0);
  await readLoop(device);
}
const decoder = new TextDecoder();
const readLoop = async (device) => {
  try {
    // const result = await device.transferIn(1, 64); 
    const result = await device.controlTransferIn({
      requestType: 'class',
      recipient: 'endpoint',
      request: 0x82,
      value: 0x0000,
      index: 0x0000
    }, 64)
    .catch(error => { 
      console.log("error",error.message); })   
      const data = decoder.decode(result.data).trim();
      console.log(data);
      readLoop(device);
  } catch (error) {
      console.error(error);
  }
}
function connectAndPrint() {
  if (device == null) { 
    navigator.usb.requestDevice({filters: [{ 
      vendorId: 0x05ba,
      productId: 0x000a
    }]})
    .catch(error => { 
      console.log("error",error); })
    }
  else 
    print(); 
}
async function loads(){
  navigator.usb.getDevices()
  .then(devices => {
    if (devices.length > 0) {
      device = devices[0];
      // return setup(device);
    }
  })
  .catch(error => { console.log(error); });
}
loads();

navigator.usb.addEventListener('connect', event => {
  // event.device will bring the connected device
  console.log("event connect" ,event);
});

navigator.usb.addEventListener('disconnect', event => {
  // event.device will bring the disconnected device
  console.log("event disconnect" ,event);
}); 
 