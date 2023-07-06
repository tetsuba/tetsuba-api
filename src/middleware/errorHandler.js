/* NOTE:
 * Removing the parameter {next} will break errorHandler.
 * TODO: investigate why
 *  */
// eslint-disable-next-line no-unused-vars
export default function errorHandler(error, req, res, next) {
    let message = {}
    /* istanbul ignore next */
    switch (error.status) {
        case 400:
            message = {
                success: false,
                status: 400,
                message: 'Bad request',
                stack: error.stack
            }
            break
        case 401:
            message = {
                success: false,
                status: 401,
                message: 'Unauthorized',
                stack: error.stack
            }
            break
        case 500:
            message = {
                success: false,
                status: 500,
                message: 'Internal Server Error',
                stack: error.stack
            }
            break
        default:
            /* istanbul ignore next */
            message = {
                success: false,
                status: 0,
                message: 'Error message not available',
                stack: ''
            }
    }

    res.status(error.status).json(message)
}
