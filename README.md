Cypress는 mocha/chai를 기반으로 하는 프론트엔드 테스트 도구이다.
연동된 모든 모듈이나 서비스를 import 해야하는 jasmine/karma와는 달리 import 할 필요없이 사용가능하고 설치하거나 테스트 하는 방법도 간단하다.

## 설치하기 

Cypress는 `npm` 명령어로 간단하게 설치 할 수 있다.

```
npm i cypress
```

## 설정하기 

설치가 끝났다면 바로 `npx cypress open` 으로 시작 할 수 있지만 직접 시작 명령어를 설정하는 것을 추천한다.
`cypress open`은 새로운 크롬 창을 띄워서 화면 테스트를 실행하고 `cypress run`은 터미널에서 간의  테스트를 실행한다. 

* package.json
```
"scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run"
}
```

## 시작하기

Cypress는 외부에서 가상으로 검증 하는 것이 아니라 로컬 서버에서 직접 테스트하는 테스트 도구이기 때문에 서버를 먼저 시작한 후 Cypress를 실행해야한다.

```
npm run start
```
로컬 서버를 실행 시켰다면 Cypress를 시작 해보자
```
npm run cy:open
```

처음 Cypress를 실행하면 "cypress"라는 최상위 폴더와 그 안의 하위 폴더들이 생성된다.
또 "cypress/integration"안의 "examples" 폴더가 생성되는데 초보자를 위한 테스트 코드 예제파일들이다.

![cypress_05.png](./src/assets/images/cypress_05.png)

### 테스트 러너
테스트 러너를 자세히 살펴보자.
오른쪽 상단의 "Run all specs" 버튼이 있다. 이 버튼으로 모든 테스트코드 파일을 검증 할 수도 있고 하나의 파일을 클릭하면 단일 파일의 테스트 코드만 검증 할 수도 있다. 
테스트 러너에서 보이는 파일은 "cypress/integration"안의 저장된 파일들이다.
"cypress/integration" 폴더 안에 `signIn.spec.ts`라는 테스트 코드 파일을 생성해보면 테스트 러너에 방금 생성한 `signIn.spec.ts` 파일이 보일 것이다.

![cypress_02.png](./src/assets/images/cypress_02.png)


### @testing-library/cypress 설정하기
최초로 Cypress를 실행하여 폴더를 생성 했다면  Cypress 라이브러리를 하나 설치한 뒤 설정도 해준다. 

```
npm i @testing-library/cypress
```
* tsconfig.json

```
{
  "compilerOptions": {
    "types": ["cypress", "@types/testing-library__cypress"]
  }
}
```

* cypress/support/commands.js
```
import '@testing-library/cypress/add-commands'
```

## 테스트 코드 작성

- 예제 프로젝트 https://github.com/yoonovo/my-test-code

테스트 러너에서  `signIn.spec.ts` 파일을 클릭하여 실행시켜보면 아래 이미지와 같은 화면이 나올 것이다.

![cypress_03.png](./src/assets/images/cypress_03.png)

테스트 코드를 살펴보자.
``` 
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
```

mocha/chai 문법이기에 테스트 코드를 접해본 적이 있다면 익숙하게 느껴질 것이다.

위에서 사용된 Cypress 문법을 간단하게 알아보자. 

- cy.visit('url'): url로 이동
- cy.get(): 테스트 할 DOM 객체를 가져온다. DOM 객체의 태그, 클래스, 아이디로 가져올 수 있다. ([자세한 내용은 여기](https://docs.cypress.io/api/commands/get.html#Selector))
- cy.contains('String'): 문자열과 일치하는 DOM을 가져온다. 
- cy.get().should(): 가져온 DOM 객체의 속성이나 입력된 값을 비교 할 수 있다. ([자세한 내용은 여기](https://docs.cypress.io/api/commands/should.html#Arguments))
- cy.get().click(): 가져온 DOM 객체에 클릭 이벤트를 발생시킨다.

이외에 나머지는 Cypress 공식 홈페이지에 들어가면 가이드와 설명이 잘되있으니 테스트 코드를 작성할 때 참고 바란다.

### Data-TestId
위에서는 cy.get()으로 태그, 클래스, 아이디로 DOM을 가져왔다.
하지만 만약 cy.get()으로 가져온 DOM의 태그나 클래스, 아이디가 수정된다면 위의 테스트 코드는 실패 할 것이다. 클래스 하나 수정할 때마다 테스트 코드를 수정하기엔 비용이 과도하다. 이럴 때를 위해 우리는 `@testing-library/cypress`라는 Cypress 라이브러리를 하나 설치 했다.

이 라이브러리는 `data-testId`라는 테스트 전용 아이디를 제공하여 이 아이디로 DOM을 가져올 수 있게 한다. 

- 사용법
테스트를 하기위해 가져오고 싶은 DOM 객체 태그에 아래와 같이 추가한다. 
```
<p data-testId="hello">반갑습니다.</p>
```
그리고는 테스트 코드를 작성할 때 `cy.findByTestId()`로 DOM을 가져오면 된다.
```
cy.findByTestId("hello")
```
이런 방식으로 테스트코드를 작성하면 DOM의 클래스나 태그가 바뀌어도 테스트는 실패하지 않는다.

### [Cypress 공식 홈페이지](https://www.cypress.io/)