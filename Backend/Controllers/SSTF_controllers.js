let requests=[];
let final = [];

const Simulate=(req,res)=>{
    const {Track_nos,Start_Track,End_Track,Header_position}=req.body;
    try{
        if(requests.length==0){
        requests.push(Start_Track);
        }
        for(const track of Track_nos){
        requests.push(parseInt(track));
        }
        requests.push(parseInt(End_Track)-1);
        final.push(parseInt(Header_position));
        requests.sort((a,b)=>a-b);
        console.log(requests);
        let next_track = requests[1];
        let cp = Header_position;
        let req_length = requests.length-1
        while(final.length!=req_length){
            let i = 1;
            while (i<requests.length-1) {
                if (Math.abs(cp - requests[i]) < Math.abs(cp - next_track)) {
                    next_track = requests[i];
                }
                i++;
            }
            final.push(next_track);
            cp = next_track;
            for (let i = 0; i < requests.length; i++) {
                if (requests[i] == next_track) {
                    requests.splice(i,1);
                }
            }
            next_track = requests[1];
        }
        // console.log(final);
        // console.log(requests);
        return res.status(201).json({"final queue":final});
    }catch(err){
        console.log(err);
        return res.status(422).send({error: 'Invalid data'});
    }
}

module.exports  = {Simulate};