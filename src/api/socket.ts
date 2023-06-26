const socket = new WebSocket("ws://example.com");

socket.addEventListener("open", () => {
    console.log("WebSocket connection established.");
});

socket.addEventListener("message", event => {
    console.log("Received message:", event.data);
});

socket.addEventListener("close", () => {
    console.log("WebSocket connection closed.");
});
export {};
