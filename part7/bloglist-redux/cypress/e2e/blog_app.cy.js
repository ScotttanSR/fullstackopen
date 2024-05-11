describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name:'testing',
      username:'testing',
      password:'testing'
    }
    const user2 = {
      name:'testing2',
      username:'testing2',
      password:'testing2'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'testing', password: 'testing' })
      cy.contains('testing logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    describe('with existing blog', function() {
      beforeEach(function() {
        cy.login({ username: 'testing', password: 'testing' })
        const sampleBlog = {
          title: 'hello',
          author: 'waichee',
          url: 'www.google.com',
          likes: 0
        }
        cy.createBlog(sampleBlog)
      })
      it('like a blog', function() {
        cy.contains('hello').contains('view').click()
        cy.contains('hello').contains('like').click()
      })

      it('remove a blog', function() {
        cy.contains('hello').contains('view').click()
        cy.contains('hello').contains('remove').click()
      })

      it('only the creator can delete the blog', function() {
        cy.contains('logout').click()
        cy.login({ username: 'testing2', password: 'testing2' })
        cy.get('html').should('not.contain', 'hello')
      })
    })

    describe('blogs ordered by likes', function(){
      beforeEach(function() {
        cy.login({ username: 'testing', password: 'testing' })
        const sampleBlog = {
          title: 'hello',
          author: 'waichee',
          url: 'www.google.com',
          likes: 0
        }
        const sampleBlog2 = {
          title: 'hello2',
          author: 'waichee2',
          url: 'www.google.com',
          likes: 5
        }
        const sampleBlog3 = {
          title: 'hello3',
          author: 'waichee1',
          url: 'www.google.com',
          likes: 2
        }
        cy.createBlog(sampleBlog)
        cy.createBlog(sampleBlog2)
        cy.createBlog(sampleBlog3)
      })
      it('show blogs in ordered by likes', function() {
        cy.get('.blog').eq(0).should('contain', 'hello2')
        cy.get('.blog').eq(1).should('contain', 'hello3')
        cy.get('.blog').eq(2).should('contain', 'hello')
      })
    })
  })
})
