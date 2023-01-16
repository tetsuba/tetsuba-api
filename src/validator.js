// https://ajv.js.org/guide/formats.html

import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'
const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
ajvErrors(ajv)
export default function validate(schema, data) {
    const validate = ajv.compile(schema)
    return !validate(data) ? ajv.errorsText(validate.errors) : false
}
