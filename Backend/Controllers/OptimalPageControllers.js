
const OptimalPage = async(req,res)=>{
    const {Frames,pages} = req.body
    
    if(!Frames || !pages){
        return res.status(400).json({msg:"Please provide Frames and Pages data"})
    }

    let pn = pages.length;
    let frame = [];
	let fn = Frames;
	
    let hit = 0;
	    for (let i = 0; i < pn; i++) {
		if (search(pages[i], frame)) {
			hit++;
			continue;
		}

		if (frame.length < fn) {
			frame.push(pages[i]);
		}else {
			let j = checkPage(pages, frame, pn, i + 1);
			frame[j] = pages[i];
		}
	}
    let Miss = pn - hit
    res.status(200).json({"Miss": Miss,"Hit":hit});


    function search(page, frame) {
	    for (let i = 0; i < frame.length; i++) {
		    if (frame[i] === page) {
			    return true;
		    }
	    }
	    return false;
    }

    function checkPage(pg, fr, pn, index) {
	    let res = -1, farthest = index;
	    for (let i = 0; i < fr.length; i++) {
		    let j;
		    for (j = index; j < pn; j++) {
			    if (fr[i] === pg[j]) {
				    if (j > farthest) {
					    farthest = j;
					    res = i;
				    }
				    break;
			    }
		    }
		    if (j === pn) {
			    return i;
		    }
	    }
	    return (res === -1) ? 0 : res;
    }   
}

module.exports = {OptimalPage}