import amqplib from 'amqplib/callback_api.js'
import { updateStatus } from './repository/repository.js'
const queue = 'orders'

amqplib.connect('amqp://localhost:5672',(err, conn)=>{
  if(err) throw err

  conn.createChannel((err, channel) =>{
    if(err) throw err
    channel.assertQueue(queue, {durable: true})
    channel.prefetch(1)

    channel.consume(queue, async (msg)=>{
      if(msg !== null){
        const id = await JSON.parse(msg.content.toString()).orderId
        await updateStatus(id)
        
        channel.ack(msg)
      }else{
        console.log('Consumer cancelled by server')
      }
    })
  })
})