// Generated by BUCKLESCRIPT VERSION 1.5.2, PLEASE EDIT WITH CARE
'use strict';


function map(f, param) {
  if (param) {
    return /* Cons */[
            f(param[0]),
            map(f, param[1])
          ];
  }
  else {
    return /* Nil */0;
  }
}

function fib(n) {
  if (n === 2 || n === 1) {
    return 1;
  }
  else {
    return fib(n - 1 | 0) + fib(n - 2 | 0) | 0;
  }
}

console.log(fib(10));

export {
  map ,
  fib ,
  
}
/*  Not a pure module */
