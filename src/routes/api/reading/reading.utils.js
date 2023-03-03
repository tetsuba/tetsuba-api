import moment from 'moment'
import sightWords from '../../../database/sightWords.js'
import library from '../../../database/static/library.js'

function compose(...func) {
    return (arg) => func.reduceRight((a, f) => f(a), arg)
}

export function getWordsFromBooks(lib) {
    return lib
        .map((collection) => collection.books)
        .flat()
        .reduce((acc, book) => {
            return `${acc} ${book.story}`
        }, '')
        .split(' ')
        .map((word) =>
            word
                .replace(/^\W/, '')
                .replace(/\W$/, '')
                .replace(/\W$/, '')
                .toLowerCase()
        )
        .filter((word) => word !== '')
}

export function countDuplicateWords(words) {
    return words.reduce((acc, word) => {
        const update = acc.some((obj) => obj.word === word)
        if (update) {
            acc.forEach((obj, i) => {
                if (obj.word === word) {
                    acc[i] = { ...obj, index: obj.index + 1 }
                }
            })
        } else {
            acc.push({ word, index: 1 })
        }
        return acc
    }, [])
}

export function removeDuplicates(words) {
    return [...new Set(words)]
}

function getSightWordsFromBooks(words) {
    return words.filter((word) =>
        sightWords.map((sightWord) => sightWord.toLowerCase()).includes(word)
    )
}

function getSightWordsNotInList(words) {
    return sightWords.filter(
        (sightWord) => !words.includes(sightWord.toLowerCase())
    )
}

function getBooksRead(lib, history) {
    return history
        ? lib
              .filter((collection) =>
                  history.some((book) => collection.id === book.libId)
              )
              .map((collection) => ({
                  ...collection,
                  books: collection.books.filter((storyBook) =>
                      history.some(
                          (book) =>
                              collection.id === book.libId &&
                              storyBook.id === book.bookId
                      )
                  )
              }))
        : []
}

export function updateWithTrackingData(library, data) {
    return library.map((collection) => {
        return {
            ...collection,
            books: collection.books.map((book) => {
                const tracker = data.filter(
                    (item) =>
                        item.libId === collection.id && item.bookId === book.id
                )
                if (tracker.length) {
                    return {
                        ...book,
                        history: tracker[0].history
                    }
                }
                return book
            })
        }
    })
}

function isBookTracked(data, json) {
    return data.some(
        (item) => item.libId === json.libId && item.bookId === json.bookId
    )
}

export function updateTrackerData(trackerData, json) {
    if (trackerData) {
        const data = JSON.parse(trackerData)
        // Existing book tracking to update
        if (isBookTracked(data, json)) {
            return data.map((item) => {
                if (item.libId === json.libId && item.bookId === json.bookId) {
                    return {
                        ...item,
                        history: json.history
                    }
                }
                return item
            })
        }
        // New book to track
        return [...data, json]
    }
    // When data is null
    return [json]
}

function getWords(books) {
    return books
        ? books
              .map((book) => book.history.map(({ words }) => words))
              .flat()
              .flat()
        : []
}

function dateIsAfterOne(unit, date) {
    const oneWeek = moment().subtract(1, unit)
    return moment(date, 'DD/MM/YYYY').isAfter(oneWeek)
}

function convertToWordsReadIncorrectly(acc, book) {
    if (dateIsAfterOne('week', book.date)) {
        return {
            ...acc,
            oneWeekAgo: acc.oneWeekAgo.concat(book.words)
        }
    } else if (dateIsAfterOne('month', book.date)) {
        return {
            ...acc,
            oneMonthAgo: acc.oneMonthAgo.concat(book.words)
        }
    } else {
        return {
            ...acc,
            history: acc.history.concat(book.words)
        }
    }
}

function countDuplicateWordsInObject(obj) {
    const keys = Object.keys(obj)
    return keys.reduce((o, key) => {
        return {
            ...o,
            [key]: countDuplicateWords(o[key])
        }
    }, obj)
}

export function getLastBookRead(row) {
    if (row && row.data) {
        const data = JSON.parse(row.data)
        return data.reduce(
            (capture, book) => {
                const compareDate = moment(capture[0].date, 'DD/MM/YYYY')
                book.history.forEach((data) => {
                    if (moment(data.date, 'DD/MM/YYYY').isAfter(compareDate)) {
                        capture = [
                            {
                                date: data.date,
                                bookId: book.bookId,
                                libId: book.libId,
                                words: data.words
                            }
                        ]
                    } else if (
                        moment(data.date, 'DD/MM/YYYY').isSame(compareDate)
                    ) {
                        capture = capture.concat([
                            {
                                date: data.date,
                                bookId: book.bookId,
                                libId: book.libId,
                                words: data.words
                            }
                        ])
                    }
                })
                return capture
            },
            [{ date: '23/02/2023' }]
        )
    }
    return []
}

export function getBookTitle(lastBookRead, lib) {
    return lastBookRead.map((bookRead) => {
        const title = lib
            .find((collection) => collection.id === bookRead.libId)
            .books.find((book) => book.id === bookRead.bookId).title

        return {
            ...bookRead,
            title
        }
    })
}

function getWordsFromTracker(row) {
    const wordsReadIncorrectly = {
        oneWeekAgo: [],
        oneMonthAgo: [],
        history: []
    }
    if (row && row.data) {
        const data = JSON.parse(row.data)
        return data
            .map((book) => book.history.filter((a) => a.words.length))
            .flat()
            .reduce(convertToWordsReadIncorrectly, wordsReadIncorrectly)
    }
    return wordsReadIncorrectly
}

function sortWordsByHighestNumberFirst(words) {
    return words.sort((a, b) => b.index - a.index)
}

export function getSightWordsData(books, history) {
    const historyData = JSON.parse(history)
    library[0].books = books
    const booksRead = getBooksRead(library, historyData)

    const wordsTracked = getWords(historyData)
    const words = getWordsFromBooks(library)
    const wordsRead = getWordsFromBooks(booksRead)

    return {
        sightWordsFromBooks: countSightWordsInBooks(words),
        sightWordsNotInBooks: getSightWordsNotInBooks(words),
        sightWordsReadInBooks: countSightWordsInBooks(wordsRead),
        sightWordsReadWrong: countSightWordsInBooks(wordsTracked)
    }
}

export const countTrackerWords = compose(
    countDuplicateWordsInObject,
    getWordsFromTracker
)

export const countSightWordsInBooks = compose(
    sortWordsByHighestNumberFirst,
    countDuplicateWords,
    getSightWordsFromBooks
)

export const getSightWordsNotInBooks = compose(
    sortWordsByHighestNumberFirst,
    countDuplicateWords,
    removeDuplicates,
    getSightWordsNotInList
)
