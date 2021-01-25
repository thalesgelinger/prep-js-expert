const Request = require("./request");

const request = new Request()

async function scheduler() {
  console.log('starting in ...', new Date().toISOString());

  const requests = [
    { url: 'https://www.mercadobitcoin.net/api/BTC/ticker/' },
    { url: 'https://www.NAO_EXITE.net' },
    { url: 'https://www.mercadobitcoin.net/api/BTC/orderbook/' },
  ]
  .map(data => ({
    ...data,
    timeout: 2000,
    method: 'get'
  }))
  .map(params => request.makeRequest(params))

  const result = await Promise.allSettled(requests)

  const allSucceded = []
  const allFailed = []

  result.forEach(({ status, value, reason }) => {
    if(status === 'rejected') {
      allFailed.push(reason)
      return
    }
    allSucceded.push(value)
  });

  console.log({
    allFailed, 
    allSucceded
  })

}

const PERIOD = 2000
setInterval(scheduler, PERIOD)