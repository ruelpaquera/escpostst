import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';    
 
Template.hello.onCreated(function helloOnCreated() { 
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click #print'(event, instance) {
    instance.counter.set(instance.counter.get() + 1);
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
      NetProceedsNumber: "7,000",
      IdPresented: "TIN",
      pawnItemDescription: "test subject to explode many things in this projects so test lang ni char"
    }
    Meteor.call('printss',{objData},(error, result)=>{
      if(!error){
        console.log("result",result);
      }else{
        console.log("error",error);
      }
    }); 
    // window.print("test"); 
  },
  'click #check'(event, instance) {
    instance.counter.set(instance.counter.get() + 1);
    Meteor.call('checkprinter',(error, result)=>{
      console.log('checkprinter ' , result);
    }); 
    // window.print("test");
  }
});  