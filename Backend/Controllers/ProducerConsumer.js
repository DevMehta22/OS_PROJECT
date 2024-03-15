const {Mutex} = require("async-mutex")

let output = [];

class BoundedBuffer{
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
        // console.log(`Produced item: ${item}, Buffer: ${this.buffer}`);
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
        // console.log(`Consumed item:${item}, Buffer:${this.buffer}`);
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
        sleep(Math.random() * 1000);
    }
}

async function consumer(buffer, count) {
    for (let i = 0; i < count; i++) {
        await buffer.consume();
        sleep(Math.random() * 1000);
    }
}

// const simulate = async(res)=>{
//     const buffer = new BoundedBuffer(5);
//     const producer1 = producer(buffer, [1, 2, 3, 4, 5, 6]);
//     const producer2 = producer(buffer, [7, 8, 9, 10]);
//     const consumer1 = consumer(buffer, 8);
//     const consumer2 = consumer(buffer, 6);
//     await Promise.all([producer1, producer2, consumer1, consumer2]);
//     console.log(result)
//     res.status(200).send("success")
// }

const simulate = async(req,res)=>{
    const buffer = new BoundedBuffer(5);
    const { items, count } = req.body; 

    try{const producer1 = producer(buffer,items);
    const consumer1 = consumer(buffer,count);
    await Promise.all([producer1,consumer1])
    res.send(output);
    }catch(err){
        console.log(err);
    }
}

module.exports = {simulate};