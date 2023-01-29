const Automerge = require('@automerge/automerge');

let doc1 = Automerge.init();
let doc2 = Automerge.init();

doc1 = Automerge.change(doc1, (doc) => {
	// The counter is initialized to 0 by default. You can pass a number to the
	// Automerge.Counter constructor if you want a different initial value.
	doc.buttonClicks = new Automerge.Counter();
});

doc2 = Automerge.change(doc2, (doc) => {
	// The counter is initialized to 0 by default. You can pass a number to the
	// Automerge.Counter constructor if you want a different initial value.
	doc.buttonClicks = new Automerge.Counter();
});

doc1 = Automerge.change(doc1, (doc) => {
	doc.buttonClicks.decrement(10); // Decrement 10 to counter value
	doc.buttonClicks.increment(1); //Add 1 to counter
});
doc2 = Automerge.change(doc2, (doc) => {
	doc.buttonClicks.increment(1); //Increment 1 to counter
	doc.buttonClicks.decrement(10); // Subtract 10 from counter value
	doc.buttonClicks.increment(1); // Add 1 to counter value
});

var startTime = performance.now();
let finalDoc = Automerge.merge(doc1, doc2);
var endTime = performance.now();

console.log('final doc');
console.log(finalDoc);

console.log(`Time to merge: ${endTime - startTime} milliseconds`);
