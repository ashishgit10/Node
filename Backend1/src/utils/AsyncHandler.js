
const asynchandler = (reqHandler) => {
   return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next)).
            catch((err) => next(err))
    }
}


//HIGHER ORDER FUNCTION
/* const asynchandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (err) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
} */

export default asynchandler