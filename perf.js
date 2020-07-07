const messages = require('./messages_pb');

const address_pb = new messages.Address();
address_pb.setAddress1('1 Yonge St.');
address_pb.setAddress2('Unit #1000');
address_pb.setCity('Toronto');
address_pb.setProvince('Ontario');
address_pb.setZipCode('M13NY2');

const customer_pb = new messages.Customer();
customer_pb.setFirstName('Luke')
customer_pb.setLastName('Skywalker');
customer_pb.setAddress(address_pb);

const customer_standard = {
    firstName: 'John',
    lastName: 'Smith',
    address: {
        address1: '123 Main Street',
        address2: '',
        city: 'Montreal',
        state: 'Quebec',
        zipCode: 'ZF4G6A'
    }
};

const ITERATIONS = 1_000;
let duration = 0;
let length = 0;
let start = new Date();
for (let i = 0; i < ITERATIONS; i++) {
    data = JSON.stringify(customer_standard);
    JSON.parse(data);
    length += data.length
}
duration = new Date() - start;

console.log('JSON\n' + duration + 'ms / ' + length + ' bytes');

length = 0;
start = new Date();

for (let i = 0; i < ITERATIONS; i++) {
    data = customer_pb.serializeBinary();
    length += data.length
    messages.Customer.deserializeBinary(data);
}

duration = new Date() - start;

console.log('Protobuf\n' + duration + 'ms / ' + length + ' bytes');

process.exit();