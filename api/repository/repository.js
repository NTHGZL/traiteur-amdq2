import Sequelize from 'sequelize'
const sequelize = new Sequelize('traiteur', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const Order = sequelize.define('order', {
    status: Sequelize.STRING,
  }, {freezeTableName: true});

  sequelize.sync();

export const createOrder = async () => {
    
    const order = await Order.create({
        status: 'Commande en cours'
    })

    sequelize.sync();

    return order
}

export const getStatut = async(id) => {
  const order = await Order.findByPk(id)

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