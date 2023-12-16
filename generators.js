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

// console.log("setting genAddOneFn");
// console.log(genAddOneFn);

// console.log("Calling next for the first time");
// console.log(`Calling next return value: ${genAddOneFn.next().value}`);

// console.log("Calling next");
// console.log(`Calling next return value: ${genAddOneFn.next().value}`);
// console.log();

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

// console.log("fetching random data");
// console.log(randomDataGenerator.next());
// console.log(randomDataGenerator.next());
// randomDataGenerator.throw(new Error('An error has occured'));
// console.log(randomDataGenerator.next());
// console.log("");

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
// console.log(genFnComposition.next()); // A
// console.log(genFnComposition.next()); // B
// console.log(genFnComposition.next()); // C
// console.log(genFnComposition.next()); // 1
// console.log(genFnComposition.next()); // 3
// console.log(genFnComposition.next()); // 2



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





function zip(...arrays){
  const maxLength = Math.max(...arrays.map(array => array.length));
  return Array.from({length: maxLength}).map((_,i) => {
    return Array.from({length:arrays.length},(_,j) => arrays[j][i]);
  })
}


const zipExample = () => {

  const xCoordinates = [1, 2, 3, 4];
  const yCoordinates = [5, 6, 7, 8];
  const zCoordinates = [3, 6, 1, 7];

  const points = zip(xCoordinates,yCoordinates,zCoordinates);

  console.log(points);

}

// zipExample();


/* CUSTOM ITERABLE ITERATIONS */
const cardDeck = {
  suits: ["C", "D", "H", "S"],
  court: ["J","Q","K","A"],
  [Symbol.iterator]: function* () {
    for (let suit of this.suits) {
      for (let i = 2;i <=10; i++) yield suit + i;
      for (let c of this.court) yield suit + c;
    }
  }
}
// console.log([...cardDeck]);



/* LAZY EVALUATION OR INFINITE SEQUENCES */
function* infinityAndBeyond(){
  let i = 1;
  while (true) {
    yield i++;
  }
} 
function* take(n,iterable){
  for (let item of iterable){
    if (n <= 0) return;
    n--;
    yield item;
  }
}
function* map(iterable,fn) {
  for (let item of iterable){
    yield fn(item);
  }
}
let taken = [...take(5,infinityAndBeyond())];
let squares = [...take(9,map(infinityAndBeyond(),(x) => x * x))];

// console.log(taken);
// console.log(squares);


/* RECURSIVE EXAMPLE */
function binaryTreeNode(value){
  let node = { value };
  node[Symbol.iterator] = function* depthFirst(){
    yield node.value;
    if (node.leftChild) yield* node.leftChild;
    if (node.rightChild) yield* node.rightChild;
  }
  return node;
}
const root = binaryTreeNode("root");
root.leftChild = binaryTreeNode("branch left");
root.rightChild = binaryTreeNode("branch right");
root.leftChild.leftChild = binaryTreeNode("leaf L1");
root.leftChild.rightChild = binaryTreeNode("leaf L2");
root.rightChild.leftChild = binaryTreeNode("leaf R1");

// console.log([...root]);


const getSwapiPagerator = (endpoint) =>
  async function* () {
    let nextUrl = `https://swapi.dev/api/${endpoint}`;
    while (nextUrl) {
      const response = await fetch(nextUrl);
      const data = await response.json();
      nextUrl = data.next;
      yield* data.results;
    }
  }
  starWars = {
    characters: {
      [Symbol.asyncIterator]: getSwapiPagerator("people")
    },
    planets: {
      [Symbol.asyncIterator]: getSwapiPagerator("planets")
    },
    ships: {
      [Symbol.asyncIterator]: getSwapiPagerator("starships")
    }
  }

  // (async function () {
  //   const results = [];
  //   for await (const page of starWars.ships) {
  //     console.log(page.name);
  //     results.push(page.name);
  //     debugger;
  //     yield results
  //   }
  // })();

  
  function* listener() {
    console.log("listening...");
    while (true) {
      let msg = yield;
      console.log('heard:', msg);
    }
  }
  
  let l = listener();
  l.next('are you there?'); // listening...
  l.next('how about now?'); // heard: how about now?
  l.next('blah blah'); // heard: blah blah



  function* bankAccount() {
    let balance = 0;
    while (balance >= 0){
      balance += yield balance;
    }
    return "bankrupt";
  }

  let acct = bankAccount();
  console.log(acct.next());
  console.log(acct.next(50));
  console.log(acct.next(-10));
  console.log(acct.next(-60));




  /* */
  let players = {};
  let queue = [];

  function send(name,msg){
    console.log(msg);
    queue.push([name,msg]);
  }

  function run() {
    while (queue.length) {
      let [name,msg] = queue.shift();
      players[name].next(msg);
    }
  }

  function* knocker() {
    send('asker','knock knock');
    let question = yield;
    if (question !== "who's there?") return;
    send('asker','gene');
    question = yield;
    if (question !== "gene who?") return;
    send('asker','generator!');
  }

  function* asker() {
    let knock = yield;
    if (knock !== 'knock knock') return;
    send('knocker',"who's there?");
    let answer = yield;
    send('knocker', `${answer} who?`);
  }

  players.knocker = knocker();
  players.asker = asker();
  send('asker','ask get ready...');
  send('knocker','knocker go!');
  run();
