export interface Bid{
    name: string;
    amount: number;
}


const calculateWinners = (items: number, bids: Bid[]) => {

    return naiveApproach(items, bids);
}


const naiveApproach = (items: number, bids: Bid[]) => {

    return []
}


export {
    calculateWinners
}