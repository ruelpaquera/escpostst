import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';   
// import DeviceController from './deviceController'
// import { USBPrinter, NetPrinter, BLEPrinter } from 'react-native-printer';
// var usb = require('usb').usb;
// const path = require("path");
// const exec = require("child_process").exec;
// const usb = require('../node_modules/webusb').usb; 
let _vendorId = 0x05ba;
let _productId =  0x000a;
// let _vendorId = 0x04a9;
// let _productId =  0x10d3;
let device;

// let powerUpDevice = new Uint8Array([0x56aa,0x0101,0x0200,0x0800]).buffer;
// let getCardUID = new Uint8Array([0xff,0xca,0x00,0x00,0x04]).buffer;
// let deviceEndpoint = 0x83;
let powerUpDevice = new Uint8Array([0x56aa,0x0101,0x0200,0x0800]).buffer;
let getCardUID = new Uint8Array([0xff,0xca,0x00,0x00,0x04]).buffer;
let deviceEndpoint = 0x82;

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
  'click #b'(event, instance) {
    // connectAndPrint();
    chckAuth();
    instance.counter.set(instance.counter.get() + 1);
  },
  'click #bb'(event, instance) {
    // connectAndPrint();
    inits2();
    instance.counter.set(instance.counter.get() + 1);
  },
  'click #bbb'(event, instance) { 
    console.log('getFP');
    getFP(); 
  },
  'click #scan'(event, instance) { 
    console.log('getFP');
    scan(); 
  },
});  
navigator.usb.addEventListener('connect', event => {
  // event.device will bring the connected device
  console.log("event connect" ,event);
  chckAuth();
});

navigator.usb.addEventListener('disconnect', event => {
  // event.device will bring the disconnected device
  console.log("event disconnect" ,event);
}); 
/*======================================*/
async function inits(){
  await navigator.usb.getDevices()
  .then(devices => {
    if (devices.length > 0) {
      device = devices[0];
      console.log(device);
      return device.open()
      .then(() => device.selectConfiguration(1))
      .then(() => device.claimInterface(0))
      .catch(evt => { 
        console.log(evt.code); 
        console.log(evt.message); 
        console.log(evt.name); 
      })
    }
  })
  .catch(evt => { 
    console.log(evt.code); 
    console.log(evt.message); 
    console.log(evt.name); 
  });
}
async function inits2(){
  await navigator.usb.getDevices()
  .then(devices => {
    if (devices.length > 0) {
      device = devices[0];
      console.log(device);
      return device.open()
      .then(() => device.selectConfiguration(1))
      .then(() => device.claimInterface(0))
      .catch(evt => { 
        console.log(evt.code); 
        console.log(evt.message); 
        console.log(evt.name); 
      })
    }
  })
  .catch(evt => { 
    console.log(evt.code); 
    console.log(evt.message); 
    console.log(evt.name); 
  });
}
inits2();
async function chckAuth(){
  // if(device == null)
  console.log(device);
  navigator.usb.requestDevice({ filters: [{ 
      vendorId: _vendorId,
      productId: _productId
    }] 
  }) 
  .then(selectedDevice => {
    device = selectedDevice;
    console.log(device.configuration.interfaces[0].interfaceNumber);
    console.log(device.manufacturerName);
    console.log(device.productName);
    console.log(device);
    return device.open()
          .then(() => device.selectConfiguration(1))
          .then(() => device.claimInterface(0))
  })
  .then(() => device.claimInterface(0))
  .then(() => device.transferOut(deviceEndpoint, powerUpDevice)
      .then(transferResult => {
          console.log(transferResult);
      }, error => {
          console.log(error);
          console.log(error.code); 
          console.log(error.message); 
          console.log(error.name); 
          device.close();
      })
      .catch(error => {
          console.log(error);
      })
  );
}

// let powerUpDevice = new Uint8Array([0x56aa,0x0101,0x0200,0x0800]).buffer;
// let getCardUID = new Uint8Array([0xff,0xca,0x00,0x00,0x04]).buffer;
// let deviceEndpoint = 0x83;
async function getFP(){
  console.log(device);
  if(device != null){

  }else {

  }
}

async function scan(){

}



/*======================================*/

