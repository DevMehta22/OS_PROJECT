const {Mutex} = require("async-mutex")

let output = [];

class Moniter{
    constructor(size){
        this.size = size;
        this.buffer = [];
        this.lock  = new Mutex();
        this.count = 0;
    }

    async produce(item){
        await this.lock.acquire();
        while (this.buffer.length == this.size) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        this.buffer.push(item);
        console.log(`Produced item: ${item}, Buffer: ${this.buffer}`);
        output.push(`Produced item: ${item}, Buffer: ${this.buffer}`);
        this.count++;
        this.lock.release();
    }

    async consume(){
        await this.lock.acquire();
        while (this.buffer.length == 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        const item = this.buffer.shift();
        console.log(`Consumed item:${item}, Buffer:${this.buffer}`);
        output.push(`Consumed item: ${item}, Buffer: ${this.buffer}`);
        this.count--;
        this.lock.release();
        return item;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function producer(buffer, items) { 
    for (const item of items) {
        await buffer.produce(item);
        await sleep(1000);
    }
}

async function consumer(buffer, count) {
    for (let i = 0; i < count; i++) {
        await buffer.consume();
        await sleep(3000);
    }
}

// const simulate = async(res)=>{
//     const buffer = new Moniter(5);
//     const producer1 = producer(buffer, [1, 2, 3, 4, 5, 6]);
//     const producer2 = producer(buffer, [7, 8, 9, 10]);
//     const consumer1 = consumer(buffer, 8);
//     const consumer2 = consumer(buffer, 6);
//     await Promise.all([producer1, producer2, consumer1, consumer2]);
//     console.log(result)
//     res.status(200).send("success")
// }

const simulate = async(req,res)=>{
    let buffer = new Moniter(15);
    let { items, count } = req.body; 

    try{let producer1 = producer(buffer,items);
    let consumer1 = consumer(buffer,count);
    await Promise.all([producer1,consumer1])
    res.send(output);
    }catch(err){
        console.log(err);
    }
}

module.exports = {simulate};