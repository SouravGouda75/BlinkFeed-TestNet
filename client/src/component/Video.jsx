// import { useEffect, useRef, useState } from 'react';
// import Peer from 'peerjs';
// import './video.css';

// function Video() {
//   const [peerId, setPeerId] = useState('');
//   const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
//   const remoteVideoRef = useRef(null);
//   const currentUserVideoRef = useRef(null);
//   const peerInstance = useRef(null);

//   useEffect(() => {
//     const peer = new Peer();

//     peer.on('open', (id) => {
//       setPeerId(id)
//     });

//     peer.on('call', (call) => {
//       var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//       getUserMedia({ video: true, audio: true }, (mediaStream) => {
//         currentUserVideoRef.current.srcObject = mediaStream;
//         currentUserVideoRef.current.play();
//         call.answer(mediaStream)
        // call.on('stream', function (remoteStream) {
//           remoteVideoRef.current.srcObject = remoteStream
//           remoteVideoRef.current.play();
//         });
//       });
//     })

//     peerInstance.current = peer;
//   }, [])

//   const call = (remotePeerId) => {
//     var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//     getUserMedia({ video: true, audio: true }, (mediaStream) => {

//       currentUserVideoRef.current.srcObject = mediaStream;
//       currentUserVideoRef.current.play();

//       const call = peerInstance.current.call(remotePeerId, mediaStream)

//       call.on('stream', (remoteStream) => {
//         remoteVideoRef.current.srcObject = remoteStream
//         remoteVideoRef.current.play();
//       });
//     });
//   }

//   return (
//     <div className="App">
//       <h1>Current user id is {peerId}</h1>
//       <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
//       <button onClick={() => call(remotePeerIdValue)}>Call</button>
//       <div className="streams">

//         <div>
//           <video ref={currentUserVideoRef} />
//         </div>
//         <div>
//           <video ref={remoteVideoRef} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Video;














import React, { useEffect, useRef, useState } from 'react'
import Peer from'peerjs'
import {CopyToClipboard} from 'react-copy-to-clipboard';
const Video = () => {
  const[myId,setMyId]=useState('')
  const[copied,setCopied]=useState(false)
  const[remoteId,setRemoteId]=useState('')
  const [remoteStream, setRemoteStream] = useState(null)
  const [receivingCall, setReceivingCall] = useState(false)
  const localCam=useRef(null)
  const remoteCam=useRef(null)
  const peerConn=useRef(null)
  const calling = useRef(null)
  useEffect(() => {
    const peer=new Peer();
    console.log("peer");
    peer.on('open',()=>{
      setMyId(peer.id)
    })
    peer.on('call',call=>{
      setReceivingCall(true)
      calling.current=call
      console.log('call : ',calling.current);
    })
    
    peerConn.current=peer
    return () => {
      if (peer) {
        peer.destroy(); // Clean up Peer instance when the component unmounts
      }
    };
  }, [])
  const answer=async()=>{
    console.log("calling");
    if(calling.current){
      // alert('Calling !!')

      const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:false})
    
      // setStream(stream)
      localCam.current.srcObject=stream
      console.log("call from Event: ",call);
      // setReceivingCall(true)
      calling.current.answer(stream)
      
      
      calling.current.on('stream', (remote) => {
      setReceivingCall(true)

        console.log("Stream Data: ",remote);
        setRemoteStream(remote)
                remoteCam.current.srcObject = remote
              });
     
    }
  }
  const call=async(RemoteId)=>{
    
    const stream=await navigator.mediaDevices.getUserMedia({video:true})
    
    // setStream(stream)
    localCam.current.srcObject=stream
    //  console.log(webcam());
    const call=peerConn.current.call(RemoteId,stream)
    console.log("call from function: ",call);
    
      
    setReceivingCall(true)
    call.on('stream', (remote) => {
      console.log("Stream Data: ",remote);
      setRemoteStream(remote)
              remoteCam.current.srcObject = remote
            });
  }
 
  return (
    <>
    <div>
      <video ref={localCam} autoPlay></video>
      {
        receivingCall&&
      <video ref={remoteCam} autoPlay></video>
      }
      
      
        
       
    </div>
    <div >
      <h4>My Id:
        <CopyToClipboard
      text={myId}
      onCopy={()=>{setCopied(true)}}>
        <p>{myId}</p>
      </CopyToClipboard>
      </h4>
      
      <input type="text" onChange={e=>setRemoteId(e.target.value)} value={remoteId}/>
      <button className="sendbtn" onClick={()=>call(remoteId)}>Call</button>
    </div>
    {
      receivingCall &&
      <button className='sendbtn'onClick={()=>answer()}
        // <video ref={remoteStream} autoPlay></video>
      >Calling</button>
    }
      </>
  )
}

export default Video