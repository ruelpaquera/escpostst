import { Meteor } from 'meteor/meteor';

// var USB = require("webusb").USB;

const path = require("path");
const exec = require("child_process").exec;
const usb = require('webusb').usb;

function deviceFound(device) {
  console.log(`Device '${device.productName || device.serialNumber}' connected`);
  if (device.url) openUrl(device.url);
}

function openUrl(url) {
  console.log(`Opening url: ${url}`);

  var cmd = path.join(__dirname, "xdg-open");
  if (process.platform === "darwin") cmd = "open";
  else if (process.platform === "win32") cmd = `start ""`;

  exec(`${cmd} ${url}`);
}

console.log("Searching for Web USB devices...");

// usb.requestDevice({
//   filters: [{vendorId: 0x05ba}]
// })
// .then(device => deviceFound(device))
// .catch(error => {
//   console.log(error.message);
//   process.exit();
// });

// usb.addEventListener("connect", (device)=>{
//   console.log(`Device '${device.productName || device.serialNumber}' connected`);
//   if (device.url) openUrl(device.url);
// });

// usb.addEventListener("disconnect", device => {
//   console.log(`Device '${device.productName || device.serialNumber}' disconnected`);
// });
 
Meteor.startup(() => {
  // code to run on server at startup
});
