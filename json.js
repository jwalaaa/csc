const json = {
  "title": "CSC",
  "logoPosition": "right",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "text",
          "name": "question1",
          "title": "CSC VLE ID",
          "isRequired": true,
          "inputType": "number",
          "validators": [
            {
              "type": "regex",
              "text": "CSC VLE ID must be a 12-digit number, cannot start with zero, and the last 4 digits should be between 0010 and 0019.",
              "regex": "^[1-9]\\d{7}(001[0-9])$"
            }
          ]
        },
        {
          "type": "html",
          "name": "cscVleIdMessage",
          "visible": false,
          "html": "<div id='cscVleIdMessage'>New CSC VLE ID</div>"
        },
        {
          "type": "text",
          "name": "question2",
          "title": "CSC VLE NAME",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "question3",
          "title": "CSC VLE Phone No.",
          "isRequired": true,
          "inputType": "number",
          "validators": [
            {
              "type": "regex",
              "text": "Phone No should be 10 characters long.",
              "regex": "^\\d{10}$"
            }
          ]

        },
        {
          "type": "text",
          "name": "question4",
          "title": "CSC VLE Pin Code",
          "isRequired": true,
          "inputType": "number",
          "validators": [
            {
              "type": "regex",
              "text": "Pincode should be 6 characters long.",
              "regex": "^\\d{6}$"
            }
          ]
        },
        {
          "type": "comment",
          "name": "question5",
          "title": "CSC VLE Address (Not Mandatory)"
        }
      ]
    }
  ]
};
