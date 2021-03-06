const moment = require(`moment`)
const debug = require(`debug`)(`qnzl:watchers:graph:aw-bucket`)
const fetch = require(`node-fetch`)

const awUrl = process.env.AW_URL

const buildQueryString = (query) => {
  const queryStrings = Object.keys(query).map((key) => {
    if (!query[key]) return ``

    return `${key}=${query[key]}`
  }).filter(Boolean)

  return queryStrings.join(`&`)
}

module.exports = {
  activity: async (parent, args, context, info) => {
    const { date = moment().format() } = args
    const { id } = parent

    debug(`getting activity for ${date} in ${id}`)

    const queryString = buildQueryString({ date })

    const event = await fetch(`${awUrl}/api/buckets/${id}/events?${queryString}`, {
      headers: context
    })

    const events = await event.json()

    debug(`got events for ${date} in ${id}: `, events)

    return events
  },
}
