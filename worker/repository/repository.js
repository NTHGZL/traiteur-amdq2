import Sequelize from 'sequelize'
const sequelize = new Sequelize('traiteur', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const Order = sequelize.define('order', {
  status: Sequelize.STRING,
}, {freezeTableName: true});

sequelize.sync();


export const updateStatus = async (id) => {
    const order = await Order.update({ status: 'Commande traitée'}, { where: { id: id } })
   
    return order
}