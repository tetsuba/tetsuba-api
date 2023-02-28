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

function getWordsFromTracker(row) {
    if (row && row.data) {
        const data = JSON.parse(row.data)
        return getWords(data)
    }
    return []
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
    sortWordsByHighestNumberFirst,
    countDuplicateWords,
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
