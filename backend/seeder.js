import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { parse } from 'csv-parse/sync';
import connectDB from './config/db.js';
import Product from './models/Product.js';

dotenv.config();
connectDB();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.join(__dirname, '..', 'data', 'flipkart_com-ecommerce_sample.csv');

function extractFirstImage(imageField) {
    if (!imageField) return null;
    try {
        // Remove surrounding quotes if any, unescape inner
        const cleaned = imageField.replace(/""/g, '"').replace(/^"|"$/g, '');
        const arr = JSON.parse(cleaned);
        return Array.isArray(arr) && arr.length > 0 ? arr[0] : null;
    } catch {
        // Try regex as fallback
        const match = imageField.match(/https?:\/\/[^\s"]+/);
        return match ? match[0] : null;
    }
}

function extractCategory(categoryTree) {
    if (!categoryTree) return 'General';
    try {
        const cleaned = categoryTree.replace(/""/g, '"').replace(/^"|"$/g, '');
        const arr = JSON.parse(cleaned);
        if (Array.isArray(arr) && arr.length > 0) {
            return arr[0].split('>>')[0].trim();
        }
    } catch {
        const parts = categoryTree.split('>>');
        if (parts.length > 0) return parts[0].replace(/[\[\]"]/g, '').trim();
    }
    return 'General';
}

const importData = async () => {
    try {
        console.log('📂 Reading CSV...');
        const content = fs.readFileSync(CSV_PATH, 'utf-8');

        console.log('⚙️  Parsing CSV (this may take a moment)...');
        const records = parse(content, {
            columns: true,
            skip_empty_lines: true,
            relax_quotes: true,
            relax_column_count: true,
        });

        console.log(`📊 Total records: ${records.length}`);

        const products = [];
        for (const row of records) {
            if (products.length >= 100) break;

            const name = row['product_name']?.trim();
            const imageUrl = extractFirstImage(row['image']);
            const retailPrice = parseFloat(row['retail_price']);
            const discountedPrice = parseFloat(row['discounted_price']);
            const price = (discountedPrice > 0 ? discountedPrice : retailPrice);
            const description = row['description']?.replace(/""/g, '"').trim();
            const category = extractCategory(row['product_category_tree']);
            const brand = row['brand']?.trim() || 'Unknown';

            if (
                name && name.length > 3 &&
                imageUrl && imageUrl.startsWith('http') &&
                !isNaN(price) && price > 0 &&
                description && description.length > 20
            ) {
                products.push({
                    name: name.substring(0, 200),
                    image: imageUrl,
                    description: description.substring(0, 600),
                    price: Math.round(price * 100) / 100,
                    category: category.substring(0, 100),
                    countInStock: Math.floor(Math.random() * 50) + 5,
                    brand: brand.substring(0, 100),
                });
            }
        }

        console.log(`✅ Found ${products.length} valid products`);

        await Product.deleteMany();
        await Product.insertMany(products);
        console.log(`🎉 Successfully seeded ${products.length} Flipkart products to MongoDB!`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

importData();
