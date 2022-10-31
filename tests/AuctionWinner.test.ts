import { calculateWinners } from '../src/AuctionWinner';


test('Winner calculation: Happy scenario',async () => {

    const items = 3;
    const bids = [
        {
            name: "John Doe",
            amount: 100
        },
        {
            name: "John Smith",
            amount: 500
        },
        {
            name: "Sara Conor",
            amount: 280
        },
        {
            name: "Martin Fowler",
            amount: 320
        }
    ]

    const expectedWinners = "John Smith 320\n\
Martin Fowler 280\n\
Sara Conor 100\n\
John Doe Lost"
    
    const winners = calculateWinners(items, bids);
    expect(winners).toStrictEqual(expectedWinners);
})


test('Winner calculation: Tie breaking',async () => {

    const items = 3;
    const bids = [
        {
            name: "John Doe",
            amount: 500
        },
        {
            name: "John Smith",
            amount: 500
        },
        {
            name: "Sara Conor",
            amount: 580
        },
        {
            name: "Martin Fowler",
            amount: 320
        },
        {
            name: "Muhammad Magdy",
            amount: 800
        }
    ]

    const expectedWinners = "Muhammad Magdy 580\n\
Sara Conor 500\n\
John Doe 500\n\
John Smith Lost\n\
Martin Fowler Lost"

    const winners = calculateWinners(items, bids);
    expect(winners).toStrictEqual(expectedWinners);
})


test('Winner calculation: Number of Bids should be greater than the items',async () => {

    const items = 3;
    const bids = [
        {
            name: "John Doe",
            amount: 100
        },
        {
            name: "John Smith",
            amount: 500
        },
        {
            name: "Sara Conor",
            amount: 280
        },
        {
            name: "Martin Fowler",
            amount: 320
        }
    ]

    let winners = calculateWinners(items, []);
    expect(winners).toBe("No Winners");

    winners = calculateWinners(items, bids.slice(0,1));
    expect(winners).toBe("No Winners");

    winners = calculateWinners(items, bids.slice(0,2));
    expect(winners).toBe("No Winners");

    winners = calculateWinners(items, bids);
    expect(winners).not.toBe("No Winners");
})