// async function loadDevices(){
//   navigator.usb.getDevices()
//   .then(devices => {
//     if (devices.length > 0) {
//       device = devices[0];
//       device.open()
//       .then(() => device.selectConfiguration(1))
//       .then(() => device.claimInterface(0))
//     }
//   })
//   .catch(error => { console.log(error); });
// }
// loadDevices();
// function loadWEBUSB(){
  
//   navigator.usb.requestDevice({ filters: [{ 
//       vendorId: 0x05ba,
//       productId: 0x000a
//    }] 
//   })
//   .then(devices => {
//     // console.log(devices.configuration.interfaces[0].interfaceNumber);
//     // console.log(devices.manufacturerName);
//     // console.log(devices.productName);
//     // console.log(devices);
//     if (devices.length > 0) {
//       device = devices[0];
//       // return device.open()

//     }

//   })            
//   // .then(() => device.claimInterface(0))
//   // .then(() => device.transferOut(0, powerUpDevice)
//   // .then(transferResult => {
//   //     console.log(transferResult);
//   //   }, evt => {
//   //       console.log(evt);
//   //       console.log(evt.code); 
//   //       console.log(evt.message); 
//   //       console.log(evt.name); 
//   //       device.close();
//   //   })
//   // .catch(evt => {
//   //   console.log(evt.code); 
//   //   console.log(evt.message); 
//   //   console.log(evt.name);  
//   // })
//   // );
// }
// // loadWEBUSB();






















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



// function setup(device) { 
//   return device.open(false)
//       .then(() => device.selectConfiguration(1))
//       .then(() => device.claimInterface(0))
//       // .then(() => device.transferIn(1, 64)) // Waiting for 64 bytes of data from endpoint #5.
//       // .then(result => {
//       //   let decoder = new TextDecoder();
//       //   console.log('Received: ' + result );//decoder.decode(result.data));
//       // })
//       .then(() => device.transferOut(0, powerUpDevice)
//           .then(transferResult => {
//               console.log(transferResult);
//           }, error => {
//               console.log(error);
//               device.close();
//           })
//           .catch(error => {
//               console.log(error);
//           })
//       )
//       .catch((evt) => {         
//         console.log(evt.code); 
//         console.log(evt.message); 
//         console.log(evt.name);  
//       }); 
// }
// async function print() { 
//   // device.close();
//   // await device.open();
//   // only 1 configuration was available for me
//   // await device.selectConfiguration(1);
//   // // // interface 1 was bulk transfer
//   // await device.claimInterface(0);
//   // device.release
//   // readLoop(device);
//   // console.log(device.configuration.interfaces[0].interfaceNumber);
//   // console.log(device.manufacturerName);
//   // console.log(device.productName);
//   // console.log(device);
// }
// const decoder = new TextDecoder();
// const readLoop = async (device) => {
//   // try {
//     console.log('readLoop');
//     const result = await device.transferIn(129, 64);
//     console.log(result);
//   //   await device.controlTransferIn({
//   //     requestType: 'standard',
//   //     recipient: 'endpoint',
//   //     request: 0x83,
//   //     value: 0x0001,
//   //     index: 0x0000
//   //   }, 64)
//   //   .then(result => {
//   //     // let decoder = new TextDecoder();
//   //     console.log('Received: ' + result);
//   //   })
//   //   .catch(error => { 
//   //     console.log("controlTransferIn error",error.message); });     
//   //     // const data = decoder.decode(result.data).trim();
//   //     // console.log(data);
//   //     // readLoop(device);
//   // } catch (error) {
//   //     console.log('readLoop error');
//   //     console.error(error);
//   // }
// }
// function connectAndPrint() {
//   if (device == null) { 
//     navigator.usb.requestDevice({filters: [{ 
//       vendorId: 0x05ba,
//       productId: 0x000a
//     }]})  
//     .then(devices => {
//       if (devices.length > 0) {
//         device = devices[0];
//         return setup(device);
//       }
//     })
//     .catch(error => { 
//       console.log("error",error); })
//     }
//   else 
//     print(); 
// }
// async function loads(){
//   navigator.usb.getDevices()
//   .then(devices => {
//     if (devices.length > 0) {
//       device = devices[0];
//       return setup(device);
//     }
//   })
//   .catch(error => { console.log(error); });
// }
// loads();

