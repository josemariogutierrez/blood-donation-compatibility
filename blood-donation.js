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
        answer = getBloodCompatibility(resp.data)
        console.log(resp.data);
        console.log(answer);
        
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