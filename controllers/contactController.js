const Contact = require("../models/Contact");

exports.addContact = async (req, res, next) => {
  try {
    const { name, email, phone, type } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      type,
      userId: req.user.id,
    });

    const result = await contact.save();
    res.status(201).json({ payload: result, msg: "Contact was created" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .send({ exception: "Something bad happened. Could not create contact" });
  }
};

exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id }).sort({
      date: -1,
    }); //most recent first

    if (contacts.length === 0) {
      res.status(404).json({
        payload: null,
        msg: "No contacts found",
      });
    }

    res.status(200).json({ payload: contacts });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      payload: null,
      exception: "Something bad happened. Cannot process request",
    });
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, name, phone, type } = req.body;

    let contact = await Contact.findById(id);

    if (!contact) {
      res.status(404).json({
        payload: null,
        msg: "Contact not found to update",
      });
    }

    if (contact.userId.toString() !== req.user.id.toString()) {
      res.status(401).json({
        payload: null,
        msg: "You can only update your contacts",
      });
    }

    let updatedContact = { email, name, phone, type };

    contact = await Contact.findOneAndUpdate(
      id,
      { $set: updatedContact },
      { new: true }
    );

    res.status(200).json({ payload: contact, msg: "Contact Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      payload: null,
      exception: "Something bad happened. Cannot process request",
    });
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    let contact = await Contact.findById(id);

    if (!contact) {
      res.status(404).json({
        payload: null,
        msg: "Contact not found to update",
      });
    }

    if (contact.userId.toString() !== req.user.id.toString()) {
      res.status(401).json({
        payload: null,
        msg: "You can only delete your contacts",
      });
    }

    await Contact.findByIdAndRemove(id);

    res.status(200).json({ msg: "Contact Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      exception: "Something bad happened. Cannot process request",
    });
  }
};
