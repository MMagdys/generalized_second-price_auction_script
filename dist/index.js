"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("node:readline"));
const node_process_1 = require("node:process");
const AuctionWinner_1 = require("./AuctionWinner");
const getItemCount = (rl) => {
    return new Promise((resolve, reject) => {
        rl.question('Items: ', (answer) => {
            let num = parseInt(answer);
            if (isNaN(num)) {
                console.log("Error! Items should be a number!");
                (0, node_process_1.exit)();
            }
            resolve(num);
        });
    });
};
const enterBid = (rl, items, bids) => (line) => {
    if (line == "") {
        rl.close();
    }
    if (line.length < 3) {
        console.log("Invalid entry");
        return;
    }
    const tokens = tokenizeLine(line);
    if (!tokens) {
        console.log("Invalid entry");
        return;
    }
    const bid = verifyToken(tokens);
    if (!bid) {
        console.log("Invalid entry");
        return;
    }
    bids.push(bid);
};
const showWinners = (items, bids) => {
    const winners = (0, AuctionWinner_1.calculateWinners)(items, bids);
    console.log(winners);
    return;
};
const tokenizeLine = (line) => {
    const trimmedLine = line.trim();
    const splitIndex = trimmedLine.lastIndexOf(' ');
    if (splitIndex == -1) {
        return null;
    }
    const name = trimmedLine.slice(0, splitIndex);
    const amount = trimmedLine.slice(splitIndex + 1);
    return {
        name,
        amount
    };
};
const verifyToken = (token) => {
    const amount = parseInt(token.amount);
    if (isNaN(amount)) {
        return null;
    }
    return {
        name: token.name,
        amount
    };
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
    let bids = [];
    const items = yield getItemCount(rl);
    rl.on('line', enterBid(rl, items, bids));
    rl.on('close', () => { showWinners(items, bids); (0, node_process_1.exit)(); });
});
main();
