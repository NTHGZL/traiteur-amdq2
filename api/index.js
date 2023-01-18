
const express = require('express')
const { createOrder, updateStatus } = require('./repository')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/order', (req, res) => {
  const amqp = require('amqplib');

  app.post('/order', async (req, res) => {
      try {

          const order = await createOrder()
        
          const connection = await amqp.connect('amqp://localhost:5672');
          
          const channel = await connection.createChannel();
          
          channel.assertExchange('orders', 'direct', { durable: true });
          
          channel.publish('orders', 'update', Buffer.from(JSON.stringify({ orderId: order.id, status: 'In progress...' })));
      } catch (error) {
          console.error(error);
          res.status(500).send('Error updating order status.');
      }
  });
  
})

const amqp = require('amqplib');

app.get('/order/:id', async (req, res) => {
    try {
      
      const connection = await amqp.connect('amqp://localhost:5672');
      
      const channel = await connection.createChannel();
      
      channel.assertExchange('orders', 'direct', { durable: true });
      
      const q = await channel.assertQueue('', { exclusive: true });
      
      channel.bindQueue(q.queue, 'orders', 'status');
        
      channel.consume(q.queue, (msg) => {
          if (msg !== null) {
              const order = JSON.parse(msg.content.toString());
              if (order.orderId === req.params.id) {
                  updateStatus(msg)
              }
              channel.ack(msg);
          }
      });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting order status.');
    }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})