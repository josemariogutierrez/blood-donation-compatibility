# Blood Donation Compatibility App

This app is the result of an exercise made for JsConf 2018 in Medellin Colombia.
You can find the instructions for this exercise in  [this link.](http://static.ow.ly/docs/jsconf_prob1_832h.pdf)

## Installation

The project is made with node.js and Axios, you can install it running:

```bash
$ npm install
```

## Usage

The function ```getBloodCompatibility(donatorsList)``` Takes an object with the donators and their blodd type, using the following chart it will return another object with the list of people who can donate to. 

```javascript
const donatorsList = {
  "Adam": "A+",
  "Julius": "O‑",
  "Diane": "A‑"
}

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

function getBloodCompatibility(donatorsList);

// Result: 

{
  "Adam": [],
  "Julius": ["Adam", "Diane"],
  "Diane": ["Adam"],
  
}

```

## License
[MIT](https://choosealicense.com/licenses/mit/)