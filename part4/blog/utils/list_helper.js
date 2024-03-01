const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const blogsLikes = blogs.map((blog) => blog.likes)
    const total = blogsLikes.reduce((accumulator, currentValue) => 
    accumulator + currentValue,
    0,)

    return total
}

const favoriteBlog = (blogs) => {
    const max = Math.max(...blogs.map(blog => blog.likes))
    const mostLikesBlog = blogs.filter(blog => blog.likes === max) 
    const mostLikesBlogObject = {
        title: mostLikesBlog[0].title,
        author: mostLikesBlog[0].author,
        likes: mostLikesBlog[0].likes
    }
    return mostLikesBlogObject
}

const mostBlogs = (blogs) => {
    const getAuthor = blogs.map(blog => blog.author)
    const authorCount = _.countBy(getAuthor)
    const topAuthor = Object.keys(authorCount).reduce((a,b) => authorCount[a] > authorCount[b] ? a : b)
    return {
        author: topAuthor,
        blogs: authorCount[topAuthor]
    }
}

const mostLikes = (blogs) => {
    const getLikesByAuthor = blogs.map(blog => ({author: blog.author, likes: blog.likes}))
    const totalAuthorLikes = getLikesByAuthor.reduce((acc, curr) => {
        acc[curr.author] = (acc[curr.author] || 0 ) + curr.likes
        return acc
    }, {})
    const topAuthor = _.maxBy(Object.keys(totalAuthorLikes), author => totalAuthorLikes[author]);
    return {
        author: topAuthor,
        likes: totalAuthorLikes[topAuthor]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog, 
    mostBlogs, 
    mostLikes
}