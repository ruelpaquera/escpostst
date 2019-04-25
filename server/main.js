import { Meteor } from 'meteor/meteor';
import Future from 'fibers/future'; 

const usb = require('usb');

// vendorId: 0x05ba,
// productId: 0x000a 
// console.log(usb.LIBUSB_CLASS_PER_INTERFACE);
// console.log(usb.LIBUSB_CLASS_AUDIO);
// console.log(usb.LIBUSB_CLASS_COMM);
// console.log(usb.LIBUSB_CLASS_HID);
// console.log(usb.LIBUSB_CLASS_PRINTER);
// console.log(usb.LIBUSB_CLASS_PTP);
// console.log(usb.LIBUSB_CLASS_MASS_STORAGE);
// console.log(usb.LIBUSB_CLASS_HUB);
// console.log(usb.LIBUSB_CLASS_DATA);
// console.log(usb.LIBUSB_CLASS_WIRELESS);
// console.log(usb.LIBUSB_CLASS_APPLICATION);
// console.log(usb.LIBUSB_CLASS_VENDOR_SPEC);
// console.log("--------------------------------------");
// console.log(usb.LIBUSB_REQUEST_GET_STATUS);
// console.log(usb.LIBUSB_REQUEST_CLEAR_FEATURE);
// console.log(usb.LIBUSB_REQUEST_SET_FEATURE);
// console.log(usb.LIBUSB_REQUEST_SET_ADDRESS);
// console.log(usb.LIBUSB_REQUEST_GET_DESCRIPTOR);
// console.log(usb.LIBUSB_REQUEST_SET_DESCRIPTOR);
// console.log(usb.LIBUSB_REQUEST_GET_CONFIGURATION);
// console.log(usb.LIBUSB_REQUEST_SET_CONFIGURATION);
// console.log(usb.LIBUSB_REQUEST_GET_INTERFACE);
// console.log(usb.LIBUSB_REQUEST_SET_INTERFACE);
// console.log(usb.LIBUSB_REQUEST_SYNCH_FRAME);
// console.log("--------------------------------------");
// console.log(usb.LIBUSB_DT_DEVICE);
// console.log(usb.LIBUSB_DT_CONFIG);
// console.log(usb.LIBUSB_DT_INTERFACE);
// console.log(usb.LIBUSB_DT_ENDPOINT);
// console.log(usb.LIBUSB_DT_HID);
// console.log(usb.LIBUSB_DT_REPORT);
// console.log(usb.LIBUSB_DT_PHYSICAL);
// console.log(usb.LIBUSB_DT_HUB);
// console.log("--------------------------------------");
// console.log(usb.LIBUSB_ISO_SYNC_TYPE_NONE);
// console.log(usb.LIBUSB_ISO_SYNC_TYPE_ASYNC);
// console.log(usb.LIBUSB_ISO_SYNC_TYPE_ADAPTIVE);
// console.log(usb.LIBUSB_ISO_SYNC_TYPE_SYNC);
// console.log(usb.LIBUSB_DT_HUB);
// console.log(usb.LIBUSB_DT_HUB);
// console.log(usb.LIBUSB_TRANSFER_TYPE_INTERRUPT);
// usb.setDebugLevel(1);
// usb.findByIds(0x05ba, 0x000a);

let usbreq = usb.findByIds(0x05ba, 0x000a); 
// console.log(usbreq); 
usbreq.open();  
// console.log(usbreq.interfaces[0].endpoints);
usbreq.interfaces[0].claim();

var endpoints = usbreq.interfaces[0].endpoints, 
    inEndpoint = endpoints[0],
    inEndpoint2 = endpoints[1];  
// console.log(usbreq.interfaces[0]);
// console.log(inEndpoint2);

inEndpoint.transferType = 3;
inEndpoint2.transferType = 2;
// usbreq.interface(0).release((err)=>{
//   console.log(err); 
// }); 
let inter = usbreq.interface(0); 
inter.claim();
inter.endpoint(0);  

inEndpoint.startPoll(3,64);
inEndpoint2.startPoll(3,64); 

inEndpoint.transfer(64, function (error, data) {
    if (!error) {
        console.log('inEndpoint transfer data',data);
    } else {
        console.log("transfer error",error);
    }
});
inEndpoint2.transfer(64, function (error, data) {
  if (!error) {
      console.log('inEndpoint transfer data',data);
  } else {
      console.log("transfer error",error);
  }
});

inEndpoint.on('data', function (data) {  
  console.log('inEndpoint data',data);
});
inEndpoint.on('error', function (error) {
  console.log('inEndpoint error',error);
}); 
inEndpoint.on('end', function (error) {
  console.log('end error',error);
});
inEndpoint2.on('data', function (data) {
  console.log('inEndpoint2 data', data);
});
inEndpoint2.on('error', function (error) {
  console.log('inEndpoint2 error',error);
});
// inEndpoint.stopPoll( function ( data) {
//   console.log('stopPoll transfer data',data);
// });

usb.on('attach', function(device) {
  console.log('attach',device)
});
usb.on('detach', function(device) {
  console.log('detach',device)
});

// outEndpoint.transferType = 2;
// outEndpoint.startStream(1, 64);
// outEndpoint.transfer(new Buffer('d\n'), function (err) {
//   console.log(err);
// });
// usb.busNumber = 2
// usb.portNumbers = 9
// usb.deviceDescriptor = {
//   idVendor: 1466,
//   idProduct: 10
// }   
// usb.Endpoint = {
//   direction: 'in',
//   descriptor: {
//     bEndpointAddress:  0x81
//   }
// }
// usb.InEndpoint( {
//   direction: 'in',
//   descriptor: {
//     bEndpointAddress:  0x81
//   }
// }).transfer(3, (error, data)=>{

// });

// usbdevice.open()
// console.log(usbdevice); 
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
async function print() {
  console.log('print'); 
  // var string = document.getElementById("printContent").value + "\n";
  // var encoder = new TextEncoder();
  // var data = encoder.encode("string");
  // device.transferOut(1, data)
  // .catch(error => { console.log(error); })
    let receivedData2 = await device.controlTransferOut({
      requestType: 'class',
      recipient: 'interface',
      request: 0x082,  // vendor-specific request: enable channels
      value: 0x0013,  // 0b00010011 (channels 1, 2 and 5)
      index: 0x0000   // Interface 1 is the recipient
  });
  // // device.isochronousTransferOut(1, data, packetLengths)

  console.log("receivedData2",receivedData2);
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
      usb.requestDevice({ filters: [{        
        vendorId: 0x05ba,
        productId: 0x000a
      }] })
      .then(selectedDevice => {
        device = selectedDevice;
        console.log(device); 
        return setup(device);
      })  
      .then((obj) =>{
        console.log("obj",obj)  
        print()
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