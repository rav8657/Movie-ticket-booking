import theatreModel from '../Models/theatreModel.js';


export const createTheatre = async(req,res)=>{
    try{
        let adminId = req.params.adminId;
        let adminIdFromToken = req.adminId
        if(adminId !== adminIdFromToken){
            return res.status(401).send({message:`unauthorized access! Admin info doesn't match`})
        }
        const theatre = await theatreModel.create(req.body);
        res.status(201).send(theatre);
    }catch(error){
        return res.status(500).send({
            message: error.message
        });
    }
}
