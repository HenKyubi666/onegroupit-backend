import Product from "../models/Product";

export const createProduct = async (req, res) => {
  try {
    const { name, price, imgUrl, dateOfExpiration, calification, userId } =
      req.body;

    console.log(req.body);

    const newProduct = new Product({
      name,
      price,
      imgUrl,
      dateOfExpiration,
      calification,
      userId,
    });

    await newProduct.save();

    // res.status(201).json(productSaved);
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  res.json(product);
};

export const updateProductById = async (req, res) => {
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );
  res.json(updateProduct);
};

export const deleteProductById = async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId);
  res.status(204).json();
};
