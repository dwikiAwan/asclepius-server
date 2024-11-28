const { Firestore } = require("@google-cloud/firestore");

function modelData(doc) {
	return {
		id: doc.id,
		history: {
			result: doc.data().result,
			createdAt: doc.data().createdAt,
			suggestion: doc.data().suggestion,
			id: doc.id,
		},
	};
}

async function database() {
    const settings = {
        projectId: process.env.PROJECT_ID,
    };
    return new Firestore(process.env.APP_ENV === "local" ? settings : undefined);
}

async function storeData(id, data) {
	const predictCollection = (await database()).collection("predictions");
	return predictCollection.doc(id).set(data);
}



module.exports = { storeData, modelData };
