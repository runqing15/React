import {useEffect, useState} from "react";

function Forex() {
  const [EURData, setEURData] = useState([]);
  const [CHFData, setCHFData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://socket.polygon.io/forex')

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
        ws.send(JSON.stringify({"action":"subscribe","params":"C.C:EUR-USD,C.C:CHF-USD"}));
      }

      console.log('Message received:', parsedMessage);
      parsedMessage.forEach(message => {
        if (message.p === 'EUR/USD') {
          setEURData(prevState => [message, ...prevState]);
        } else if (message.p === 'CHF/USD') {
          setCHFData(prevState => [message, ...prevState]);
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
        <th>EUR/USD</th>
        <th>CHF/USD</th>
      </tr>
      </thead>
      <tbody>
      {
        EURData.slice(0, 20).map((item, index) => CHFData[index] && (
          <tr key={index}>
            <td>
              {new Date(item.t).toLocaleString()}
            </td>
            <td>
              {item.a}
            </td>
            <td>
              {CHFData[index].b}
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
  )
}

export default Forex
