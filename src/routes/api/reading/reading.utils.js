import sightWords from '../../../database/sightWords.js'

function compose(...func) {
    return (arg) => func.reduceRight((a, f) => f(a), arg)
}

export function getWordsFromBooks(books) {
    return books
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

function getBooksRead(books) {
    return books.filter((book) => book.history)
}

export const countSightWordsInBooks = compose(
    countDuplicateWords,
    getSightWordsFromBooks
)

export const getSightWordsNotInBooks = compose(
    countDuplicateWords,
    removeDuplicates,
    getSightWordsNotInList
)

function getWordsFromHistory(books) {
    return books
        .map((book) => JSON.parse(book.history))
        .map((history) => history.map(({ words }) => words))
        .flat()
        .flat()
}

export function getSightWordsData(books) {
    const booksRead = getBooksRead(books)
    const words = getWordsFromBooks(books)
    const wordsRead = getWordsFromBooks(booksRead)
    const wordsReadWrong = getWordsFromHistory(booksRead)

    return {
        sightWordsFromBooks: countSightWordsInBooks(words),
        sightWordsNotInBooks: getSightWordsNotInBooks(words),
        sightWordsReadInBooks: countSightWordsInBooks(wordsRead),
        sightWordsReadWrong: countSightWordsInBooks(wordsReadWrong)
    }
}

export function getWordsReadIncorrectly(books) {
    const booksRead = getBooksRead(books)
    const wordsReadWrong = getWordsFromHistory(booksRead)
    return countDuplicateWords(wordsReadWrong)
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

function getWordsFromTracker(row) {
    if (row && row.data) {
        const data = JSON.parse(row.data)
        return data
            .map((book) => book.history.map(({ words }) => words))
            .flat()
            .flat()
    }
    return []
}

export const countTrackerWords = compose(
    countDuplicateWords,
    getWordsFromTracker
)
