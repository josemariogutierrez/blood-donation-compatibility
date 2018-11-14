const axios = require("axios");

const canDonateTo = {};

const chart = {
    "O-": ["AB+","AB-","A+","A-","B+","B-","O+","O-"],
    "O+": ["AB+","A+","B+","O+"],
    "B-": ["AB+","AB-","B+","B-"],
    "B+": ["AB+","B+"],
    "A-": ["AB+","AB-","A+","A-"],
    "A+": ["AB+","A+"],
    "AB-": ["AB+","AB-"],
    "AB+": ["AB+"],
}

axios.get('https://jsconf.admios.com/blood-types')
    .then((resp) => {
        const token = resp.headers.authorization
        const result = resp.data
        console.log(token, result);
        sendAnswer(getBloodCompatibility(result), {headers: {"Authorization": token}})
    });

function checkIfCanDonate(chart, donorBlood, doneeBlood){

    const donorChart = chart[donorBlood];

    for (let aceptedDoneeBlood of donorChart) {
        if(aceptedDoneeBlood == doneeBlood){
            return true;
            break;
        }
    }
}

function getBloodCompatibility(donatorsList){
    
    for (let donor in donatorsList) {
        if (donatorsList.hasOwnProperty(donor)) {
            
            const doneesList = []
            
            for (let donee in donatorsList) {
                if(donor != donee){
                    if(checkIfCanDonate(chart, donatorsList[donor], donatorsList[donee])){
                        doneesList.push(donee)
                    }
                }
            }
            
            canDonateTo[donor] = doneesList;
        }
    }
    
    return canDonateTo;
}

function sendAnswer(data, opts) {
    axios
    .post('https://jsconf.admios.com/blood-types', data, opts)
    .then(function(resp) {
        if (resp.status !== 200) {
            const token = resp.headers.authorization
            const result = resp.data
            sendAnswer(getBloodCompatibility(result), {headers: {"Authorization": token}})
        } else {
            console.log(resp.status)
            console.log(resp.data)
        }
    });
  }