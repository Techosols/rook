// import { io } from "socket.io-client";
import SocketContext from "./SocketContext";


const SocketProvider = ({ children }) => {
   
    const values = {
        
    };

    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;