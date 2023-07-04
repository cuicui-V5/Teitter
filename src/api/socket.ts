import { reactive, ref } from "vue";

let socket: WebSocket | null = null;
enum status {
    open,
    close,
}
export const connectionStatus = ref(status.close);
export const createSocket = (receiveHandler: (msg: any) => void) => {
    const token = localStorage.getItem("token") || "";

    socket = new WebSocket(
        "wss://www.heron.love:8070/teitter/v2/api/intoChat",
        [token],
    );

    socket.addEventListener("open", () => {
        console.log("WebSocket connection established.");
        connectionStatus.value = status.open;
    });

    socket.addEventListener("message", receiveHandler);
    socket.addEventListener("error", event => {
        console.log("Error:");
        connectionStatus.value = status.close;
    });

    socket.addEventListener("close", e => {
        console.log("WebSocket connection closed.", e);
        connectionStatus.value = status.open;
    });
};
export const sendMessage = (msg: object) => {
    if (socket) {
        socket.send(JSON.stringify(msg));
    } else {
        console.log("socket 不存在");
    }
};
