const db = require('@/app/dbConfig');  // Adjust the path as necessary
const { parseDateToVerify } = require('./config/dateFormatter');

const myprods = async value => {
    try {
        const rand = Math.floor(Math.random() * 90000000)
        await db.query("BEGIN")
        const mainVal = [
            rand,
            value.total,
            value.percentage,
            value.percentageAmount,
            value.grandTotal,
            parseDateToVerify(value.createdat),
            value.createdby
        ]

        console.log('=================Medi===================');
        console.log(mainVal);
        console.log('====================================');

        const values = value.products.map(async val => {
            const newValues = [
                val.productName,
                val.quantity,
                val.productBoxPrice,
                val.productUnitPrice,
                val.productMilligram,
                parseDateToVerify(val.expireDate),
                val.subTotal,
                rand
            ]
            console.log('=================Prod===================');
            console.log(newValues);
            console.log('====================================');

            const query = `INSERT INTO my_products
            (product, quantity, boxprice, unitprice, milligram, expire, subtotal, b_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

            await db.query(query, newValues)
        })
        const nquery = `INSERT INTO medilist (bid, total, percentageless, percentage_amount, grandtotal, createdat, createdby)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`
        await db.query(nquery, mainVal)
        const res = await Promise.all(values)
        await db.query("COMMIT")
        return res
    } catch (error) {
        throw error.message
    }
}

const getmyprods = async () => {
    const res = await db.query(`SELECT * FROM my_products`)
    return res.rows
}

module.exports = {
    myprods,
    getmyprods
}