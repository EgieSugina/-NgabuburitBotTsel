import { Telegraf } from 'telegraf'
//Koneksi Ke DB
const { Pool } = require('pg')
const pool = new Pool({
    user: ' ',
    host: ' ',
    database: ' ',
    password: ' ',
    port: 5432,
})
// End Koneksi Ke DB
// Token Dari BotFather
const TOKEN = 'TOKEN BOT'
const bot = new Telegraf(TOKEN)
//Menghapus Spasi
const DelExstraSpace = (v: string) => v.replace(/\s+/g, ' ').trim()
//Mengambil Data Dari Postgre DB
const GetData = (ctx) => {
    var param = ctx.message.text.substring(ctx.message.text.indexOf(' ') + 1)
    var filter = ctx.message.text.indexOf(' ') > 0 ? param : 'CIJANTUNG'
    var sql = `SELECT
	nama_kelurahan,
	status_perkawinan,
	SUM ( jumlah ) AS jumlah 
FROM
	PUBLIC.penduduk_jkt_kawin 
WHERE
    nama_kelurahan = '${filter}'
GROUP BY
    nama_kelurahan,
    status_perkawinan`
    console.log(sql)
    pool.query(sql, (err: any, res: any) => {
        if (err) {
            console.log(err)
            return ctx.reply('Data Not Available')
        }
        var msg = '<b>Status Kawin\n\nKelurahan | Status Perkawinan | Jumlah</b>\n'
        res.rows.forEach(e => {
            msg += `${DelExstraSpace(e.nama_kelurahan)} | ${DelExstraSpace(e.status_perkawinan)} | ${e.jumlah} \n`
        });
        ctx.replyWithHTML(msg)
        //pool.end()
    })
}
//Command /perkawinan 
bot.command('perkawinan', (ctx) => GetData(ctx))
bot.launch()