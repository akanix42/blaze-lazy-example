import { Meteor } from 'meteor/meteor';
import loadBlazeFile, { installMethod as installBlazeLazyMethod } from 'meteor/nathantreid:blaze-lazy';
Meteor.startup(() => {
  console.log('loaded on server!');
  console.log(loadBlazeFile('/test.html'));

  installBlazeLazyMethod();
});
