/**
 * GENERATORS IN JAVASCRIPT
 * 
 *  generators are object that are returned from calling a special generator function. 
 *  the benifit of generator objects is that it allows you to start, pause and stop
 *  a functions execution;
 * 
 *  Syntax for creating a generator function: EX function* generatorFunctionName(){}
 * 
 *  The * character after the function declaration signifies a generator function from a normal function declaration
 * 
 *  You interact with the generator object by calling the .next() method on it
 *  You can also call the .throw() method as well to throw an error
 *    - genObj.throw(new Error('Error message'));
 *  You can use the .return() method to end a generators execution early
 *    - genObj.return(1000) ~ returns {value: 1000, done: true}
 * 
 * - it allows you to create a function that can return multiple values each time you call but maintain state from the mulple calls
 * - you can iterate over the function by calling .next() on the generator function
 * - Ideal for infinte data streams
 * - Supports throwing errors
 * - Works well with Synchronous and Asynchronous data
 * - Generator composition is supported
 *    
 *    
 *    
 * 
 */

function* exampleFn(){
  yield 1;
  yield 2;
  yield 3;
}

const genExampleFN = exampleFn();
let isData = true;
while(isData){  
  let nextData = genExampleFN.next();
  if (nextData.done){
    console.log("No more data");
    console.log("");
    isData = false;    
  }else{
    console.log(`Example value: ${nextData.value}`);
  }
}



function* addOne(_startValue,_endValue){
  
  var acc = _startValue ? _startValue : 0;

  while(true){
    
    if(_endValue && (_startValue === _endValue)){

      return;

    }

    yield acc;

    acc++;

  }

}

const genAddOneFn = addOne(0,10);

console.log("setting genAddOneFn");
console.log(genAddOneFn);

console.log("Calling next for the first time");
console.log(`Calling next return value: ${genAddOneFn.next().value}`);

console.log("Calling next");
console.log(`Calling next return value: ${genAddOneFn.next().value}`);
console.log();

/* .throw() can be changed to generator functiona  */

function* fetchRandomData(){
  try {
    let randomData;     
    yield "this is random data: " + (Math.random() * 100);
    yield "this is random data: " + (Math.random() * 100);
    yield "this is random data: " + (Math.random() * 100);
    yield "this is random data: " + (Math.random() * 100);
    yield "this is random data: " + (Math.random() * 100);
    yield "this is random data: " + (Math.random() * 100);
  } catch (error) {
    console.error('fetchRandomData encountered an error!!',error.message);
  }
}

const randomDataGenerator = fetchRandomData();

console.log("fetching random data");
console.log(randomDataGenerator.next());
console.log(randomDataGenerator.next());
randomDataGenerator.throw(new Error('An error has occured'));
console.log(randomDataGenerator.next());
console.log("");

/* Generator Composition */
console.log("Generator Composition Example");
function* generateCharacters(){
  yield 'A';
  yield 'B';
  yield 'C';
}

function* generateNumbers(){
  yield 1;
  yield 3;
  yield 2;
}

function* generateDataSequence(){
  yield* generateCharacters();
  yield* generateNumbers();
}

const genFnComposition = generateDataSequence();
console.log(genFnComposition.next()); // A
console.log(genFnComposition.next()); // B
console.log(genFnComposition.next()); // C
console.log(genFnComposition.next()); // 1
console.log(genFnComposition.next()); // 3
console.log(genFnComposition.next()); // 2



/* async example from https://medium.com/stackademic/dont-be-afraid-of-javascript-generators-15c998aea652 */

async function fetchItems(currentItem){
  const items = Array.from({length:10},(_,i) => ({id:i,name:`item ${i}`}));
  Promise.resolve(items);
}

async function* fetchItemsPerPage(){
  let currentItem = 0;
  while(true){    
    const response = await fetchItems(1);
    const items = response;
    if (items.length === 0) {
      return;
    }
    yield items;
    currentItem++;
  }
}
