
function print(line) {}
function start() {
  var jq = $;

  stdout_func = function(){};
  stderr_func = function(){};

  var a = new luaz();
  Lua = a.Lua;
  Lua.initialize(null, function (chr) {
    if (chr !== null) stdout_func(chr);
  }, function (chr) {
    if (chr !== null) stderr_func(chr);
  });

  var l$ = $;
  $ = jq;

  luaeval = function(val, outfunc) {
    stdout_func = outfunc;
    stderr_func = outfunc;
    $ = l$;
    var input = {value:val};
    var output = {value: ""};
    if (Lua.isFinished(input.value)) {
      output.value = '';
      var result = Lua.eval(input.value);
      if (result !== null && result !== undefined) {
        output.value += '\n--------------------------\nResult: ' + result;
      }
    } else {
      output.value = 'Command not finished.';
    }
    console.log('eval end');
    $ = jq;
  }
}

window.onload = start;