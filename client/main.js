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
    // Meteor.call('tests',data);
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
function myPrint(data) 
{
    var testPage = window.open('', 'Test Page',  'height=500,width=500');
    testPage.document.write('<html><head><title>Test Page</title>');
    testPage.document.write('</head><body >');
    testPage.document.write(data);
    testPage.document.write('</body></html>');
    testPage.document.close(); 
    testPage.focus(); 
    testPage.print();
    testPage.close();
    return ;
}
function setup(device) { 
  return device.open()
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
  // device.instance();
}
async function print() { 
  // navigator.usb.claimInterface(0);
  // var string = document.getElementById("printContent").value + "\n";
  var encoder = new TextEncoder();
  var data = encoder.encode("1"); 
  console.log(data);
  // await device.open()
  // // .then(() => device.selectConfiguration(1))
  // // .then(() => device.claimInterface(0)).
  // .transferOut(1, data)
  // .catch((evt) => { 
  //   console.log(evt.code); 
  //   console.log(evt.message); 
  //   console.log(evt.name);  
  // })
  // console.log(navigator.usb);
  // let loop = 0;
  // setInterval(()=>{
  //   loop++;
  //   console.log("call device");
  // },800);0x05ba
  // await device
  // .transferOut(2, data, 64)
  // .catch((evt) => { 
  //   console.log(evt.code); 
  //   console.log(evt.message); 
  //   console.log(evt.name);  
  // });
  // await device.transferOut(2, data).catch((evt) => { 
  //   console.log(evt.code); 
  //   console.log(evt.message); 
  //   console.log(evt.name);  
  // });

  // // console.log("receivedData");
  // let receivedData2 = await device.controlTransferOut({
  //     requestType: 'class',
  //     recipient: 'interface',
  //     request: 0x82,  // vendor-specific request: enable channels
  //     value: 0x0013,  // 0b00010011 (channels 1, 2 and 5)
  //     index: 0x0000   // Interface 1 is the recipient
  // });
  // // device.isochronousTransferOut(1, data, packetLengths)

  // console.log("receivedData2",receivedData2);

  // let receivedData = await device.transferIn(1, 6);
  // console.log("receivedData",receivedData);
}
function connectAndPrint() {
  if (device == null) { 
    navigator.usb.requestDevice({name: "usb", filters: [{ 
      vendorId: 0x05ba,
      productId: 0x000a
    }]})
    .then(selectedDevice => {
      console.log("selectedDevice",selectedDevice);
      device = selectedDevice; 
      return setup(device);
    })
    .then(() => print())
    .catch(error => { 
      console.log("error",error); })
  }
  else 
    print(); 
}
async function loads(){
  navigator.usb.getDevices()
  .then(devices => {
    console.log(devices);
    if (devices.length > 0) {
      device = devices[0];
      // console.log(device);
      return setup(device);
    }
  })
  .catch(error => { console.log(error); });
}
// loads();

navigator.usb.addEventListener('connect', event => {
  // event.device will bring the connected device
  console.log("event connect" ,event);
});

navigator.usb.addEventListener('disconnect', event => {
  // event.device will bring the disconnected device
  console.log("event disconnect" ,event);
}); 
 


// constructor()


 
// 	chrome.hid.getDevices(DEVICE_INFO, function(devices) {
// 		 console.log('Device Length: '+devices.length);
// 		if (!devices || !devices.length) {
// 		  console.log('device not found');
// 		  return;
// 		}
// 		console.log('Found device: ' + devices[0].deviceId);
// 		myHidDevice = devices[0].deviceId;
       	
// 		console.log('ProductId: '+devices[0].productId.toString(16));
// 		console.log('VendorId: '+devices[0].vendorId.toString(16));
		 
// 	   chrome.hid.connect(myHidDevice, function(connection) {
			
			
// 		console.log('Connected to the HID device!');
// 		console.log(connection);
// 		connectionId = connection.connectionId;
		
		
// 		var arrayLength = 24;
// 		var message = new Uint8Array(arrayLength);

// 		message[0] = 0x05; 
// 		message[1] = 0x2F; 
// 		message[2] = 0x43; 
// 		message[3] = 0x4C; 
// 		message[4] = 0x3C; 
// 		message[5] = 0x2F; 
// 		for (var i = 6; i < arrayLength; i++) {
// 		message[i] = 0x00;
// 		}

// 		var TransferData = {
// 		"requestType": "class",
// 		"recipient": "interface",
// 		"direction": "out",
// 		"request": 0x09,
// 		"value": 0x0300,
// 		"index": 0,
// 		"data": message.buffer
// 		};

		
		
		
//         chrome.hid.send(connectionId,0, message.buffer, function() {
// 			console.log("Info received by device");
// 		}); 
// 	   });
// 	});

