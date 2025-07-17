const existeModelById = (modelo) =>{
    return async (req,res,next) =>{
        const { id } = req.params
        const model = await modelo.findById(id)
        if(!model) {
            return res.status(404).json({message: `No existe el registro: ${modelo.modelName} con Id: ${id}`})
        }
        next()
    }
}


module.exports = {existeModelById}