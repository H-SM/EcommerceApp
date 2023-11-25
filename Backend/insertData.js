const {MongoClient}=require('mongodb');
// inserts all data into the database successfully...
const productsToInsert=[
  { _id: 1000, name: 'Adidas Men Shoes', brand: 'Adidas', price: 2999, category: 'Men', image: './products/adidas1.jpg' },
  { _id: 1001, name: 'Adidas Women Shoes', brand: 'Adidas', price: 2899, category: 'Women', image: './products/adidas2.jpg' },
  { _id: 1002, name: 'Adidas Kids Shoes', brand: 'Adidas', price: 1999, category: 'Kids', image: './products/adidas3.jpg' },
  { _id: 1003, name: 'Adidas Men T-shirts', brand: 'Adidas', price: 1499, category: 'Men', image: './products/adidas4.jpg' },
  { _id: 1004, name: 'Adidas Women T-shirts', brand: 'Adidas', price: 1399, category: 'Women', image: './products/adidas5.jpg' },
  { _id: 1005, name: 'Adidas Kids T-shirts', brand: 'Adidas', price: 999, category: 'Kids', image: './products/adidas6.jpg' },
  { _id: 1006, name: 'Adidas Men Joggers', brand: 'Adidas', price: 2499, category: 'Men', image: './products/adidas7.jpg' },
  { _id: 1007, name: 'Adidas Women Joggers', brand: 'Adidas', price: 2299, category: 'Women', image: './products/adidas8.jpg' },
  { _id: 1008, name: 'Adidas Kids Joggers', brand: 'Adidas', price: 1499, category: 'Kids', image: './products/adidas9.jpg' },
  { _id: 1009, name: 'Adidas Caps', brand: 'Adidas', price: 699, category: 'Caps', image: './products/adidas10.jpg' },
  { _id: 1010, name: 'Puma Men Shoes', brand: 'Puma', price: 2799, category: 'Men', image: './products/puma1.jpg' },
  { _id: 1011, name: 'Puma Women Shoes', brand: 'Puma', price: 2599, category: 'Women', image: './products/puma2.jpg' },
  { _id: 1012, name: 'Puma Kids Shoes', brand: 'Puma', price: 1899, category: 'Kids', image: './products/puma3.jpg' },
  { _id: 1013, name: 'Puma Men T-shirts', brand: 'Puma', price: 1399, category: 'Men', image: './products/puma4.jpg' },
  { _id: 1014, name: 'Puma Women T-shirts', brand: 'Puma', price: 1299, category: 'Women', image: './products/puma5.jpg' },
  { _id: 1015, name: 'Puma Kids T-shirts', brand: 'Puma', price: 899, category: 'Kids', image: './products/puma6.jpg' },
  { _id: 1016, name: 'Puma Men Joggers', brand: 'Puma', price: 2399, category: 'Men', image: './products/puma7.jpg' },
  { _id: 1017, name: 'Puma Women Joggers', brand: 'Puma', price: 2199, category: 'Women', image: './products/puma8.jpg' },
  { _id: 1018, name: 'Puma Kids Joggers', brand: 'Puma', price: 1399, category: 'Kids', image: './products/puma9.jpg' },
  { _id: 1019, name: 'Puma Caps', brand: 'Puma', price: 599, category: 'Caps', image: './products/puma10.jpg' },
  { _id: 1020, name: 'Nike Men Shoes', brand: 'Nike', price: 3199, category: 'Men', image: './products/nike1.jpg' },
  { _id: 1021, name: 'Nike Women Shoes', brand: 'Nike', price: 2999, category: 'Women', image: './products/nike2.jpg' },
  { _id: 1022, name: 'Nike Kids Shoes', brand: 'Nike', price: 2099, category: 'Kids', image: './products/nike3.jpg' },
  { _id: 1023, name: 'Nike Men T-shirts', brand: 'Nike', price: 1599, category: 'Men', image: './products/nike4.jpg' },
  { _id: 1024, name: 'Nike Women T-shirts', brand: 'Nike', price: 1499, category: 'Women', image: './products/nike5.jpg' },
  { _id: 1025, name: 'Nike Kids T-shirts', brand: 'Nike', price: 999, category: 'Kids', image: './products/nike6.jpg' },
  { _id: 1026, name: 'Nike Men Joggers', brand: 'Nike', price: 2699, category: 'Men', image: './products/nike7.jpg' },
  { _id: 1027, name: 'Nike Women Joggers', brand: 'Nike', price: 2499, category: 'Women', image: './products/nike8.jpg' },
  { _id: 1028, name: 'Nike Kids Joggers', brand: 'Nike', price: 1599, category: 'Kids', image: './products/nike9.jpg' },
  { _id: 1029, name: 'Nike Caps', brand: 'Nike', price: 799, category: 'Caps', image: './products/nike10.jpg' },
  { _id: 1030, name: 'Jordan Men Shoes', brand: 'Jordan', price: 3599, category: 'Men', image: './products/jordan1.jpg' },
  { _id: 1031, name: 'Jordan Women Shoes', brand: 'Jordan', price: 3399, category: 'Women', image: './products/jordan2.jpg' },
  { _id: 1032, name: 'Jordan Kids Shoes', brand: 'Jordan', price: 2499, category: 'Kids', image: './products/jordan3.jpg' },
  { _id: 1033, name: 'Jordan Men T-shirts', brand: 'Jordan', price: 1999, category: 'Men', image: './products/jordan4.jpg' },
  { _id: 1034, name: 'Jordan Women T-shirts', brand: 'Jordan', price: 1899, category: 'Women', image: './products/jordan5.jpg' },
  { _id: 1035, name: 'Jordan Kids T-shirts', brand: 'Jordan', price: 1299, category: 'Kids', image: './products/jordan6.jpg' },
  { _id: 1036, name: 'Jordan Men Joggers', brand: 'Jordan', price: 2999, category: 'Men', image: './products/jordan7.jpg' },
  { _id: 1037, name: 'Jordan Women Joggers', brand: 'Jordan', price: 2799, category: 'Women', image: './products/jordan8.jpg' },
  { _id: 1038, name: 'Jordan Kids Joggers', brand: 'Jordan', price: 1899, category: 'Kids', image: './products/jordan9.jpg' },
  { _id: 1039, name: 'Jordan Caps', brand: 'Jordan', price: 899, category: 'Caps', image: './products/jordan10.jpg' },
  { _id: 1040, name: 'Reebok Men Shoes', brand: 'Reebok', price: 2699, category: 'Men', image: './products/reebok1.jpg' },
  { _id: 1041, name: 'Reebok Women Shoes', brand: 'Reebok', price: 2499, category: 'Women', image: './products/reebok2.jpg' },
  { _id: 1042, name: 'Reebok Kids Shoes', brand: 'Reebok', price: 1699, category: 'Kids', image: './products/reebok3.jpg' },
  { _id: 1043, name: 'Reebok Men T-shirts', brand: 'Reebok', price: 1299, category: 'Men', image: './products/reebok4.jpg' },
  { _id: 1044, name: 'Reebok Women T-shirts', brand: 'Reebok', price: 1199, category: 'Women', image: './products/reebok5.jpg' }, 
  { _id: 1045, name: 'Reebok Kids T-shirts', brand: 'Reebok', price: 899, category: 'Kids', image: './products/reebok6.jpg' },
  { _id: 1046, name: 'Reebok Men Joggers', brand: 'Reebok', price: 2299, category: 'Men', image: './products/reebok7.jpg' },
  { _id: 1047, name: 'Reebok Women Joggers', brand: 'Reebok', price: 2099, category: 'Women', image: './products/reebok8.jpg' },
  { _id: 1048, name: 'Reebok Kids Joggers', brand: 'Reebok', price: 1299, category: 'Kids', image: './products/reebok9.jpg' },
  { _id: 1049, name: 'Reebok Caps', brand: 'Reebok', price: 499, category: 'Caps', image: './products/reebok10.jpg' },
];


const uri = 'mongodb+srv://abhishekkothiyal002:Thedemonking101.@cluster0.aiccdxx.mongodb.net/?retryWrites=true&w=majority'; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    await insertData(client);
  } finally {
    await client.close();
  }
}




async function insertData(client) {
    try {
      const database = client.db('ecomsite');
      const collection = database.collection('products'); 
  
      const result = await collection.insertMany(productsToInsert);
      console.log(`${result.insertedCount} products inserted`);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }


  connectToMongoDB();