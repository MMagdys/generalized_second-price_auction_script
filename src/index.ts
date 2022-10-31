import * as readline from 'node:readline'
import { exit, stdin as input, stdout as output } from 'node:process'
import { Bid, calculateWinners } from './AuctionWinner';

type ReadLine = readline.Interface
interface Token {
	name: string;
	amount: string;
}



const getItemCount = (rl: ReadLine): Promise<number> => {

	return new Promise((resolve, reject) => {
		rl.question('Items: ', (answer) => {
			let num = parseInt(answer);
			if(isNaN(num)) {
				console.log("Error! Items should be a number!");
				exit();
			}
			resolve(num)
	  	})
	})
}


const enterBid = (rl: ReadLine, items: number, bids: Bid[]) => (line: string) => {

	if(line == "") {
		rl.close();
	}

	if(line.length < 3) {
		console.log("Invalid entry");
		return;
	}

	const tokens = tokenizeLine(line);
	if(!tokens) {
		console.log("Invalid entry");
		return;
	}

	const bid = verifyToken(tokens);
	if(!bid) {
		console.log("Invalid entry");
		return;
	}

	bids.push(bid);
}


const showWinners = (items: number, bids: Bid[]) => {

	const winners = calculateWinners(items, bids);
	console.log(winners);
	return;
}


const tokenizeLine = (line: string): Token | null => {

	const trimmedLine = line.trim()
	const splitIndex = trimmedLine.lastIndexOf(' ');

	if(splitIndex == -1 ) {
		return null;
	}

	const name = trimmedLine.slice(0, splitIndex);
	const amount = trimmedLine.slice(splitIndex + 1);

	return {
		name,
		amount
	}
}


const verifyToken = (token: Token): Bid | null => {

	const amount = parseInt(token.amount);

	if(isNaN(amount)) {
		return null;
	}
	
	return {
		name: token.name,
		amount
	}
}


const main = async () => {

	const rl = readline.createInterface({ input, output })

	let bids: Bid[] = [];
	const items: number = await getItemCount(rl);

	rl.on('line', enterBid(rl, items, bids));
	rl.on('close', () => { showWinners(items, bids); exit(); });
}


main()