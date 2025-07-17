import express from 'express'
import axios from 'axios'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/pix', async (req, res) => {
  try {
    const response = await axios.post('https://api.abacatepay.com/v1/pixQrCode/create', req.body, {
      headers: {
        Authorization: 'Bearer abc_dev_rRMxM25fNhmmGWyPhQATN45d',
        'Content-Type': 'application/json',
      },
    })
    res.json(response.data)
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message })
  }
})

// Ajuste aqui para receber o id via query string
app.post('/api/pixQrCode/simulate-payment', async (req, res) => {
  const id = req.query.id // pega o id da URL ?id=...
  if (!id) {
    return res.status(400).json({ error: 'Missing id query parameter' })
  }
  try {
    const response = await axios.post(
      `https://api.abacatepay.com/v1/pixQrCode/simulate-payment?id=${id}`,
      req.body,
      {
        headers: {
          Authorization: 'Bearer abc_dev_rRMxM25fNhmmGWyPhQATN45d',
          'Content-Type': 'application/json',
        },
      },
    )
    res.json(response.data)
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: err.message })
  }
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})

// node index.js -> para rodar o servidor
// Tem que ta na pasta no backend-abacate
