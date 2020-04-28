var faker = require(`faker`);
var bcrypt = require(`bcrypt`);
var connection = require(`./dbc`).connection;

let saltRounds = 10;
let i = 0;
let genderArray = ["male", "female", "transgender male", "transgender female"];
let sexualOrientationArray = ["straight", "bisexual", "gay", "lesbian"];
let highPriorityArray = ["food", "books", "movies", "series", "anime", "music", "games"];
let mediumPriorityArray = ["food", "books", "movies", "series", "anime", "music", "games"];
let lowPriorityArray = ["food", "books", "movies", "series", "anime", "music", "games"];
let dataArray = [];
let dataObject = {
	name : ``,
	surname : ``,
	email : ``,
	username : ``,
	notifications : ``,
	verified : ``,
	token : ``,
	password : ``,
	age : ``,
	gender : ``,
	sexualOrientation : ``,
	highPriority : ``,
	mediumPriority : ``,
	lowPriority : ``,
	city : ``,
	latitude : ``,
	longitude : ``,
	rating : ``,
};

let generateUsers = () => {
	while (i < 10) {
		dataObject.name = faker.fake("{{name.firstName}},");
		dataObject.surname = faker.fake("{{name.lastName}},");
		dataObject.email = faker.fake("{{internet.email}}");
		dataObject.username = faker.fake("{{internet.userName}}");
		let hash = bcrypt.hashSync(faker.fake("{{internet.password}}"), saltRounds);
		dataObject.password = hash
		dataObject.age = Math.floor(Math.random() * 52) + 18;
		dataObject.gender = genderArray[Math.floor(Math.random() * 3)];
		dataObject.sexualOrientation = sexualOrientationArray[Math.floor(Math.random() * 4)];
		if (dataObject.gender === `male` && dataObject.sexualOrientation === `lesbian`) {
			while (dataObject.gender === `male` && dataObject.sexualOrientation === `lesbian`) {
				dataObject.sexualOrientation = sexualOrientationArray[Math.floor(Math.random() * 4)];
			}
		}
		if (dataObject.gender === `female` && dataObject.sexualOrientation === `gay`) {
			while (dataObject.gender === `female` && dataObject.sexualOrientation === `gay`) {
				dataObject.sexualOrientation = sexualOrientationArray[Math.floor(Math.random() * 4)];
			}
		}
		if (dataObject.gender === `transgender male` && dataObject.sexualOrientation === `lesbian`) {
			while (dataObject.gender === `transgender male` && dataObject.sexualOrientation === `lesbian`) {
				dataObject.sexualOrientation = sexualOrientationArray[Math.floor(Math.random() * 4)];
			}
		}
		if (dataObject.gender === `transgender female` && dataObject.sexualOrientation === `gay`) {
			while (dataObject.gender === `transgender female` && dataObject.sexualOrientation === `gay`) {
				dataObject.sexualOrientation = sexualOrientationArray[Math.floor(Math.random() * 4)];
			}
		}
		dataObject.highPriority = highPriorityArray[Math.floor(Math.random() * 7)];
		dataObject.mediumPriority = mediumPriorityArray[Math.floor(Math.random() * 7)];
		dataObject.lowPriority = lowPriorityArray[Math.floor(Math.random() * 7)];
		if (dataObject.mediumPriority === dataObject.highPriority) {
			while (dataObject.mediumPriority === dataObject.highPriority) {
				dataObject.mediumPriority = mediumPriorityArray[Math.floor(Math.random() * 7)];
			}
		}
		if (dataObject.lowPriority === dataObject.highPriority || dataObject.lowPriority === dataObject.mediumPriority) {
			while (dataObject.lowPriority === dataObject.highPriority || dataObject.lowPriority === dataObject.mediumPriority) {
				dataObject.lowPriority = lowPriorityArray[Math.floor(Math.random() * 7)];
			}
		}
		dataObject.city = faker.fake("{{address.city}}");
		dataObject.latitude = faker.fake("{{address.latitude}}");
		dataObject.longitude = faker.fake("{{address.longitude}}");
		dataObject.rating = Math.floor(Math.random() * 4) + 1;
		dataArray[i] = dataObject;
		// console.log(dataObject);
		console.log(dataArray[i]);
		let query = `INSERT INTO users (`
		+ `name, surname, email, username, notifications, verified,`
		+ `token, password, age, gender, sexualOrientation,`
		+ `highPriority, mediumPriority, lowPriority, city,`
		+ `latitude, longitude, rating) VALUES (`
		+ `${dataObject.name}, ${dataObject.surname}, ${dataObject.email}, ${dataObject.username}, 1, 1,`
		+ `${dataObject.password}, ${dataObject.age}, ${dataObject.gender}, ${dataObject.sexualOrientation},`
		+ `${dataObject.highPriority}, ${dataObject.mediumPriority}, ${dataObject. lowPriority}, ${dataObject.city},`
		+ `${dataObject.latitude}, ${dataObject.longitude}, ${dataObject.rating})`
		i += 1;
	}
};

generateUsers();
