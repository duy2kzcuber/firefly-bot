const mongoose = require('mongoose');

export const connect = async () =>{
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("Kết nối DB thành công");
  } catch (error) {
    console.log("kết nối db thất bại |", error);
  }
}