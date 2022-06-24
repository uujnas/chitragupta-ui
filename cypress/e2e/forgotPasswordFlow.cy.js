describe('Forgot password flow', () => {
  it('should be able to request for password reset instructions', () => {
    cy.visit('http://localhost:3000/')

    // expect to be redirected to login
    cy.location('pathname').should('eq', '/login')

    cy.contains('Forgot Password')

    cy.get("a[href='/users/forgot_password']").should('be.visible').click()

    // forgot password page
    cy.contains('Email')
    cy.contains('Reset Password')

    cy.get("input[type='email']").should('be.visible').type('sagar1@gmail.com')
    cy.get('button').first().click()

    cy.contains(
      'Password reset requested successfully, please check your email',
    )
  })
})
