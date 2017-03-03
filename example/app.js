import dep1 from './dep1.js';
import dep2 from './dep2.js';

function logMyDeps(d1, d2) {
  console.log(d1, d2, 'yo');
}

logMyDeps(dep1, dep2);
