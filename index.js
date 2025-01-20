const express = require('express');
const app = express();
const snarkjs = require("snarkjs");
const fs = require("fs");
var cors = require('cors')

app.use(cors())
app.use(express.json());

app.post('/generate', async (req, res) => {
    console.log(req.body.age);
    const input = {
        age: req.body.age,
    };
    const zkeyPath = "./ageProof_0001.zkey";
    const wasmPath = "./ageProof_js/ageProof.wasm";
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, wasmPath, zkeyPath);
    console.log("Proof generated successfully!");

    // return proof and publicSignals
    return res.status(200).json({
        proof: proof,
        publicSignals: publicSignals
    })
});

app.post('/verify', async (req, res) => {
    const vkey = JSON.parse(fs.readFileSync("./verification_key.json"));
    const isValid = await snarkjs.groth16.verify(vkey, req.body.publicSignals, req.body.proof);

    if (isValid) {
        return res.status(200).json({ valid: true });
    } else {
        return res.status(200).json({ valid: false });
    }
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});