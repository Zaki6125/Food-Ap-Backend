const categoreyModel = require('../models/categoreyModel');
const categoryController = async (req, res) =>{
  try {
    const {title , imgeUrl} = req.body;
    //validation
    if(!title )
    {
        return res.status(404).send({
            success: false,
            message: "Categorey Data will be required"
        })
    }
    const modelAccessCategory = new categoreyModel.find({title , imgeUrl});
    await modelAccessCategory.save();
    res.status(200).send({
        success: true,
        message: "Categorey Successfully Created!!!"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "This APi is not Found"
    })
  }
}

//Get ALL cat || 
const getAllCategorey = async (req, res)=>{
  try {
    const getCat = await categoreyModel.find({});
    if(!getCat)
    {
      return res.status(404).send({
        success: false,
        message: 'Cat not found'
      });
    }
    res.status(200).send({
      success: true,
      message: 'Catgories will be find',
      totalCat: getCat.length,
      getCat
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "This Api will not find"
    })
  }
}
//Update Categories || method will be put
const updateCatogrey = async (req, res) =>{
  try {
    const {id} = req. params ;
    const {title , imgeUrl} = req.body ;
    const updateCat = await categoreyModel.findByIdAndUpdate(id , {title, imgeUrl} , {new: true});
    if(!updateCat)
    {
      return res.status(404).send({
        success: false,
        message: 'Not Updated data Yet....'
      })
    }
    res.status(200).send({
      success: true,
      message: "Update Successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Api will be not found"
    })
  }
}
//deleteCat || method will be delete
const deleteCat = async (req , res) =>{
   try {
    const {id} = req.params ;
    if(!id)
    {
      return res.status(404).send({
        success: false,
        message: "Id will not found!!!"
      })
    }
    const deleteCat = await categoreyModel.findByIdAndDelete(id);
    if(!deleteCat)
    {
      return res.status(404).send({
        success: false ,
        message: "Not Found"
      });
    }
    res.status(200).send({
      success: true,
      message: "Categorey Will be deleted Successfully !!!"

    })
   } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'This Api will not work'
    })
   }
}
module.exports = {categoryController, getAllCategorey, updateCatogrey,deleteCat}