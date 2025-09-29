exports.getAllData = (req, res)=>{
    try {
        res.status(200).send({
            id: true,
            message: 'Data will be Uploaded'
        })
    } catch (error) {
        console.log("Error Will be occur :" , error);
    }
}