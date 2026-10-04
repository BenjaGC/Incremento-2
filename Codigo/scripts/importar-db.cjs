require('dotenv').config({quiet:true});
const mysql=require('mysql2/promise'),fs=require('node:fs'),path=require('node:path');
(async()=>{const name=process.env.DB_NAME||'clinica_desarrollo';const c=await mysql.createConnection({host:process.env.DB_HOST||'localhost',user:process.env.DB_USER||'root',password:process.env.DB_PASSWORD||'',multipleStatements:true});try{
const [exists]=await c.query('SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME=?',[name]);
if(exists.length)throw Error('La base '+name+' ya existe. Elige otro DB_NAME en .env para evitar sobrescribir datos.');
await c.query('CREATE DATABASE ?? CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci',[name]);await c.changeUser({database:name});
await c.query(fs.readFileSync(path.join(__dirname,'../database/clinica-con-datos.sql'),'utf8'));
console.log('Base importada correctamente: '+name);
}finally{await c.end()}})().catch(e=>{console.error(e.message);process.exitCode=1});
