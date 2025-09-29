const resturentModel = require("../models/resturentModel");

//create the resutarent controller
const creatRestuarentController = async (req, res)=>{
try {
   //crerate the user for restuarent
    const {title,imgeUrl,foods,time,pickUp,delivery,isOpen,logoUrl,rating,ratingCount,code,coodrs} = req.body;
    //validation the data
    if(!title || ! coodrs)
    {
        return res.status(400).send({
            success: false,
            message: "title and coorde will required"
        });
    }
    //craete the restuarent 
    const Resturent = new resturentModel({
        title,imgeUrl,foods,time,pickUp,delivery,isOpen,logoUrl,rating,ratingCount,code,coodrs
    });
    await Resturent.save();
    res.status(200).send({
        success: true,
        message: "Resturent create Successfully!!!"
    })

} catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Error in Create restuarent Api"
    })
}
}
//getAll resturent
const getAllResturentController = async(req, res)=>{
    try {
        const resturents  = await resturentModel.find({});
        if(!resturents )
        {
            return resturents .status(404).send({
                success: false,
                message: "No Resturent Avalible"
            });
        }
        res.status(200).send({
            success: true,
            totalCount : resturents.length ,
            data: resturents ,
            message: "Resturent find Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:"Error in get All resturent Api"
        })
    }
}
//get resturent with id
const getResturentWithIdController = async(req, res)=>{
    try {
        const resturentId = req.params.id ;
        if(!resturentId)
        {
            return res.status(404).send({
                success: false,
                message: "Id not found"
            })
        }
        const resturent = await resturentModel.findById(resturentId);
        if(!resturent)
            {
                return res.status(404).send({
                    success: false,
                    message: "This Resturent Id will be not find"
                });
            } 
            res.status(200).send({
                success: true,
                message: "Resturent Find Successfully!!",
                resturent
            });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get ALL resturent APi"
        })
    }
}
//delete resturent data
const deleteResturentController = async (req, res) =>{
    try {
        const deleteId = req.params.id;
        if(!deleteId)
        {
            return res.status(404).send({
                success: false,
                message: "Give valid Id "
            })
        }
        const deleteRest = await resturentModel.findByIdAndDelete(deleteId);
        if(!deleteRest)
        {
            return res.status(404).send({
                success: false,
                message: "This Id is not in DB"
            })
        }
        res.status(200).send({
            success: true,
            message: "Resturent Successfully deleted!!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete resturent Api"
        });
    }
}
module.exports = {creatRestuarentController, getAllResturentController, getResturentWithIdController,deleteResturentController}