import io from "socket.io-client";

let socket = null;

let local = "http://localhost:2002/";
let outside = "http://18.224.208.199:2002";

let addr = outside;

export let getSocket = () => {
  if (socket === null) {
    console.log("SOCKET NOT STARTED YET");
    console.log("ATTEMPTING TO START");
    return startSocket();
  } else {
    return socket;
  }
};

let startSocket = () => {
  console.log("socket starting");
  socket = io(addr);
  if (socket === null) {
    console.log("SOCKET STARTING FAILED");
    return null;
  } else {
    return socket;
  }
};
