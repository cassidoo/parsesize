#!/usr/bin/env node

const fs = require("fs");

let source = process.argv.splice(2)[0];
let target = source.substring(0, source.lastIndexOf(".")) + ".css";

fs.readFile(source, "utf-8", function(err, data) {
  if (err) throw err;

  let parseSize = input => {
    let newInput = input;
    let startSizes = getIndicesOf("size:", newInput);

    // Doing this in reverse so we don't have to recalculate line numbers
    startSizes.reverse().forEach(s => {
      // get string to replace
      let sizeAllow = s + 5;
      let endLine = newInput.indexOf(";", sizeAllow);
      let toReplace = newInput.substring(s, endLine + 1);

      let replaceWith = parseVals(newInput.substring(sizeAllow, endLine));

      newInput = newInput.replace(toReplace, replaceWith);
    });

    return newInput;
  };

  let parseVals = values => {
    let splitVals = values.trim().split(" ");
    let height = "auto";
    let width = "auto";

    // This ignores anything beyond the first two values if someone passes in more than 2
    if (splitVals.length >= 2) {
      height = splitVals[0];
      width = splitVals[1];
    } else if (splitVals.length === 1) {
      height = splitVals[0];
      width = splitVals[0];
    }

    return `height: ${height};\n  width: ${width};`;
  };

  // Thanks to Stack Overflow user Tim Down for this
  // https://stackoverflow.com/questions/3410464/how-to-find-indices-of-all-occurrences-of-one-string-in-another-in-javascript
  let getIndicesOf = (searchStr, str, caseSensitive) => {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
      return [];
    }
    var startIndex = 0,
      index,
      indices = [];
    if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
    }
    return indices;
  };

  let output = parseSize(data);

  fs.writeFile(target, output, err => {
    if (err) throw err;

    console.log("Compiled " + target + "!");
  });
});
