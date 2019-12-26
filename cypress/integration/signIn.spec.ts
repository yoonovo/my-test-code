describe('비정상적으로 로그인 했을 경우', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  it('아이디와 비밀번호 둘 다 미입력 상태에서 로그인 버튼을 눌렀을 때 "아이디 또는 비밀번호를 확인해 주세요."라는 알럿창이 떠야한다.', () => {
    cy.get('.id-input').should('be.empty').should('have.css', 'border', '1px solid rgb(255, 0, 0)')
    cy.get('.pw-input').should('be.empty').should('have.css', 'border', '1px solid rgb(255, 0, 0)')
    
    cy.contains('로그인').click()

    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.contains('로그인').click().should(() => {
      expect(stub.getCall(0)).to.be.calledWith('아이디 또는 비밀번호를 확인해 주세요.')      
    })
  })

  it('비밀번호만 미입력 상태에서 로그인 버튼을 눌렀을 때 "아이디 또는 비밀번호를 확인해 주세요."라는 알럿창이 떠야한다.', () => {
    cy.get('.id-input').type('yoonovo').should('have.css', 'border', '1px solid rgb(0, 0, 0)')
    cy.get('.pw-input').should('be.empty').should('have.css', 'border', '1px solid rgb(255, 0, 0)')

    cy.contains('로그인').click()
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.contains('로그인').click().should(() => {
      expect(stub.getCall(0)).to.be.calledWith('아이디 또는 비밀번호를 확인해 주세요.')      
    })
  })
})

describe('정상적으로 로그인 했을 경우', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })
  it('아이디와 비밀번호를 입력한 뒤 로그인 버튼을 눌렀을때 "로그인 되었습니다."라는 알럿창이 떠야한다.', () => {
    cy.get('.id-input').type('yoonovo').should('have.css', 'border', '1px solid rgb(0, 0, 0)')
    cy.get('.pw-input').type('yoonovo').should('have.css', 'border', '1px solid rgb(0, 0, 0)')

    cy.contains('로그인').click()
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.contains('로그인').click().should(() => {
      expect(stub.getCall(0)).to.be.calledWith('로그인 되었습니다.')      
    })
  })
})