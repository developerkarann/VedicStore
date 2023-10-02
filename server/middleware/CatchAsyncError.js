module.exports = TheErrFunc => (req, res, next) => {

    Promise.resolve(TheErrFunc(req, res, next)).catch(next)
}