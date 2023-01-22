import pkg from 'sqlite3'
const sqlite3 = pkg.verbose()

/**
 * filename:
 * Valid values are filenames,
 * ":memory:" for an anonymous in-memory database and an empty
 * string for an anonymous disk-based database. Anonymous databases
 * are not persisted and when closing the database handle, their
 * contents are lost.
 */
const DB_SOURCE = './src/database/reading.sqlite'
/**
 * mode (optional): One or more of
 * - sqlite3.OPEN_READONLY,
 * - sqlite3.OPEN_READWRITE,
 * - sqlite3.OPEN_CREATE,
 * - sqlite3.OPEN_FULLMUTEX,
 * - sqlite3.OPEN_URI,
 * - sqlite3.OPEN_SHAREDCACHE,
 * - sqlite3.OPEN_PRIVATECACHE.
 *
 * The default value is OPEN_READWRITE | OPEN_CREATE | OPEN_FULLMUTEX.
 *
 */
const MODE = sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE

/**
 * callback (optional): If provided
 * This function will be called when the database was opened successfully or
 * when an error occurred. The first argument is an error object.
 * When it is null, opening succeeded. If no callback is provided and an
 * error occurred, an error event with the error object as the only parameter
 * will be emitted on the database object. If opening succeeded, an open event
 * with no parameters is emitted, regardless of whether a callback was provided
 * or not.
 */
/* istanbul ignore next */
const callBack = (err) => {
    if (err) return console.error('ERROR', err.message)
}

export default (function () {
    const SQLITE = new sqlite3.Database(DB_SOURCE, MODE, callBack)
    return function (req, res, next) {
        console.log('[SQLITE]: ', SQLITE)
        res.sqlite = SQLITE
        next()
    }
})()
