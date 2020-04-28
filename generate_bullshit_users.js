var faker = require(`faker`);
var connection = require(`./dbc`).connection;

let i = 0;

let dataArray = [];
let dataObject = {
	name : ``,
	surname : ``,
	email : ``,
	username : ``,
	password : ``,
	city : ``,
	latitude : ``,
	longitude : ``
};

let generateUsers = () => {
	while (i < 10) {
		dataObject.name = faker.fake("{{name.firstName}},");
		dataObject.surname = faker.fake("{{name.lastName}},");
		dataObject.email = faker.fake("{{internet.email}}");
		dataObject.username = faker.fake("{{internet.userName}}");
		dataObject.password = faker.fake("{{internet.password}}");
		dataObject.city = faker.fake("{{address.city}}");
		dataObject.latitude = faker.fake("{{address.latitude}}");
		dataObject.longitude = faker.fake("{{address.longitude}}");
		dataArray[i] = dataObject;
		// console.log(dataObject);
		console.log(dataArray[i]);
		i += 1;
	}
};

generateUsers();
