const { Customer } = require('../../models');

exports.create = async (args) => {
  try {
    const customer = await Customer.create(args);

    return customer.id;
  } catch (err) {
    return err;
  }
};

exports.getAll = async () => {
  try {
    return await Customer.findAll({ raw: true });
  } catch (err) {
    return err;
  }
};

exports.edit = async (customerUpdated) => {
  try {
    await Customer.update({
      ...customerUpdated,
    }, {
      where: {
        id: customerUpdated.id,
      },
    });

    const customers = await Customer.findAll({ raw: true });
    const customerEditedIndex = customers.findIndex(customer => customer.id === customerUpdated.id);

    return {
      customerEdited: customers[customerEditedIndex],
      index: customerEditedIndex,
    };
  } catch (err) {
    return err;
  }
};

exports.remove = async (id) => {
  try {
    return await Customer.destroy({ where: { id } });
  } catch (err) {
    return err;
  }
};