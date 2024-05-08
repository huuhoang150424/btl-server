const ProductsSchema=require("../model/ProductsModel")


class productsController {
    // [GET]
    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1; // Trang mặc định là 1
            const limit = parseInt(req.query.limit) || 10; // Số lượng mặc định trên mỗi trang là 10
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const total = await ProductsSchema.countDocuments();
            const products = await ProductsSchema.find().limit(limit).skip(startIndex);
            // Phân trang dựa trên số lượng sản phẩm và số lượng trên mỗi trang
            const pagination = {};
            if (endIndex < total) {
                pagination.next = {
                    page: page + 1,
                    limit: limit
                };
            }
            if (startIndex > 0) {
                pagination.prev = {
                    page: page - 1,
                    limit: limit
                };
            }
            return res.status(200).json({
                data: products,
                pagination: pagination
            });
        } catch(err) {
            return res.status(404).json({
                message: err
            });
        }
    }
    // [GET DETAIL]
    async getDetail(req,res) {
        try {
            const Product=await ProductsSchema.findById(req.params.id)
            return res.status(200).json({
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