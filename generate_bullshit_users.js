var faker = require('faker');
var bcrypt = require('bcrypt');
var connection = require('./dbc').connection;

let saltRounds = 10;
let i = 0;
let genderArray = ["male", "female"];
let sexualOrientationArray = ["straight", "bisexual", "gay", "lesbian"];
let highPriorityArray = ["food", "books", "movies", "series", "anime", "music", "games", "sport", "gardening", "hiking", "camping", "cooking", "baking,", "dancing"];
let mediumPriorityArray = ["food", "books", "movies", "series", "anime", "music", "games", "sport", "gardening", "hiking", "camping", "cooking", "baking,", "dancing"];
let lowPriorityArray = ["food", "books", "movies", "series", "anime", "music", "games", "sport", "gardening", "hiking", "camping", "cooking", "baking,", "dancing"];
let dataArray = [];

let generateUsers = () => {
	while (i < 10) {
		let dataObject = {
			name : ``,
			surname : ``,
			email : ``,
			username : ``,
			notifications : 1,
			verified : 1,
			token : ``,
			password : ``,
			age : ``,
			gender : ``,
			sexualOrientation : ``,
			highPriority : ``,
			highPriority2 : ``,
			mediumPriority : ``,
			mediumPriority2 : ``,
			lowPriority : ``,
			lowPriority2 : ``,
			city : ``,
			latitude : ``,
			longitude : ``,
			rating : ``,
			reported : ``,
			temporaryBan : ``,
			permanentBan : ``
		};
		dataObject.name = faker.fake("{{name.firstName}}");
		dataObject.surname = faker.fake("{{name.lastName}}");
		dataObject.email = faker.fake("{{internet.email}}");
		dataObject.username = faker.fake("{{internet.userName}}");
		let tokenHash = bcrypt.hashSync(dataObject.name, saltRounds);
		dataObject.token = tokenHash;
		let hash = bcrypt.hashSync(faker.fake("{{internet.password}}"), saltRounds);
		dataObject.password = hash
		dataObject.age = Math.floor(Math.random() * 52) + 18;
		dataObject.gender = genderArray[Math.floor(Math.random() * 2)];
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
		dataObject.highPriority = highPriorityArray[Math.floor(Math.random() * 14)];
		dataObject.highPriority2 = highPriorityArray[Math.floor(Math.random() * 14)];
		if (dataObject.highPriority2 === dataObject.highPriority) {
			while (dataObject.highPriority2 === dataObject.highPriority) {
				dataObject.highPriority2 = highPriorityArray[Math.floor(Math.random() * 14)];
			}
		}
		dataObject.mediumPriority = mediumPriorityArray[Math.floor(Math.random() * 14)];
		if (dataObject.mediumPriority === dataObject.highPriority || dataObject.mediumPriority === dataObject.highPriority2) {
			while (dataObject.mediumPriority === dataObject.highPriority || dataObject.mediumPriority === dataObject.highPriority2) {
				dataObject.mediumPriority = mediumPriorityArray[Math.floor(Math.random() * 14)];
			}
		}
		dataObject.mediumPriority2 = mediumPriorityArray[Math.floor(Math.random() * 14)];
		if (dataObject.mediumPriority2 === dataObject.mediumPriority || dataObject.mediumPriority2 === dataObject.highPriority2 || dataObject.mediumPriority2 === dataObject.highPriority) {
			while (dataObject.mediumPriority2 === dataObject.mediumPriority || dataObject.mediumPriority2 === dataObject.highPriority2 || dataObject.mediumPriority2 === dataObject.highPriority) {
				dataObject.mediumPriority2 = mediumPriorityArray[Math.floor(Math.random() * 14)];
			}
		}
		dataObject.lowPriority = lowPriorityArray[Math.floor(Math.random() * 14)];
		if (dataObject.lowPriority === dataObject.mediumPriority2 || dataObject.lowPriority === dataObject.mediumPriority || dataObject.lowPriority === dataObject.highPriority2 || dataObject.lowPriority === dataObject.highPriority) {
			while (dataObject.lowPriority === dataObject.mediumPriority2 || dataObject.lowPriority === dataObject.mediumPriority || dataObject.lowPriority === dataObject.highPriority2 || dataObject.lowPriority === dataObject.highPriority) {
				dataObject.lowPriority = lowPriorityArray[Math.floor(Math.random() * 14)];
			}
		}
		dataObject.lowPriority2 = lowPriorityArray[Math.floor(Math.random() * 14)];
		if (dataObject.lowPriority2 === dataObject.lowPriority || dataObject.lowPriority2 === dataObject.mediumPriority2 || dataObject.lowPriority2 === dataObject.mediumPriority || dataObject.lowPriority2 === dataObject.highPriority2 || dataObject.lowPriority2 === dataObject.highPriority) {
			while (dataObject.lowPriority2 === dataObject.lowPriority || dataObject.lowPriority2 === dataObject.mediumPriority2 || dataObject.lowPriority2 === dataObject.mediumPriority || dataObject.lowPriority2 === dataObject.highPriority2 || dataObject.lowPriority2 === dataObject.highPriority) {
				dataObject.lowPriority2 = lowPriorityArray[Math.floor(Math.random() * 14)];
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
		dataArray.push(dataObject);
		console.log(dataArray[i]);
		
		i += 1;
	}
};

generateUsers();
// console.log(dataArray);

let insert = () => {
	let iterate = 0;
	let num = 1;
	while (iterate < 10) {
		let stmtValues = `name, surname, email, username, notifications, verified, token, password, age, gender, sexualOrientation, highPriority, highPriority2, mediumPriority, mediumPriority2, lowPriority, lowPriority2, city, latitude, longitude, rating, reported, temporaryBan, permanentBan`;
		let stmt = `INSERT INTO users(${stmtValues})`;
		let values = [
			dataArray[iterate].name,
			dataArray[iterate].surname,
			dataArray[iterate].email,
			dataArray[iterate].username,
			dataArray[iterate].notifications,
			dataArray[iterate].verified,
			dataArray[iterate].token,
			dataArray[iterate].password,
			dataArray[iterate].age,
			dataArray[iterate].gender,
			dataArray[iterate].sexualOrientation,
			dataArray[iterate].highPriority,
			dataArray[iterate].highPriority2,
			dataArray[iterate].mediumPriority,
			dataArray[iterate].mediumPriority2,
			dataArray[iterate].lowPriority,
			dataArray[iterate].lowPriority2,
			dataArray[iterate].city,
			dataArray[iterate].latitude,
			dataArray[iterate].longitude,
			dataArray[iterate].rating,
			dataArray[iterate].reported,
			dataArray[iterate].temporaryBan,
			dataArray[iterate].permanentBan
		];
		connection.query(stmt + `VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values, (err) => {
			if (err) {
				throw err;
			}
			else {
				if (num === 1) {
					console.log(`${num} query inserted`);
					num += 1;
				}
				else {
					console.log(`${num} queries inserted`)
					num += 1;
				}
			}
		});
		iterate += 1;
	}
};

insert();