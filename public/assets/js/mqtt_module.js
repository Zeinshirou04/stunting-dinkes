console.log("MQTT Modules Import Successfull")

// Declaring global variables
var deviceID;
var host = "test.mosquitto.org";
var port = 8080;

// Creating or Declaring client ID
var clientID = "clientID-" + parseInt(Math.random() * 100);


function startConnect(deviceID, message = null) {

    // Declaring host and port
    host = "test.mosquitto.org";
    port = 8080;

    console.log("Connecting to " + host + " " + port);
    console.log("Client ID: " + clientID);
    console.log("Device ID: " + deviceID)

    // Initializing new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Set handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connecting the client
    client.connect({
        onSuccess: function() { onConnect(message); },
    });
}

// onConnect function
function onConnect(message) {
    console.log("Connected");

    // Subscribe to the topic
    topic = "StuntingEsp32";
    client.subscribe(topic);
    publishMessage(message, topic);
}

function onConnectionLost(responseObject){
    console.log("ERROR: Connection is lost.")
    if(responseObject !=0){
        console.log("ERROR: " + responseObject.errorMessage);
    }
}

function onMessageArrived(message){
    console.log("OnMessageArrived: " + message.payloadString);
}

function startDisconnect(){
    client.disconnect();
    console.log("Disconnected");
}

function publishMessage(message, topic){
    Message = new Paho.MQTT.Message(message);
    Message.destinationName = topic;
    client.send(Message);
    console.log("Message sent: " + Message.payloadString + " to topic: " + topic)
}