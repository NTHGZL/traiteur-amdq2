import express from 'express'
import { createOrder, getStatut, updateStatus } from './repository/repository.js'
import amqp from 'amqplib'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const connection = await amqp.connect('amqp://localhost:5672')
const channel = await connection.createChannel()
await channel.assertExchange('ordersExchange', 'fanout', { durable: true, autoDelete: false });
const q = channel.assertQueue('orders', {durable: true})
await channel.bindQueue(q.queue, 'ordersExchange', '')



app.post('/order', async (req, res) => {
  
  try {

    const order = await createOrder()
    channel.publish('ordersExchange', '', Buffer.from(JSON.stringify({ orderId: order.id, status: 'Commande en cours' })));
    res.send(order)
  } catch (error) {
      console.error(error);
      res.status(500).send('Error updating order status.');
  }
  });

app.get('/order/:id', async (req, res) => {
    try {
      const order = await getStatut(req.params.id)
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

      res.send(order)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting order status.');
    }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})