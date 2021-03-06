const debug = require(`debug`)(`qnzl:watchers:graph:todoist-task`)
const fetch = require(`node-fetch`)

const todoistUrl = process.env.TODOIST_URL

module.exports = {
  projectId: (parent, args, context, info) => {
    return parent.project_id
  },
  sectionId: (parent, args, context, info) => {
    return parent.section_id
  },
  labelIds: (parent, args, context, info) => {
    return parent.label_ids
  },
  commentCount: (parent, args, context, info) => {
    return parent.comment_count
  },
  due: (parent) => {
    return parent.due && (parent.due.datetime || parent.due.date) || null
  },
  comments: async (parent, args, context) => {
    debug(`getting comments for ${parent.id}`)

    const res = await fetch(`${todoistUrl}/api/tasks/${parent.id}/comments`, {
      method: `GET`,
      headers: context
    })

    const comments = await res.json()

    debug(`got comments for ${parent.id}`)

    return comments
  }
}
