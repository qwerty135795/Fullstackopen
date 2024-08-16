const dummy  = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    return blogs.reduce((curr, next) => curr + next.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs[blogs.reduce((curr, next, ind, arr) =>
            curr = next.likes > arr[curr].likes ? ind : curr
    , 0)]

}

const mostBlogs = (blogs) => {
      const result = blogs.reduce((group, blog) => {
          const {author} = blog
          group[author] = group[author] ?? []
          group[author].push(blog)
          return group
      }, {})
    let mostBlogs = {author: undefined, blogs:0 }
    for (let group in result) {
        if (result[group].length > mostBlogs.blogs) mostBlogs = {author: group, blogs: result[group].length}
    }
    return mostBlogs
}

const mostLikes = (blogs) => {
    const result = blogs.reduce((group, blog) => {
        const {author} = blog
        group[author] = group[author] ?? []
        group[author].push(blog)
        return group
    }, {})
    let mostLiked = {author: undefined, likes: 0}
    for (let group in result) {
         if (result[group].reduce((sum, cur) => sum + cur.likes, 0) > mostLiked.likes) {
             mostLiked = {author: group, likes: result[group].reduce((sum, cur) => sum + cur.likes, 0)}
         }
    }
    return mostLiked
}
module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}