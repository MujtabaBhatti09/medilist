import axios from "axios"

export const handleDeleteAction = async value => {
    ////////////////////////////////
    // For Deleting Customer
    if (value.customer) {
        try {
            let data = {
                id: value.id,
                createdBy: value.createdBy
            }
            const response = await axios.delete("/api/customer/", {
                data: data
            })
            if (response) {
                return response.data.message
            } else {
                return response.error
            }
        } catch (error) {
            return error.message
        }
    }
    ////////////////////////////////

    ////////////////////////////////
    //For Deleting Product
    if (value.product) {
        try {
            let data = {
                id: value.id,
                createdBy: value.createdBy
            }

            const response = await axios.delete("/api/products/", {
                data: data
            })

            if (response) {
                return response.data.message
            } else {
                return response.error
            }

        } catch (error) {
            return error.message
        }
    }
    ////////////////////////////////

    ////////////////////////////////
    // For Deleting Expense
    if (value.expense) {
        try {
            let data = {
                expenseId: value.id,
                createdBy: value.createdBy
            }
            const response = await axios.delete("/api/expense/", {
                data: data
            })

            if (response) {
                return response.data.message
            } else {
                return response.error
            }

        } catch (error) {
            return error.message
        }
    }


}

export const handleEditAction = async (value) => {
    if (value.product) {
        try {
            const response = await axios.put("/api/products/", {
                productId: value.productId,
                productCost: value.productCost,
                productPrice: value.productPrice,
                purchasedUnits: value.purchasedUnits,
                availableUnits: value.availableUnits,
                warehouse: value.warehouse,
                stockAlert: value.stockAlert,
                notes: value.notes,
                image: value.image,
                createdBy: value.createdBy,
                product: value.product
            })
            if (response) {
                return response.data.message
            } else {
                return response.data.error
            }
        } catch (error) {
            return error.message
        }
    }

    if (value.customer) {
        try {
            const response = await axios.put("/api/customer/", {
                customerId: value.customerId,
                customerName: value.customerName,
                customerContact: value.customerContact,
                shopName: value.shopName,
                shopAddress: value.shopAddress,
                additionalInformation: value.additionalInformation,
                createdBy: value.createdBy
            })

            if (response && response.data) {
                return response.data.message;
            } else {
                throw new Error("Error While Updating Customer");
            }
        } catch (error) {

        }
    }
}