const { Client } = require('@elastic/elasticsearch')
const faker = require('faker')
const { fake } = require('faker')

const client = new Client({
  node: 'https://e5a34718f5304514ac6768fb17071acd.us-east-1.aws.found.io:9243',
  auth: {
    username: 'elastic',
    password: 'JQvXYgNKYUCIqMxyhcbLo9y6',
  },
})

const child = client.child({
  headers: { 'x-foo': 'bar' },
  requestTimeout: 1000,
})

//Create Index
// child.indices
//   .create({ index: 'tweet' }, { ignore: [400] })
//   .then(console.log('Index created successfully'))
//   .catch(console.error())

// Creating custom analyser NOTE: Cluster must be close to create custom analyzer
// client.indices.putSettings({
//   index: 'tweet',
//   body: {
//     index: {
//       max_ngram_diff: 10,
//     },
//     analysis: {
//       analyzer: {
//         tech_analyzer: {
//           type: 'custom',
//           tokenizer: 'standard',
//           filter: ['tech_ngram'],
//         },
//       },
//       filter: {
//         tech_ngram: {
//           type: 'ngram',
//           min_gram: 1,
//           max_gram: 10,
//         },
//       },
//     },
//   },
// })

// Index mapping
// child.indices.putMapping({
//   index: 'tweet',
//   body: {
//     properties: {
//       id: {
//         type: 'integer',
//       },
//       text: {
//         type: 'text',
//       },
//       user: {
//         type: 'keyword',
//       },
//       time: {
//         type: 'date',
//       },
//     },
//   },
// })

// Index/create document
// TO IMPROVE THE PERFOMANCE OF INDEXING, DONT explicitly PROVIDE id
// child
//   .index({
//     index: 'tweet',
//     id: 3,
//     body: {
//       id: 3,
//       text: 'hello',
//       user: 'riddolesky',
//       time: new Date(),
//     },
//   })
//   .then((data) => {
//     console.log(data.body)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

//Bulk indexing
// let tweet = []
// for (let id = 51; id <= 100; id++) {
//   tweet.push({
//     index: {
//       _index: 'tweet',
//       _id: id,
//     },
//   })

//   tweet.push({
//     id,
//     text: faker.address.streetAddress(),
//     user: faker.name.findName(),
//     time: new Date(),
//   })
// }
// child
//   .bulk({
//     body: tweet,
//   })
//   .then((data) => {
//     for (doc of data.body.items) {
//       console.log(doc)
//     }
//   })
//   .catch((err) => console.log(err))

// client
//   .update({
//     index: 'tweet',
//     id: 3,
//     body: {
//       script: {
//         lang: 'painless',
//         // source: 'ctx._source.times++',
//         // you can also use parameters
//         source:
//           'ctx._source.user = params.user; ctx._source.text = params.text',
//         params: { user: 'riddo', text: 'Hellooooooo' },
//       },
//     },
//   })
//   .then((data) => console.log(data.body))
//   .catch((err) => console.log(err))

// Delete document
// child
//   .delete({
//     index: 'tweet',
//     id: '1',
//   })
//   .then((data) => console.log(data.body))
//   .catch((err) => console.log(err))

// Retrieve single document
// child
//   .get({
//     index: 'tweet',
//     id: '1',
//   })
//   .then((data) => {
//     console.log(data.body)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// Get multiple documents
// child
//   .mget({
//     index: 'tweet',
//     body: {
//       ids: ['1', '2', '3'],
//        //  docs: [
//        //     {
//        //     _index: "test",
//        //     _type: "_doc",
//        //     _id: "1",
//        //     _source: false
//        //     },...
//        //  ]
//     },
//   })
//   .then((data) => {
//     console.log(data.body)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// count all document in an index
// child
//   .count({
//     index: 'tweet',
//   })
//   .then((data) => console.log(data.body.count))
//   .catch((err) => console.log(err))

// All indices
// child.cat
//   .indices({ v: true })
//   .then((data) => {
//     console.log(data.body)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// To help transform into the document
// child.helpers
//   .search({
//     index: 'tweet',
//     body: {
//       query: {
//         match_all: {},
//       },
//     },
//   })
//   .then((data) => {
//     console.log(data)
//   })
//   .catch()

// match_all search - Return all tweet
// child
//   .search({
//     index: 'tweet',
//     body: {
//       size: 100,
//       query: {
//         match_all: {},
//       },
//     },
//   })
//   .then((data) => {
//     for (doc of data.body.hits.hits) {
//       console.log(doc._source)
//     }
//   })
//   .catch((err) => console.log(err))

// match search - Match a terms in a field e.g riddo
// child
//   .search({
//     index: 'tweet',
//     body: {
//       query: {
//         match: {
//           user: 'Ms.',
//         },
//       },
//     },
//   })
//   .then((data) => {
//     for (doc of data.body.hits.hits) {
//       console.log(doc._source)
//     }
//   })
//   .catch((err) => console.log(err))

// match_phrase search - To match a phrase in field
// child
//   .search({
//     index: 'tweet',
//     body: {
//       query: {
//         match_phrase: {
//           text: 'Ber Trail',
//         },
//       },
//     },
//   })
//   .then((data) => {
//     for (doc of data.body.hits.hits) {
//       console.log(doc._source)
//     }
//   })
//   .catch((err) => console.log(err))

// Suggestion/autocomplete and query_string QUERY
child
  .search({
    index: 'tweet',
    body: {
      suggest: {
        SEARCH_SUGGESTION: {
          text: 'how to Adrian Union',
          term: {
            field: 'text',
          },
        },
      },
      query: {
        query_string: {
          //   default_field: 'text',
          //   default_operator: 'or',
          fields: ['text', 'user'],
          query: 'how to Adrian Union',
        },
      },
    },
  })
  .then((data) => {
    for (doc of data.body.hits.hits) {
      console.log(doc._source)
    }

    for (doc of data.body.suggest.SEARCH_SUGGESTION) {
      console.log(doc)
    }
  })
  .catch((err) => console.log(err))
