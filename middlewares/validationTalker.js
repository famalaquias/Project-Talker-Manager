// const validationEmail = (req, res, next) => {
//   const { productName } = req.body;

//   try{ 
//     if (!productName) throw new Error('O campo productName é obrigatório');

//     if (productName.length <= 4) throw new Error('O campo productName deve ter pelo menos 4 caracteres');
//   } catch(err) {
//     return res.status(400).json({ message: err.message });
//   }
//   next();
// };

// module.exports = {
//   validationEmail,
// };