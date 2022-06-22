describe('Navigation to admin page', () => {
  context("As admin", () => {
    it("should be able to navigate to admin page", () => {
      cy.visit('http://localhost:3000/')

      cy.get('[type=email]').type('dit.subas@gmail.com')
      cy.get('[type=password]').type('foobar')

      cy.wait(1000)

      cy.get('button').click()

      // assert admin is present in breadcrumb
      cy.contains('Admin')

      cy.get('[href="/admin"]').click()
      cy.contains('User')
      cy.contains('Salary')
      cy.contains('Salary Records')
    })
  })
})

describe('Navigation to calendar page', () => {
  context('As an admin', () => {
    it("should be able to navigate to calendar page", () => {
      cy.visit('http://localhost:3000/')

      cy.get('[type=email]').type('dit.subas@gmail.com')
      cy.get('[type=password]').type('foobar')

      cy.wait(1000)

      cy.get('button').click()

      cy.contains('Calendar')

      cy.get('[href="/calendar"]').click()

      // assert calendar page is showing
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const date = new Date()
      const month = months[date.getMonth()]
      const year = date.getFullYear()
      cy.contains(`${month} ${year}`)

      // assert next month button is showing
      cy.get('.fc-next-button.fc-button.fc-button-primary').should('be.visible')

      // click on next month button random number of time
      const click_times = parseInt(Math.random() * 15 + 1) // choose number between 1 and 15
      for(let i=0; i< click_times; i++) {
        cy.get('.fc-next-button.fc-button.fc-button-primary').click()
      }

      // now we are in random month lets assert we can create leave request

      // for a single day
      const random_calendar_box = parseInt(Math.random() * 28 ) // choose number between 1 and 28

      cy.get(`.fc-daygrid-day`).eq(random_calendar_box).click()
      cy.get('input').first().type('head hurts')
      cy.get('.py-4 > :nth-child(1) > .inline-block').click() // submit button

      cy.get('.text-lg').should('not.be.visible') // New leave request
      cy.get('.fc-event-title-container').should('be.visible') // head hurts leave event


      // for multiple day
      // const dataTransfer = new DataTransfer()
      // cy.get('.fc-daygrid-day').first().trigger('dragstart', {
      //   dataTransfer
      // })
      //
      // cy.get('.fc-daygrid-day').eq(4).trigger('drop', {
      //   dataTransfer
      // })

      // cy.get('.fc-event-title-container').should('be.visible')
      //
      // cy.get('.fc-event-title-container').first().click()
      //
      // cy.contains('Sick Leave Balance')
      // cy.contains('Paid Leave Balance')
      // cy.contains('Unpaid Leave Balance')
      //
      // cy.contains('Leave Type')
      // cy.contains('Reason')
      // cy.contains('Reply')
      //
      // cy.contains('Reject')
      // cy.contains('Approve')
      //
      // // when reject or approve is clicked without reply
      // cy.get('.bg-red-500').click()
      // cy.contains('reply')
      // cy.contains("can't be blank")


    })
  })
})
