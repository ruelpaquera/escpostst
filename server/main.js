import { Meteor } from 'meteor/meteor';
import Future from 'fibers/future';

// import { ReactNativePrinter } from 'react-native-printer';
 
// ReactNativePrinter.print('192.168.31.242', 9100, '<CB>这是一个标题</CB>');
// const LinePrinter = require("lineprinter");
// import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
// const ipp = require('ipp-encoder');
// const C = ipp.CONSTANTS;

// const printer = require("printer-lp");
// const printer = require('node-native-printer');
// var USB = require("webusb").USB;
// var Printer = require('node-printer');
// var options = {
//     media: 'Custom.200x600mm',
//     n: 3
// };
// Get available printers list
// const path = require("path");
// const exec = require("child_process").exec;
// const usb = require('webusb').usb;
var USB = require("webusb").USB;
let device; 
Meteor.methods({
  'tests': async function(data){  
    var fut = new Future();
    console.log("called");

    // var decoded = ipp.request.decode(data);

    // var response = {
    //   version: {
    //     major: 1,
    //     minor: 1
    //   },
    //   operationId: 0x02,
    //   requestId: 1,
    //   groups: [
    //     { tag: C.OPERATION_ATTRIBUTES_TAG, attributes: [
    //       { tag: 0x47, name: 'attributes-charset', value: ['utf-8'] },
    //       { tag: 0x48, name: 'attributes-natural-language', value: ['en-us'] },
    //       { tag: 0x45, name: 'printer-uri', value: ['ipp://TISAY-PC/'] },
    //       { tag: 0x42, name: 'job-name', value: ['foobar'] },
    //       { tag: 0x22, name: 'ipp-attribute-fidelity', value: [true] }
    //     ] },
    //     { tag: C.JOB_ATTRIBUTES_TAG, attributes: [
    //       { tag: 0x21, name: 'copies', value: [20] },
    //       { tag: 0x44, name: 'sides', value: ['two-sided-long-edge'] }
    //     ] }
    //   ]
    // }
    // ipp.response.encode(response)


    // var options = {
    //     media: 'Custom.200x600mm', // Custom paper size
    //     destination: "Cannon_iP2700", // The printer name
    //     n: 3 // Number of copies
    // };
     
    // var text = "print text directly, when needed: e.g. barcode printers";
    // var file = "package.json";
     
    // var jobText = printer.printText(text, options, "text_demo");
    // var jobFile = printer.printFile(file, options, "file_demo");
     
    // var onJobEnd = function () {
    //     console.log(this.identifier + ", job send to printer queue");
    // };
     
    // var onJobError = function (message) {
    //     console.log(this.identifier + ", error: " + message);
    // };
     
    // jobText.on("end", onJobEnd);
    // jobText.on("error", onJobError);
     
    // jobFile.on("end", onJobEnd);
    // jobFile.on("error", onJobError);
    // connectAndPrint();
// let p = Printer.list();

// var printer = new Printer('usbprint');
// console.log(p);

    fut.return(null); 
    return fut.wait();
  }
});
function setup(device) {
  console.log('device opend');
  return device.open() 
  .then(() => device.selectConfiguration(1))
  .then(() => device.claimInterface(device.configuration.interfaces[0].interfaceNumber))
}
function print() {
  console.log('print'); 
  // var string = document.getElementById("printContent").value + "\n";
  var encoder = new TextEncoder();
  var data = encoder.encode("string");
  device.transferOut(1, data)
  .catch(error => { console.log(error); })
}
function connectAndPrint() {
  if (device == null) {
    usb.requestDevice({ filters: [{ vendorId: 0x04a9 }] })
    .then(selectedDevice => {
      device = selectedDevice;
      // console.log(device); 
      return setup(device);
    })
    .then((obj) =>{
      console.log("obj",obj)
      // print()
    })
    .catch(error => { console.log("error",error); })
  }
  else
    print();
}
async function loads(){

  await usb.getDevices()
  .then(devices => {
    // console.log(devices);
    if (devices.length > 0) {
      console.log("connected to vendor");
      device = devices[0];
      return setup(device);
    } else {
      console.log("connecting to vendor");
      usb.requestDevice({ filters: [{ vendorId: 0x05ba }] })
      .then(selectedDevice => {
        device = selectedDevice;
        console.log(device); 
        return setup(device);
      })  
      .then((obj) =>{
        console.log("obj",obj)  
        // print()
      })
      .catch(error => { console.log("error",error); })
    }
  })
  .catch(error => { console.log(error); });

}
// loads();
Meteor.startup(() => {
  // code to run on server at startup
});


function handleDevicesFound(devices, selectFn) {
  // If one of the devices can be automatically selected, you can return it
  for (var i = 0; i < devices.length; i++) {
    console.log(devices[i].productName);
      // if (devices[i].productName === "myName") return devices[i];
  }

  // Otherwise store the selectFn somewhere and execute it later with a device to select it
}

// var usb = new USB({
//   devicesFound: handleDevicesFound
// });

// usb.requestDevice({
//   filters: [{vendorId: 0x04a9}]
// })
// .then(device => {
//   console.log(device);
// });


// printers();
async function printers(){
  
// const printer = await LinePrinter.auto();
// await printer.println("Hello, World!");
console.log(await LinePrinter.list());

}