$(function() {
    // Initialize the Survey model with JSON
    const survey = new Survey.Model(json);

    // API Configuration
    const apiUrlPincode = "https://apim.quickwork.co/mentortrack/pincode/v1/pincode";
    const apiUrlCscId = "https://apim.quickwork.co/mentortrack/pincode/v1/cscid";
    const apiKey = "KGVpd5OgoHPLuymT5SiAcIUdSoKE6W57";

    // Event handler for CSC ID changes in the survey
    survey.onValueChanged.add(async (sender, options) => {
        if (options.name === "question1") {
            const enteredCscId = options.value;
            console.log("CscId entered:", enteredCscId);
            const cscId = await fetchCscId(enteredCscId);
            const messageElement = survey.getQuestionByName("cscVleIdMessage");
    
            if (cscId) {
                // Hide the message if the CSC ID is found
                messageElement.visible = false;
                survey.getQuestionByName("question1").value = cscId;
            } else {
                // Show the "New CSC VLE ID" message if the CSC ID is not found
                messageElement.visible = true;
            }
        }
    });
    
    // Function to fetch CSC ID based on entered CSC ID
    const fetchCscId = async (enteredCscId) => {
        try {
            const response = await fetch(`${apiUrlCscId}?cscid=${enteredCscId}`, {
                method: "GET",
                headers: {
                    "apikey": apiKey
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.cscid;
        } catch (error) {
            console.error("Error fetching the CSC ID:", error);
            return ""; // Return an empty string in case of an error
        }
    };

    // Event handler for pincode changes in the survey
    survey.onValueChanged.add(async (sender, options) => {
        if (options.name === "question4") {
            const enteredPincode = options.value;
            console.log("Pincode entered:", enteredPincode);
            const address = await fetchAddress(enteredPincode);
            if (address) {
                // Set the fetched address to the corresponding survey question
                survey.getQuestionByName("question5").value = address;
            } else {
                console.log("Address not found for the given pincode");
            }
        }
    });

    // Function to fetch address based on pincode
    const fetchAddress = async (enteredPincode) => {
        try {
            const response = await fetch(`${apiUrlPincode}?Pincode=${enteredPincode}`, {
                method: "GET",
                headers: {
                    "apikey": apiKey
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.Address;
        } catch (error) {
            console.error("Error fetching the address:", error);
            return ""; // Return an empty string in case of an error
        }
    };

    // Render the Survey in the div with id "surveyElement"
    $("#surveyElement").Survey({ model: survey });

    // Optional: Handle form submission
    survey.onComplete.add((sender) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
});
