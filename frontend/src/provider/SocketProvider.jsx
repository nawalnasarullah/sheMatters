
import { SocketContextProvider } from '../context/SocketContext.jsx'

const SocketProvider= ({ children }) => {
    return <SocketContextProvider>{children}</SocketContextProvider>;
};

export default SocketProvider;
