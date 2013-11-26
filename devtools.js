var devtools = (function () {

function _forEachDo (list,func,args) {
    if (typeof list.length === undefined) {
      return undefined;
    }
    if (typeof func !== 'function') {
      return undefined;
    }
    var itr,len,item,results;
    itr = 0;
    len = list.length;

    for (itr; itr < len; itr += 1 ) {
      item = list[itr];
      func.apply(null,[item,itr,args,list]);
    }
};
function _forEachGet (list,func,args) {
    if (typeof list.length === undefined) {
      return undefined;
    }
    if (typeof func !== 'function') {
      return undefined;
    }
    var itr,len,item,results;
    itr = 0;
    len = list.length;
    results = [];
    for (itr; itr < len; itr += 1 ) {
      item = list[itr];
      results.push(func.apply(null,[item,itr,args,list]));
    }
    return results;
};

function _replace (str,token,list) {
  var broken = str.split('');
  broken.forEach(function(char,index){
    if (char === token) {
        broken[index] = list.shift() || '';
    }
  });
  return broken.join('');
}
function _replaceEx (str,data) {
  var regEx = new RegExp("(%[A-Za-z0-9_]+?%)");
  var broken = str.split(regEx);
  var key = '';
  broken.forEach(function(item,index){
    if(item && regEx.test(item)) {
      key = item.replace(/\%/g,'')
      if ( key in data ) {
        broken[index] = data[key];
      } else {
        broken[index] = '';
      }
    }
  });
  return broken.join('');
}


function _replaceKeys(s,keys){
  var broken = s.split(/(%)/g),
      whole = [],
      key = '',
      len = broken.length,
      itr = 0,
      next = 0;
  do {
    if (broken[itr] !== '%') {
      whole.push(broken[itr]);
      itr += 1;
    } else {
      next = broken.indexOf('%',itr+1);
      if (next === itr + 2) {
        whole.push(keys[broken[itr+1]]);
        itr += 3;
      } else {
        itr += 1;
      }
    } 
  } while ( itr < len);
  return whole.join('');
}

  return {
    forEachDo:_forEachDo,
    forEachGet:_forEachGet,
    replace:_replace,
    replaceEx:_replaceEx,
    replaceKeys:_replaceKeys
  };
}());
