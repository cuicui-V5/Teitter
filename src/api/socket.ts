export const createSocket = () => {
    const token = localStorage.getItem("token") || undefined;

    const socket = new WebSocket(
        "wss://www.heron.love:8070/teitter/v2/api/intoChat",
        token,
    );

    socket.addEventListener("open", () => {
        console.log("WebSocket connection established.");
    });

    socket.addEventListener("message", event => {
        console.log("Received message:", event.data);
    });

    socket.addEventListener("close", () => {
        console.log("WebSocket connection closed.");
    });
};
