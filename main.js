const Automerge = require('@automerge/automerge');

function counterPerformance() {
	let doc1 = Automerge.init();
	let doc2 = Automerge.init();
	
	doc1 = Automerge.change(doc1, (doc) => {
		// The counter is initialized to 0 by default. You can pass a number to the
		// Automerge.Counter constructor if you want a different initial value.
		doc.counter = new Automerge.Counter();
	});
	
	doc2 = Automerge.change(doc2, (doc) => {
		doc.counter = new Automerge.Counter();
	});
	
	doc1 = Automerge.change(doc1, (doc) => {
		doc.counter.decrement(10);	// Decrement 10 to counter value
		doc.counter.increment(1); 	//Add 1 to counter
	});
	doc2 = Automerge.change(doc2, (doc) => {
		doc.counter.increment(1); 	//Increment 1 to counter
		doc.counter.decrement(10); // Subtract 10 from counter value
		doc.counter.increment(1); 	// Add 1 to counter value
	});
	
	var startTime = performance.now();
	let finalDoc = Automerge.merge(doc1, doc2);
	var endTime = performance.now();
	
	console.log(`Final counter value: ${finalDoc.counter.value}`);

	return endTime - startTime;
}

function registerPerformance() {
	// semantics is random:
	// https://automerge.org/docs/cookbook/conflicts/
	let doc1 = Automerge.change(Automerge.init(), doc => {
		doc.x = 1
	})
	let doc2 = Automerge.change(Automerge.init(), doc => {
		doc.x = 2
	})

	var startTime = performance.now();
	doc1 = Automerge.merge(doc1, doc2)
	var endTime = performance.now();

	console.log(`Final register value: ${doc1.x}`);

	return endTime - startTime;
}

console.log(`Time to merge: ${counterPerformance()} milliseconds`);
console.log(`Time to merge: ${registerPerformance()} milliseconds`);

