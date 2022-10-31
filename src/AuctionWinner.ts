export interface Bid{
    name: string;
    amount: number;
}


const calculateWinners = (items: number, bids: Bid[]): string => {

    if(bids.length < items) {
        return "No Winners";
    }

    const sortedBids = bids.sort( BidAmountNameSorter );
    const winners = stringfyWinners(items, sortedBids);

    return winners;
}


const stringfyWinners = (items: number, bids: Bid[]): string => {

    let stringfiedWinners = "";

    for (let i = 0; i < bids.length; i++) {
        const bid = bids[i];
        if(i < items) {
            stringfiedWinners += `${bid.name} ${bids[i+1].amount}\n`;
            continue;
        }
        stringfiedWinners += `${bid.name} Lost\n`;
    }

    return stringfiedWinners.trim();
}


function BidAmountNameSorter(a: Bid, b: Bid) {

    if ( a.amount > b.amount ){
      return -1;
    }
    if ( a.amount < b.amount ){
      return 1;
    }
    
    if ( a.name < b.name ){
        return -1;
    }
    if ( a.name > b.name ){
        return 1;
    }

    return 0;
}

export {
    calculateWinners
}