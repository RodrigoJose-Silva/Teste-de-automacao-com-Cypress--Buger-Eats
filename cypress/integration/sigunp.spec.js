import signUp from '../pages/SignupPage'
import SignUpFactory from '../factories/SignUpFactory'
import SignupPage from '../pages/SignupPage'

describe('SignUp', () => {

    beforeEach(function () {
        cy.fixture('deliver').then((d) => {
            this.deliver = d
        })
    })

    //validando o cadastro com sucesso
    it('User should be deliver', function () {

        var deliver = SignUpFactory.deliver()

        signUp.go()
        signUp.fillForm(deliver)
        signUp.subimit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signUp.nodalContentShouldBe(expectedMessage)
    })

    //validando mensagem de erro de documento inválido
    it('Incorret document', function () {

        var deliver = SignUpFactory.deliver()

        deliver.cpf = '123456789AA'

        signUp.go()
        signUp.fillForm(deliver)
        signUp.subimit()
        signUp.alertMessageShouldBe('Oops! CPF inválido')

    })

    //validando mensagem de erro de e-mail inválido
    it('Incorret email', function () {

        var deliver = SignUpFactory.deliver()

        deliver.email = 'qatest.gmail.com'

        signUp.go()
        signUp.fillForm(deliver)
        signUp.subimit()
        signUp.alertMessageShouldBe('Oops! Email com formato inválido.')

    })

    //validação de campos obrigatórios
    context('Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'chn', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function () {
            SignupPage.go()
            SignupPage.subimit()
        })

        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })
    })

})