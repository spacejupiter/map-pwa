import { w3cwebsocket } from 'websocket'

class Socket {
  constructor() {
    this.client = new w3cwebsocket('ws://localhost:7075', 'echo-protocol')

    this.state = {}
  }

  isConnectionOpened() {
    return new Promise((resolve, reject) => {
        try {
            this.client.onopen = () => {
                resolve(true)
              }
        } catch (error) {
            reject(error);
        }
      
    })
  }

  setId(message) {
    var serverMessage = JSON.parse(message)
    if (
      serverMessage.method === 'authorization' &&
      !(serverMessage._id === null)
    ) {
      this.state.connectionId = serverMessage._id
      console.log('id set')
    }
  }

  getClient(){
    return this.client;
  }

  listen() {
    return new Promise((resolve, reject) => {
      this.client.onmessage = (message) => {
        this.setId(message.data)
        var data = JSON.parse(message.data)
        resolve(data)
        console.log(JSON.parse(message.data).type)
      }
    })
  }

  getID() {
    return this.state.connectionId
  }
  

  send(message) {
    var payload = {
      data: message,
      _id: this.getID(),
    }
    this.client.send(JSON.stringify(payload))
  }

}
export default Socket
