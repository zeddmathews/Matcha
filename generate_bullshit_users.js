var faker = require('faker');
var bcrypt = require('bcrypt');
var connection = require('./dbc').connection;

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
	reported : ``,
	temporaryBan : ``,
	permanentBan : ``
};

let generateUsers = () => {
	while (i < 99) {
		dataObject.name = faker.fake("{{name.firstName}},");
		dataObject.surname = faker.fake("{{name.lastName}},");
		dataObject.email = faker.fake("{{internet.email}}");
		dataObject.username = faker.fake("{{internet.userName}}");
		let tokenHash = bcrypt.hashSync(dataObject.name, saltRounds);
		dataObject.token = tokenHash;
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
		dataObject.reported = Math.floor(Math.random() * 100);
		if (dataObject.reported > 33) {
			dataObject.temporaryBan = 1;
			dataObject.permanentBan = 0;
		}
		else if (dataObject.reported > 66) {
			dataObject.temporaryBan = 0;
			dataObject.permanentBan = 1;
		}
		else if (dataObject.reported < 34) {
			dataObject.temporaryBan = 0;
			dataObject.permanentBan = 0;
		}
		dataArray[i] = dataObject;
		// console.log(dataObject);
		console.log(dataArray[i]);
		let iterate = 0;
		connection.query(`INSERT INTO users (`
			+ `name, surname, email, username, notifications, verified,`
			+ `token, password, age, gender, sexualOrientation,`
			+ `highPriority, mediumPriority, lowPriority, city,`
			+ `latitude, longitude, rating, reported, temporaryBan, permanentBan) VALUES (`
			+ `${dataArray[iterate].name}, ${dataArray[iterate].surname}, ${dataArray[iterate].email}, ${dataArray[iterate].username}, 1, 1,`
			+ `${dataArray[iterate].token}, ${dataArray[iterate].password}, ${dataArray[iterate].age}, ${dataArray[iterate].gender}, ${dataArray[iterate].sexualOrientation},`
			+ `${dataArray[iterate].highPriority}, ${dataArray[iterate].mediumPriority}, ${dataArray[iterate]. lowPriority}, ${dataArray[iterate].city},`
			+ `${dataArray[iterate].latitude}, ${dataArray[iterate].longitude}, ${dataArray[iterate].rating}, ${dataArray[iterate].reported}, ${dataArray[iterate].temporaryBan, dataArray[iterate].permanentBan})`
			, (err) => {
			if (err) {
				throw err;
			}
			else {
				let num = 1;
				if (num === 1) {
					console.log(`${num} query inserted`);
				}
				else {
					console.log(`${num} queries inserted`)
				}
				num += 1;
				iterate  += 1;
			}
		});
		i += 1;
	}
};

generateUsers();
