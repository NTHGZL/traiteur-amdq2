const Sequelize = require('sequelize');
const sequelize = new Sequelize('traiteur', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const Order = sequelize.define('order', {
    status: Sequelize.STRING,
  });



export const createOrder = async () => {
    const order = await Order.create({
        status: 'In progress...'
    })

    sequelize.sync();

    return order
}

export const updateStatus = async (status) => {
    const order = await Order.update({ status: status}, { where: { id: req.params.id } })
    .then(() => res.send('Order status updated.'))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error updating order status.');
    });
}