const ProductsSchema=require("../model/ProductsModel")


class productsController {
    // [GET]
    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;// Mặc định trang đầu tiên
            const limit = parseInt(req.query.limit) 
            const startIndex = (page - 1) * limit
            const endIndex = page * limit
            const total = await ProductsSchema.countDocuments()
            const sort = req.query.sort || null // Tham số sắp xếp
            const filters = req.query.filter || null // Mảng các bộ lọc
            // Phân trang dựa trên số lượng sản phẩm và số lượng trên mỗi trang
            const pagination = {}
            if (endIndex < total) {
                pagination.next = {
                    page: page + 1,
                    limit: limit
                }
            }
            if (startIndex > 0) {
                pagination.prev = {
                    page: page - 1,
                    limit: limit
                }
            }
            let filterOptions = {}
            if (filters) {
                for (let i = 0; i < filters.length; i += 2) {
                    filterOptions[filters[i]] = { '$regex': filters[i + 1] }
                }
            }
            let sortOption = {}
            if (sort) {
                if (sort === 'name') {
                    sortOption.name = 1 // Sắp xếp theo tên sản phẩm tăng dần
                } else if (sort === 'price') {
                    sortOption.price = 1 // Sắp xếp theo giá sản phẩm tăng dần
                }
            }
            let query = {};
            if (Object.keys(filterOptions).length !== 0) {
                query = filterOptions
            }
            const products = await ProductsSchema.find(query).limit(limit).skip(startIndex).sort(sortOption)
            return res.status(200).json({
                message: "success",
                data: products,
                pagination: pagination
            });
        } catch(err) {
            return res.status(404).json({
                message: err.message
            })
        }
    }
    
    // [GET DETAIL]
    async getDetail(req,res) {
        try {
            const Product=await ProductsSchema.findById(req.params.id)
            return res.status(200).json({
                message: "success",
                data: Product
            })
        } catch(err) {
            return res.status(404).json({
                message: err
            })
        }
    }
    // [UPDATE]
    async updateProduct(req,res) {
        try {
            const newProduct=await ProductsSchema.findByIdAndUpdate({_id: req.params.id},req.body,{new:true})
            return res.status(200).json({
                message: "success",
                data: newProduct
            })
        } catch(err) {
            return res.status(404).json({
                message: err
            })
        }
    }
    // [CREATE]
    async createProduct(req,res) {
        try {
            const newProduct=new ProductsSchema(req.body)
            await newProduct.save()
            return res.status(200).json({
                message: "success"
            })
        } catch(err) {
            return res.status(404).json({
                message: err
            })
        }
    }
    // [DELETE]
    async deleteProduct(req,res) {
        try {
            await ProductsSchema.findByIdAndDelete(req.params.id)
            return res.status(200).json({
                message: "success"
            })
        } catch(err) {
            return res.status(404).json({
                message: err
            })
        }
    }
}
module.exports=new productsController