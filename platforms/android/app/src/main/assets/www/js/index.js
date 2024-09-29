const token = "eZU5mBkTezgP4UjrqGjhogCsh1Eepg";
const baseUrl = "https://www.valifystage.com/";
const bundleKey = "ee3a3dfa43734ac1b416c5729d3f3aef";
const language = "en";
const primaryColor = "#000000"; // Assuming a primary color
const testOCR = true;


// OCR specific parameters
const ocrParams = {
access_token: token,
base_url: baseUrl,
bundle_key: bundleKey,
language: language,
primary_color: primaryColor,
document_verification: false,
data_validation: false,
return_data_validation_error: false,
review_data: false,
capture_only_mode: false,
manual_capture_mode: false,
preview_captured_image: false,
headers: {
    'Custom-Header': 'Value' // Example header
},
enable_logging: false,
collect_user_info: true,
advanced_confidence: true,
profession_analysis: true,
document_verification_plus: true
};


// Start process function refactored to only initialize relevant SDK based on condition
function startProcess() {
    if (testOCR) { // Assuming testOCR determines which SDK to use
        console.log("Starting OCR");
        window.VIDVOCRPlugin.startOCR(ocrParams, null, function(result) {
            console.log("response initiated");
            const s = result.toString();
            const jsonResult = JSON.parse(s);
            console.log("OCR Success:", jsonResult);
            const state = jsonResult.nameValuePairs.state;
            console.log(state)
            switch (state) {
                case "SUCCESS":
                    console.log("OCR was successful.");
                    break;
                case "CAPTURED_IMAGES":
                    console.log("Live captured images (one per time)");
                    // Add more logic here as necessary
                    break;
            }
        }, function(error) {
            const s = error.toString();
            const jsonResult = JSON.parse(s);
            console.error("OCR Error:", jsonResult);
            const state = jsonResult.nameValuePairs.state;
            switch (state) {
                case "ERROR":
                    console.log("A Builder Error");
                    // Add more logic here as necessary
                    break;
                case "FAILURE":
                    console.log("A Service Failure");
                    // Add more logic here as necessary
                    break;
                case "EXIT":
                    console.log("Process was exited by the user.");
                    // Add more logic here as necessary
                    break;
            }
        });
    }
}

document.getElementById("button").addEventListener("click", startProcess);
