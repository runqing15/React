import {useEffect, useState} from "react";

function Crypto() {
  const [BTCData, setBTCData] = useState([]);
  const [ETHData, setETHData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://socket.polygon.io/crypto')

    ws.onopen = () => {
      console.log('Connected!')
      ws.send(`{"action":"auth","params":"X3bkjz7sMIjjU7E_vHR3be5Ue0k9R3ke"}`)
    }

    ws.onclose = (code, reason) => {
      console.log('Connection closed', code, reason)
    };

    ws.onmessage = (msg) => {
      const parsedMessage = JSON.parse(msg.data);

      // wait until the message saying authentication was successful, then subscribe to a channel
      if (parsedMessage[0].ev === 'status' && parsedMessage[0].status === 'auth_success') {
        console.log('Subscribing to the minute aggregates channel for ticker AAPL');
        ws.send(JSON.stringify({"action":"subscribe","params":"XT.X:BTC-USD,XT.X:ETH-USD"}));
      }

      console.log('Message received:', parsedMessage);
      parsedMessage.forEach(message => {
        if (message.pair === 'BTC-USD') {
          setBTCData(prevState => [message, ...prevState]);
        } else if (message.pair === 'ETH-USD') {
          setETHData(prevState => [message, ...prevState]);
        }
      })
    }

    ws.onerror = (err) => {
      console.log(err)
    }
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>BTC/USD</th>
          <th>ETH/USD</th>
        </tr>
      </thead>
      <tbody>
        {
          BTCData.slice(0, 20).map((item, index) => ETHData[index] && (
            <tr key={index}>
              <td>
                {new Date(item.t).toLocaleString()}
              </td>
              <td>
                {item.p}
              </td>
              <td>
                {ETHData[index].p}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Crypto;
