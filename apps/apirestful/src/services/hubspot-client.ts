import { Client } from '@hubspot/api-client'

const accessToken = process.env['HUBSPOT_TOKEN']

const client = new Client({ accessToken })

export default client
