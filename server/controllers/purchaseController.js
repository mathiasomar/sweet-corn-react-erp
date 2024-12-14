const createError = require('../utils/error')
const Purchase = require('../models/Purchase')

exports.allPurchases = async (req, res, next) => {
    const purchases = await Purchase.find().sort({ createdAt: -1 })
        .populate({ path: 'supplierId', select: ['name'] })
        .then(purchases => res.json(purchases))
        .catch(err => res.json(err))
}

exports.purchase = async (req, res, next) => {
    const purchase = await Purchase.findById({ _id: req.params.id }).sort({ createdAt: -1 })
        .populate({ path: 'supplierId', select: ['name', 'email', 'phone', 'address'] })
        .then(purchase => res.json(purchase))
        .catch(err => res.json(err))
}

exports.addPurchase = async (req, res, next) => {

    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items)) {
            return next(new createError("Invalid items array", 400));
        }

        const totalAmount = items.reduce((sum, item) => sum + parseInt(item.price), 0);
        const dic = parseInt(req.body.discount) / 100 * totalAmount
        const tx = parseInt(req.body.tax) / 100 * totalAmount
        const ship = parseInt(req.body.shipping)
        const grandTotal = (totalAmount + tx + ship) - dic

        const purchase = new Purchase({
            ref: req.body.ref,
            supplierId: req.body.supplierId,
            pdate: req.body.pdate,
            items,
            discount: req.body.discount,
            tax: req.body.tax,
            shipping: req.body.shipping,
            totalAmount,
            grandTotal,
            paid: 0,
            due: grandTotal,
            note: req.body.note,
            status: req.body.status
        })

        await purchase.save();
        res.status(201).json({ message: 'Purchase saved successfully', purchase });

    } catch (error) {
        next(error)
        console.log(error)
    }
}

exports.deletePurchase = async (req, res, next) => {
    const id = req.params.id
    try {
        await Purchase.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Purchase Deleted Successfully" })
    } catch (error) {
        next(error)
    }
}