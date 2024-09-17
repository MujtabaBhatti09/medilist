import axios from "axios";

export const fetchCustomers = async value => {
    if (value) {
        try {
            const response = await axios.post("/api/customer/", {
                clientId: value
            })
            if (response) {
                return response.data.fetchedCustomer
            } else {
                return response.data.error
            }
        } catch (err) {
            return err.message
        }
    }
}

// For Fetching Expense Data Function
export const getExpenseData = async fetchExpense => {
    if (fetchExpense) {
        try {
            const response = await axios.post("/api/expense", {
                fetchId: fetchExpense
            });

            if (response && response.data) {
                return response.data.fetchedExpenseData;
            } else {
                throw new Error("Error While Fetching Expense Data");
            }
        } catch (error) {
            console.error("Error occurred while Fetching Expense Data:", error);
            throw new Error(error.message);
        }
    }

};

// For Fetch Expense Category Function
export const getExpenseCategory = async expenseCategoryData => {
    if (expenseCategoryData) {
        try {
            const response = await axios.post("/api/expense", {
                createdBy: expenseCategoryData
            });

            if (response && response.data) {
                return response.data.fetchedExpenseCategory;
            } else {
                throw new Error("Error While fetching Expense Category Data");
            }
        } catch (error) {
            console.error("Error occurred while fetching expense category:", error.message);
            throw new Error(error.message);
        }
    }

};

// For Fetching Product Brand Data
export const getProductBrand = async productBrand => {
    if (productBrand) {
        try {
            const response = await axios.post("/api/products/brandAndCategory", {
                brandId: productBrand
            });

            if (response && response.data) {
                return response.data.brand;
            } else {
                throw new Error("Error While fetching Product Brand Data");
            }
        } catch (error) {
            console.error("Error occurred while fetching Product Brand:", error.message);
            throw new Error(error.message);
        }
    }

};

// For Fetching Product Brand Data
export const getProductCategory = async productCategory => {
    if (productCategory) {
        try {
            const response = await axios.post("/api/products/brandAndCategory", {
                categoryId: productCategory
            });

            if (response && response.data) {
                return response.data.category;
            } else {
                throw new Error("Error While fetching Product Category Data");
            }
        } catch (error) {
            console.error("Error occurred while fetching Product Category:", error.message);
            throw new Error(error.message);
        }
    }

};

export const getProductData = async productData => {
    if (productData) {
        try {
            const response = await axios.post("/api/products/", {
                clientId: productData
            })
            if (response) {
                return response.data.fetchedProduct
            } else {
                return response.data.error
            }
        } catch (err) {
            return err.message
        }
    }
}