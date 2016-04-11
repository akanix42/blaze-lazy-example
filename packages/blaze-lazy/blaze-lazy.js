import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import path from 'path';

const readFile = Meteor.wrapAsync(fs.readFile);
const fileCache = {};

export function installMethod(methodName = 'load-blaze-file') {
  Meteor.methods({
    [methodName]: loadOrCompileBlazeFile
  });
}

export default function loadOrCompileBlazeFile(filePath){
  return fileCache[filePath] || (fileCache[filePath] = loadBlazeFile(filePath)).js;
}

function loadBlazeFile(filePath){
  const contents = readFile(path.join(__meteor_bootstrap__.serverDir, 'assets/app', filePath), 'utf-8');
  return compileFile(filePath, contents);
}

function compileFile(filePath, contents) {
  const tags = TemplatingTools.scanHtmlForTags({
    sourceName: filePath,
    contents: contents,
    tagNames: ["body", "head", "template", "component"]
  });
  return TemplatingTools.compileTagsWithSpacebars(tags);
}
