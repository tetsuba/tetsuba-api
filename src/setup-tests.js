import dotenv from 'dotenv'
dotenv.config({ path: './.env.test' })

export function toExpect401Status(res) {
    const json = JSON.parse(res.text)
    expect(res.status).toBe(401)
    expect(json).toEqual({
        success: false,
        status: 401,
        message: 'Unauthorized',
        stack: ''
    })
}

export function toExpect500Status(res) {
    const json = JSON.parse(res.text)
    expect(res.status).toBe(500)
    expect(json).toEqual({
        success: false,
        status: 500,
        message: 'Internal Server Error',
        stack: json.stack
    })
}
