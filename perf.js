/*
 Shows performance between JSON and Protobuff

 1_000 iterations should output the following.

  JSON
  4ms / 148000 bytes
  Protobuf
  37ms / 70000 bytes

 */

/*
  The file messages_pb.js was created by using the protoc compiler against messages.proto.
 */
const messages = require("./messages_pb");

// Change the amount of iterations to see difference in time and bytesize
const ITERATIONS = 1_000;

// leave these alone
let duration = 0;
let length = 0;
let start = new Date();

// Create ProtoBuff records
const address_pb = new messages.Address();
address_pb.setAddress1("1 Yonge St.");
address_pb.setAddress2("Unit #1000");
address_pb.setCity("Toronto");
address_pb.setProvince("Ontario");
address_pb.setZipCode("M13NY2");

const customer_pb = new messages.Customer();
customer_pb.setFirstName("Luke");
customer_pb.setLastName("Skywalker");
customer_pb.setAddress(address_pb);

// A regular JS type of record
const customer_standard = {
  firstName: "John",
  lastName: "Smith",
  address: {
    address1: "123 Main Street",
    address2: "",
    city: "Montreal",
    state: "Quebec",
    zipCode: "ZF4G6A",
  },
};

// Serialize and Deserialize ITERATIONS times and print out how long it took, and size of data.
for (let i = 0; i < ITERATIONS; i++) {
  data = JSON.stringify(customer_standard);
  JSON.parse(data);
  length += data.length;
}
duration = new Date() - start;

console.log("JSON\n" + duration + "ms / " + length + " bytes");

length = 0;
start = new Date();

for (let i = 0; i < ITERATIONS; i++) {
  data = customer_pb.serializeBinary();
  length += data.length;
  messages.Customer.deserializeBinary(data);
}

duration = new Date() - start;

console.log("Protobuf\n" + duration + "ms / " + length + " bytes");

process.exit();
