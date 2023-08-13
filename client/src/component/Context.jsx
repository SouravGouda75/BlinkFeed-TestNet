import React, { useMemo } from 'react'
import { useContext, createContext } from 'react'
import io from 'socket.io-client'
const socketContext = createContext(null)
export const useSocket = () => useContext(socketContext)
export const SocketContext = ({ children }) => {
	const socket = useMemo(() => io('http://localhost:3000'), [])
	return (
		<socketContext.Provider value={socket}>
			{children}
		</socketContext.Provider>
	)
}

export default SocketContext