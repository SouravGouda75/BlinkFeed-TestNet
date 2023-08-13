import React from 'react'
import Video from './component/Video'
import Message from './component/Message'
import SocketMessage from './component/SocketMessage'
import SocketPeerVideo from './component/SocketPeerVideo'

const App = () => {
		return (
				<div>
					{/* <Video/> */}
					{/* <Message/> */}
					{/* <SocketMessage/> */}
					<SocketPeerVideo/>
				</div>
		)
}

export default App