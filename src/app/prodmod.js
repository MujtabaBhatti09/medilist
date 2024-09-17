const db = require('./dbConfig');  // Adjust the path as necessary
const { parseDateToVerify } = require('./config/dateFormatter');

const myprods = async value => {
    try {
        // await db.query("BEGIN")
        // const mainVal = [
        //     value.bid,
        //     value.total,
        //     value.percentage,
        //     value.percentageAmount,
        //     value.grandTotal,
        //     parseDateToVerify(value.createdat),
        //     value.createdby
        // ]

        // console.log('=================Medi===================');
        // console.log(mainVal);
        // console.log('====================================');

        // const values = value.products.map(async val => {
        //     const newValues = [
        //         val.productName,
        //         val.quantity,
        //         val.productBoxPrice,
        //         val.productUnitPrice,
        //         val.productMilligram,
        //         parseDateToVerify(val.expireDate),
        //         val.subTotal,
        //         value.bid
        //     ]
        //     console.log('=================Prod===================');
        //     console.log(newValues);
        //     console.log('====================================');

        //     const query = `INSERT INTO "my_products"
        //     (product, quantity, "boxprice", "unitprice", "milligram", expire, subtotal, "b_id")
        //     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

        //     await db.query(query, newValues)
        // })
        // const nquery = `INSERT INTO medilist (bid, total, percentageless, percentage_amount, grandtotal, createdat, createdby)
        // VALUES ($1, $2, $3, $4, $5, $6, $7)`
        // await db.query(nquery, mainVal)
        // const res = await Promise.all(values)
        // await db.query("COMMIT")
        // return res
        await db.query("BEGIN");

        const mainVal = [
            value.bid,
            value.total,
            value.percentage,
            value.percentageAmount,
            value.grandTotal,
            parseDateToVerify(value.createdat),
            value.createdby
        ];

        console.log('=================Medi===================');
        console.log(mainVal);
        console.log('====================================');

        // Create an array of promises for inserting products
        const valuesPromises = value.products.map(val => {
            const newValues = [
                val.productName,
                val.quantity,
                val.productBoxPrice,
                val.productUnitPrice,
                val.productMilligram,
                parseDateToVerify(val.expireDate),
                val.subTotal,
                value.bid
            ];

            console.log('=================Prod===================');
            console.log(newValues);
            console.log('====================================');

            const query = `INSERT INTO "my_products"
                (product, quantity, "boxprice", "unitprice", "milligram", expire, subtotal, "b_id")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

            return db.query(query, newValues);
        });

        // Insert the medilist entry
        const nquery = `INSERT INTO medilist (bid, total, percentageless, percentage_amount, grandtotal, createdat, createdby)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        await db.query(nquery, mainVal);

        // Wait for all product insertions to complete
        await Promise.all(valuesPromises);
        await db.query("COMMIT");
        return "pass"
        // Commit the transaction
    } catch (error) {
        await db.query("ROLLBACK");
        console.error("Transaction failed, rolled back:", error.message);
        throw new Error(`Transaction failed: ${error.message}`);
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