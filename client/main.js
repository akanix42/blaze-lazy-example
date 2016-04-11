import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  this.testTemplate = new ReactiveVar(null);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  testTemplate() {
    return Template.instance().testTemplate.get();
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);

    if (!instance.testTemplate.get())
      Meteor.call('load-blaze-file', 'test.html', (err, templateCode)=> {
        eval(templateCode);
        instance.testTemplate.set(Template.test);
      });
  },
});
