var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function() {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '1199999999',
            address: {
                postalcode: '06186140',
                street: 'Rua São Bento',
                number: '127',
                details: 'casa 4',
                disctrict: 'São Pedro',
                city_state: 'Osasco/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return data
    }
}