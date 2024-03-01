const listHelper = require('../utils/list_helper')

const biggerList = [
  {
  _id: "5a422a851b54a676234d17f7",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  __v: 0
  },
  {
  _id: "5a422aa71b54a676234d17f8",
  title: "Go To Statement Considered Harmful",
  author: "Edsger W. Dijkstra",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes: 5,
  __v: 0
  },
  {
  _id: "5a422b3a1b54a676234d17f9",
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 12,
  __v: 0
  },
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    test('of empty list is zero', () => {
        const emptyBlog = []
        const result = listHelper.totalLikes(emptyBlog)
        expect(result).toBe(0)
    })
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
      const result = listHelper.totalLikes(biggerList)
      expect(result).toBe(24)
    })
  })

describe('most likes', () => {

  test('return the most likes blog', () => {
    const result = listHelper.favoriteBlog(biggerList)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })  
})

describe('most blogs author', () => {

  test('return the most blogs author', () => {
    const result = listHelper.mostBlogs(biggerList)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 2
    })
  })  
})

describe('most likes author get', () => {

  test('return the most likes author get', () => {
    const result = listHelper.mostLikes(biggerList)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })  
})