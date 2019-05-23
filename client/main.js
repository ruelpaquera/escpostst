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
    Meteor.call('printss'); 
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