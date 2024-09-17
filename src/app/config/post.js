import axios from "axios";

// For Add Expense Category Function
export const postExpenseCategory = async expenseCategoryData => {
    if (!expenseCategoryData) {
        throw new Error("Cannot Add Empty Field");
    }

    try {
        const response = await axios.post("/api/expense", {
            expenseCategory: expenseCategoryData.categoryName,
            createdBy: expenseCategoryData.createdBy,
        });

        if (response && response.data) {
            return response.data.message;
        } else {
            throw new Error("Error While Adding Category Data");
        }
    } catch (error) {
        console.error("Error occurred while posting expense:", error);
        throw new Error(error.message);
    }
};

// For Post Expense Data Function
export const postExpenseData = async expense => {
    if (!expense) {
        throw new Error("Cannot Add Empty Field");
    }

    try {
        const response = await axios.post("/api/expense", {
            expenseName: expense.expenseType,
            category: expense.expenseCategory,
            createdOn: expense.createdOn,
            amount: expense.amount,
            notes: expense.notes,
            clientId: expense.createdBy,
        });

        if (response && response.data) {
            return response.data.message;
        } else {
            throw new Error("Error While Adding Expense Data");
        }
    } catch (error) {
        console.error("Error occurred while posting Expense Data:", error);
        throw new Error(error.message);
    }
};

export const postProductData = async product => {
    if (!product) {
        throw new Error("Cannot Add Empty Field");
    }

    try {
        const response = await axios.post("/api/products", {
            partNumber: product.partNumber,
            productName: product.productName,
            category: product.category,
            brand: product.brand,
            productCost: product.productCost,
            productPrice: product.productPrice,
            purchasedUnits: product.purchasedUnits,
            availableUnits: product.availableUnits,
            warehouse: product.warehouse,
            stockAlert: product.stockAlert,
            notes: product.notes,
            image: product.image,
            createdOn: product.createdOn,
            createdBy: product.createdBy,
        });

        if (response && response.data) {
            return response.data;
        } else {
            throw new Error("Error While Adding Product Data");
        }
    } catch (error) {
        console.error("Error occurred while posting Product Data:", error);
        throw new Error(error.message);
    }
}

export const postCustomer = async customer => {
    if (!customer) {
        throw new Error("Cannot Add Empty Field");
    }

    const response = await axios.post("/api/customer/", {
        customerName: customer.customerName,
        customerContact: customer.customerContact,
        shopName: customer.shopName,
        shopAddress: customer.shopAddress,
        additionalInformation: customer.additionalInformation,
        createdBy: customer.createdBy
    })

    if (response && response.data) {
        return response.data.message;
    } else {
        throw new Error("Error While Adding Customer");
    }

}

export const supplier = {
    add: async supplierData => {
        try {
            if (!supplierData) {
                throw new Error("Empty Data")
            }
            const response = await axios.post("/api/supplier/", {
                supplierName: supplierData.name,
                supplierContact: supplierData.contact,
                supplierAddress: supplierData.address,
                createdBy: supplierData.createdBy,
            })
            if (response) {
                return response.data.message
            } else {
                return response.data.error || "No Response"
            }
        } catch (error) {
            return error.message
        }
    },
    getCategory: async clientId => {
        try {
            if (!clientId) {
                throw new Error("Empty Data")
            }
            const response = await axios.post("/api/supplier/", {
                clientId: clientId
            })
            if (response) {
                return response.data.supplier
            } else {
                return response.data.error || "No Response"
            }
        } catch (error) {
            return error.message
        }
    }
}

