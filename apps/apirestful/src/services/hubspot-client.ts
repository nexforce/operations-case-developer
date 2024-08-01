import { Client } from '@hubspot/api-client'

const accessToken = process.env['HUBSPOT_TOKEN']

const client = new Client({ accessToken })

//client.crm.objects.basicApi.getPage('pets', undefined, undefined, ['name', 'breed', 'age'])
//  .then((results) => {
//    console.log(results.results.length)
//    console.log(results.results[0])
//    const objectId = results.results[0].id
//
//    client.crm.objects.basicApi.getById('pets', objectId, ['name', 'breed', 'age']).then(result => {
//      console.log(result)
//    })
//  })
//
//client.crm.objects.basicApi.create('pets', {
//  properties: {
//    name: 'Ella',
//    breed: 'Pelo Curto Brasileiro',
//    age: '1'
//  }
//}).then((results) => {
//  console.log(results)
//})

export default client
