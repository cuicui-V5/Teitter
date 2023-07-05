import { reactive, ref } from "vue";

let socket: WebSocket | null = null;

export const connectionStatus = ref(0); // 0 未连接 1 已连接
export const createSocket = (receiveHandler: (msg: any) => void) => {
    const token = localStorage.getItem("token");
    if (token) {
        socket = new WebSocket(
            "wss://www.heron.love:8070/teitter/v2/api/intoChat",
            [token],
        );

        socket.addEventListener("open", () => {
            console.log("WebSocket connection established.");
            connectionStatus.value = 1;
        });

        socket.addEventListener("message", receiveHandler);
        socket.addEventListener("error", event => {
            console.log("Error:");
            connectionStatus.value = 0;
        });

        socket.addEventListener("close", e => {
            console.log("WebSocket connection closed.", e);
            connectionStatus.value = 0;
        });
    }
};
export const sendMessage = (msg: object) => {
    if (socket) {
        socket.send(JSON.stringify(msg));
    } else {
        console.log("socket 不存在");
    }
};
export const closeConnect = () => {
    socket?.close();
};