export const purchase = {
    add: async purchase => {
        try {
            if (!purchase) {
                throw new Error("Empty Data")
            }
            const response = await axios.post("/api/purchase", {
                purchaseId: purchase.purchaseId,
                products: purchase.products,
                supplierId: purchase.supplierId,
                totalQuantity: purchase.totalQuantity,
                shippingCost: purchase.shippingCost,
                tax: purchase.tax,
                subTotal: purchase.subTotal,
                grandTotal: purchase.grandTotal,
                notes: purchase.notes,
                createdOn: purchase.createdOn,
                createdBy: purchase.createdBy
            })
            if (response) {
                return response.data.message
            } else {
                response.data.error || "Purchase Didn't Create"
            }
        } catch (error) {
            return error.message
        }
    },
    get: async clientId => {
        try {
            if (!clientId) {
                throw new Error("No Data Found")
            }
            const response = await axios.post("/api/purchase/", {
                clientId: clientId
            })
            if (response) {
                return response.data.fetchedPurchaseData
            } else {
                return response.data.error
            }
        } catch (error) {
            return error.message
        }
    }
}

export const sale = {
    add: async products => {
        try {
            if (!products) {
                throw new Error("Empty Data")
            }
            const response = await axios.post("/api/sale/", {
                products: products.products,
                bill_Id: products.bill_Id,
                customer_Type: products.customer_Type,
                customer_Id: products.customer_Id,
                customerName: products.customerName,
                totalQuantity: products.totalQuantity,
                subTotal: products.subTotal,
                shippingCost: products.shippingCost,
                tax: products.tax,
                serviceCharges: products.serviceCharges,
                grandTotal: products.grandTotal,
                paymentType: products.paymentType,
                partialPayment: products.partialPayment,
                duePayment: products.duePayment,
                billStatus: products.billStatus,
                notes: products.notes,
                createdOn: products.createdOn,
                createdBy: products.createdBy,
            })
            if (response) {
                return response.data.message
            } else {
                return response.data.error
            }
        } catch (error) {
            return error.message
        }
    },
    get: async sale => {
        try {
            if (sale) {
                const response = await axios.post("/api/sale/", {
                    clientId: sale
                })

                if (response) {
                    return response.data.data
                } else {
                    return response.data.error
                }
            }
        } catch (error) {
            throw error
        }
    },
    getSoldProducts: async sale => {
        try {
            if (sale) {
                const response = await axios.post("/api/sale/", {
                    saleListId: sale
                })

                if (response) {
                    return response.data.data
                } else {
                    return response.data.error
                }
            }
        } catch (error) {
            throw error
        }
    },
    saleReturn: async products => {
        try {
            if (!products) {
                throw new Error("Empty Data")
            }
            const response = await axios.post("/api/sale/", {
                products: products.products,
                bill_Id: products.bill_Id,
                customer_Type: products.customer_Type,
                customer_Id: products.customer_Id,
                customerName: products.customerName,
                totalQuantity: products.totalQuantity,
                subTotal: products.subTotal,
                shippingCost: products.shippingCost,
                tax: products.tax,
                serviceCharges: products.serviceCharges,
                grandTotal: products.grandTotal,
                paymentType: products.paymentType,
                partialPayment: products.partialPayment,
                duePayment: products.duePayment,
                billStatus: products.billStatus,
                notes: products.notes,
                createdOn: products.createdOn,
                createdBy: products.createdBy,
            })
            if (response) {
                return response.data.message
            } else {
                return response.data.error
            }
        } catch (error) {
            return error.message
        }
    },
}

export const warehouseAdd = {
    add: async warehouse => {
        try {
            if (!warehouse) {
                throw new Error("Data Can't Be Empty!")
            }
            const response = await axios.post("/api/warehouse/", {
                warehouseName: warehouse.warehouseName,
                warehouseCity: warehouse.warehouseCity,
                warehouseAddress: warehouse.warehouseAddress,
                createdBy: warehouse.createdBy
            })
            if (response) {
                return response.data.message
            } else {
                return response.data.error
            }
        } catch (error) {
            return error.message
        }
    },
    get: async warehouse => {
        try {
            if (!parseInt(warehouse)) {
                throw new Error("Role Is Undefined")
            }
            const response = await axios.post("/api/warehouse/", {
                clientId: warehouse
            })
            if (response) {
                return response.data.warehouse
            } else {
                return response.data.error
            }
        } catch (error) {
            return error.message
        }
    }
}

// WRITTEN BY BHATTI NOT GPT!!!